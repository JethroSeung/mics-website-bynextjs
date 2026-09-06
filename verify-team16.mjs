import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3001";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const results = [];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();

// ===== 1. 中文首页 @1440：16 人 / 4 列 / 卡片宽 / 字号不变 =====
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
const zh = await page.evaluate(() => {
  const grid = document.querySelector("section#team .grid");
  const cards = Array.from(grid.querySelectorAll("article"));
  const rect = (el) => el.getBoundingClientRect();
  // 列数 = 第一行卡片的数量（top 相同）
  const firstTop = Math.round(rect(cards[0]).top);
  const cols = cards.filter((c) => Math.abs(Math.round(rect(c).top) - firstTop) < 2).length;
  const name = cards[0].querySelector("h3");
  const role = cards[0].querySelector("p");
  return {
    count: cards.length,
    cols,
    cardW: Math.round(rect(cards[0]).width),
    gridW: Math.round(rect(grid).width),
    nameFS: getComputedStyle(name).fontSize,        // zoom 内部坐标：text-lg=27px
    roleFS: getComputedStyle(role).fontSize,        // text-sm=21px
    names: cards.map((c) => c.querySelector("h3").textContent.trim()),
  };
});
const required = ["刘佳铭","刘何鑫","张福伟","袁权","文宇航","徐博","马蕊","豆江南","张栩闻","陆梓健","金楚惟","谯霄霄","杨承轩"];
const missing = required.filter((n) => !zh.names.includes(n));
results.push({
  test: "zh-team@1440",
  pass:
    zh.count === 16 &&
    zh.cols === 4 &&
    zh.cardW > 240 && zh.cardW < 260 &&   // 卡片缩小至 ~250px
    zh.nameFS === "27px" && zh.roleFS === "21px", // 文字字号不变
  zh: { count: zh.count, cols: zh.cols, cardW: zh.cardW, gridW: zh.gridW, nameFS: zh.nameFS, missing },
});

// ===== 2. 顺序：前 8 位应为研究生 =====
results.push({
  test: "order-masters-first",
  pass: zh.names.slice(0, 8).join() === ["刘佳铭","刘何鑫","张福伟","袁权","文宇航","徐博","马蕊","豆江南"].join(),
});

// ===== 3. EN 页：角色标签不换行 + 无溢出 =====
await page.goto(BASE + "/en", { waitUntil: "networkidle0" });
const en = await page.evaluate(() => {
  const labels = Array.from(document.querySelectorAll("section#team article > div > p"));
  const wrapped = labels.filter((p) => p.clientHeight > parseFloat(getComputedStyle(p).lineHeight) * 1.5).length;
  return {
    count: document.querySelectorAll("section#team article").length,
    cols: new Set(Array.from(document.querySelectorAll("section#team article")).map((c) => Math.round(c.getBoundingClientRect().top))).size,
    wrappedLabels: wrapped,
  };
});
results.push({
  test: "en-team@1440",
  pass: en.count === 16 && en.cols === 4 && en.wrappedLabels === 0,
  en,
});

// ===== 4. 溢出检查：8 宽度 × 中英首页 =====
for (const w of [320, 375, 560, 820, 1040, 1280, 1440, 1920]) {
  for (const path of ["/", "/en"]) {
    await page.setViewport({ width: w, height: 900 });
    await page.goto(BASE + path, { waitUntil: "networkidle0" });
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    results.push({ test: "overflow", w, path, over, pass: over <= 1 });
  }
}

// ===== 5. 中间断点列数（1040→3列，1280→4列）=====
for (const [w, expectCols] of [[1040, 3], [1280, 4]]) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  const cols = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("section#team article"));
    const firstTop = Math.round(cards[0].getBoundingClientRect().top);
    return cards.filter((c) => Math.abs(Math.round(c.getBoundingClientRect().top) - firstTop) < 2).length;
  });
  results.push({ test: `cols@${w}`, cols, pass: cols === expectCols });
}

for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"} | ${r.test}`, r.pass ? "" : JSON.stringify(r));
}
console.log(results.every((r) => r.pass) ? "\n=== ALL PASS ===" : "\n=== HAS FAIL ===");
await browser.close();
