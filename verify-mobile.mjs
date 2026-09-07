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

// ===== 1. 手机端成员卡横排 + 首页仅 8 卡可见 @390 =====
for (const w of [390, 412, 430]) {
  await page.setViewport({ width: w, height: 844 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  const r = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("section#team article"));
    const visible = cards.filter((c) => c.offsetParent !== null);
    const card = visible[0];
    const img = card.querySelector("img");
    const info = card.querySelector("div");
    const ir = img.getBoundingClientRect();
    const tr = info.getBoundingClientRect();
    const cr = card.getBoundingClientRect();
    return {
      domCount: cards.length,
      visibleCount: visible.length,
      // 横排判定：图片在左、文字在右、同一行
      horizontal: ir.right <= tr.left + 1 && Math.abs((ir.top + ir.height / 2) - (tr.top + tr.height / 2)) < ir.height,
      imgW: Math.round(ir.width),
      cardH: Math.round(cr.height),
      cardW: Math.round(cr.width),
      firstNames: visible.slice(0, 8).map((c) => c.querySelector("h3").textContent.trim()),
    };
  });
  const masters = ["刘佳铭","刘何鑫","张福伟","袁权","文宇航","徐博","马蕊","豆江南"];
  results.push({
    test: `home-mobile@${w}`,
    pass:
      r.domCount === 16 &&
      r.visibleCount === 8 &&
      r.horizontal === true &&
      r.imgW > 120 && r.imgW < 150 &&
      JSON.stringify(r.firstNames) === JSON.stringify(masters),
    r,
  });
}

// ===== 2. /team 页手机端全员横排 @390 =====
await page.setViewport({ width: 390, height: 844 });
await page.goto(BASE + "/team", { waitUntil: "networkidle0" });
const team = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll("main article"));
  const visible = cards.filter((c) => c.offsetParent !== null);
  const check = (card) => {
    const img = card.querySelector("img");
    const info = card.querySelector("div");
    const ir = img.getBoundingClientRect();
    const tr = info.getBoundingClientRect();
    return ir.right <= tr.left + 1 && Math.abs((ir.top + ir.height / 2) - (tr.top + tr.height / 2)) < ir.height;
  };
  return {
    total: visible.length,
    horizontalAll: visible.every(check),
    sampleImgW: Math.round(visible[0].querySelector("img").getBoundingClientRect().width),
    // 邮箱可见（/team showEmail）
    emailVisible: !!visible[0].querySelector("div p:last-child"),
  };
});
results.push({
  test: "team-mobile@390",
  pass: team.total === 35 && team.horizontalAll === true && team.emailVisible === true,
  team,
});

// ===== 3. 桌面端竖版卡回归 @1440 =====
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
const desk = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll("section#team article")).filter((c) => c.offsetParent !== null);
  const card = cards[0];
  const img = card.querySelector("img");
  const info = card.querySelector("div");
  const ir = img.getBoundingClientRect();
  const tr = info.getBoundingClientRect();
  return {
    visible: cards.length,
    // 竖版判定：图片在上、文字在下、图宽≈卡宽（卡片含 1px 边框×2，容差 4px）
    vertical: ir.bottom <= tr.top + 1 && Math.abs(ir.width - card.getBoundingClientRect().width) < 4,
    imgW: Math.round(ir.width),
    nameFS: getComputedStyle(card.querySelector("h3")).fontSize,
  };
});
results.push({
  test: "home-desktop@1440",
  pass: desk.visible === 16 && desk.vertical === true && desk.imgW > 240 && desk.imgW < 260 && desk.nameFS === "27px",
  desk,
});

// ===== 4. hero 标题字号：390→54px / 560→72px / 1440→108px =====
for (const [w, expect] of [[390, 54], [560, 72], [1440, 108]]) {
  await page.setViewport({ width: w, height: 844 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  const fs = await page.evaluate(() => getComputedStyle(document.querySelector("#hero-title")).fontSize);
  results.push({ test: `hero-title@${w}`, fs, expect: `${expect}px`, pass: fs === `${expect}px` });
}

// ===== 5. 轮播触屏：touch-action + 手势后自动播放继续 =====
await page.setViewport({ width: 390, height: 844 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
const carousel = await page.evaluate(() => {
  const viewport = document.querySelector("section[aria-labelledby='hero-title'] .overflow-hidden");
  return { touchAction: viewport ? getComputedStyle(viewport).touchAction : "no-viewport" };
});
results.push({
  test: "carousel-touch",
  touchAction: carousel.touchAction,
  pass: carousel.touchAction === "pan-y",
});

// ===== 6. 手机端无横向溢出（首页/团队/研究方向中英）=====
for (const w of [320, 390, 412, 430, 560]) {
  for (const path of ["/", "/en", "/team", "/research/medeng"]) {
    await page.setViewport({ width: w, height: 844 });
    await page.goto(BASE + path, { waitUntil: "networkidle0" });
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    results.push({ test: "overflow", w, path, over, pass: over <= 1 });
  }
}

// ===== 7. 手机端抽屉导航可用 =====
await page.setViewport({ width: 390, height: 844 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
await page.click('button[aria-label="打开导航菜单"]');
await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
const drawer = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"]');
  return {
    links: Array.from(d.querySelectorAll("nav a")).map((a) => a.textContent.trim()),
    hasLang: Array.from(d.querySelectorAll("a")).some((a) => a.textContent.trim() === "EN"),
  };
});
results.push({
  test: "drawer@390",
  pass: drawer.links.length >= 5 && drawer.hasLang === true,
  drawer,
});

for (const r of results) {
  if (r.test !== "overflow") console.log(`${r.pass ? "PASS" : "FAIL"} | ${r.test}`, r.pass ? "" : JSON.stringify(r));
  else if (!r.pass) console.log(`FAIL | overflow | w=${r.w} ${r.path} over=${r.over}`);
}
const overflowPass = results.filter((r) => r.test === "overflow").every((r) => r.pass);
console.log(overflowPass ? "PASS | overflow 全部无溢出" : "FAIL | 存在溢出");
console.log(results.every((r) => r.pass) ? "\n=== ALL PASS ===" : "\n=== HAS FAIL ===");
await browser.close();
