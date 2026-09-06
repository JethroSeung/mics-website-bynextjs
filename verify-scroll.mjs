import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3001";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// ===== 1. 跳转置顶验证：首页滚到研究方向处点击"了解更多" =====
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
await page.evaluate(() => document.querySelector("#research")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 400));
const scrollBefore = await page.evaluate(() => window.scrollY);
console.log(`首页滚动位置: ${scrollBefore}px（应 > 0，模拟用户在下方）`);

// 点击 medeng 卡片的"了解更多"
const linkSel = 'a[href="/research/medeng"]';
await page.evaluate((s) => {
  const links = Array.from(document.querySelectorAll(s));
  // 卡片上的按钮链接（含"了解更多"文字）
  const btn = links.find((a) => a.textContent.includes("了解更多")) ?? links[0];
  btn.click();
}, linkSel);
await page.waitForFunction(() => location.pathname === "/research/medeng", { timeout: 10000 });
await new Promise((r) => setTimeout(r, 120)); // 刚跳转完
const yEarly = await page.evaluate(() => window.scrollY);
await new Promise((r) => setTimeout(r, 1000)); // 1 秒后（若有平滑滚动动画，此时仍在动/不在顶部）
const yLate = await page.evaluate(() => window.scrollY);
console.log(`跳转后 120ms: ${yEarly}px / 1s 后: ${yLate}px`);
console.log(
  yEarly === 0 && yLate === 0
    ? "PASS: 跳转瞬间置顶，无回滚动画"
    : "FAIL: 仍有滚动偏移"
);

// ===== 2. 滚动淡入验证 =====
const reveal = await page.evaluate(() => {
  const total = document.querySelectorAll(".reveal").length;
  return { total };
});
// 顶部可见区块应已 is-visible
const topVisible = await page.evaluate(
  () => document.querySelectorAll(".reveal.is-visible").length
);
console.log(`\nReveal 区块总数: ${reveal.total}，页面顶部已可见: ${topVisible}`);
// 滚到底触发全部
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await new Promise((r) => setTimeout(r, 500));
const allVisible = await page.evaluate(
  () => document.querySelectorAll(".reveal.is-visible").length
);
console.log(`滚动后全部可见: ${allVisible}/${reveal.total}`);
console.log(
  allVisible === reveal.total && topVisible >= 1
    ? "PASS: 滚动淡入正常"
    : "FAIL: 淡入异常"
);

// ===== 3. 返回链接（锚点跳转）仍正常工作 =====
await page.evaluate(() => (location.hash = ""));
await page.click('a[href="/#research"]');
await page.waitForFunction(() => location.pathname === "/", { timeout: 10000 });
await new Promise((r) => setTimeout(r, 600));
const backY = await page.evaluate(() => window.scrollY);
console.log(`\n返回首页#research 后滚动位置: ${Math.round(backY)}px（应 > 0，锚点定位正常）`);
await browser.close();
