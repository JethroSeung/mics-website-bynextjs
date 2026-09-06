import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3001";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const widths = [320, 375, 560, 820, 1040, 1280, 1440, 1920];
const results = [];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});

async function checkOverflow(page, w, path) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
}

const page = await browser.newPage();

// 1. 溢出检查：8 宽度 × 2 语言 × 关键页（首页/团队页/招新页/研究方向页）
for (const w of widths) {
  for (const path of ["/", "/en", "/team", "/join", "/research/pain", "/en/research/medeng"]) {
    const over = await checkOverflow(page, w, path);
    results.push({ test: "overflow", w, path, over, pass: over <= 1 });
  }
}

// 2. 字号与缩放验证 @1440 中文首页
//    注：zoom 区块内 getComputedStyle 返回内部坐标字号（非视觉值），
//    缩放效果用 getBoundingClientRect（视觉值）验证：
//    - 团队网格 max-w-[1344px] × zoom-70 ≈ 941px 视觉宽
//    - 导师照片 max-w-sm(24rem=576px @root24) × 0.7 ≈ 403px；页脚 MICS logo size-8(48) × 0.7 ≈ 34px
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
const fonts = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const fs = (el) => (el ? getComputedStyle(el).fontSize : "null");
  const rectW = (el) =>
    el ? Math.round(el.getBoundingClientRect().width) : 0;
  return {
    html: fs(document.documentElement),
    nav: fs(q('nav[aria-label="主要导航"] a')),
    hero: fs(q("#hero-title")),
    h2: fs(q("section#about h2")),
    logoW: q("header img")?.offsetWidth,
    bodyText: fs(q("section#about p")),
    teamCardCount: document.querySelectorAll("section#team article").length,
    teamGridW: rectW(q("section#team .grid")),
    supervisorPhotoW: rectW(q("section#leader img")),
    footerLogoW: rectW(q("footer img")),
  };
});
results.push({
  test: "fonts@1440",
  ...fonts,
  pass:
    fonts.html === "24px" &&
    fonts.nav === "24px" &&
    fonts.hero === "108px" &&
    fonts.h2 === "72px" &&
    fonts.logoW === 72 &&
    fonts.teamCardCount === 9 &&
    fonts.teamGridW > 930 &&
    fonts.teamGridW < 950 &&
    fonts.supervisorPhotoW > 395 &&
    fonts.supervisorPhotoW < 410 &&
    fonts.footerLogoW > 31 &&
    fonts.footerLogoW < 37,
});

// 3. 页头断点行为
for (const [w, expect] of [
  [375, { nav: false, burger: true, lang: false, brand: false, affil: false }],
  [820, { nav: false, burger: true, lang: true, brand: true, affil: false }],
  [1300, { nav: true, burger: false, lang: true, brand: true, affil: false }],
  [1600, { nav: true, burger: false, lang: true, brand: true, affil: true }],
]) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  const st = await page.evaluate(() => {
    const visible = (el) => !!el && getComputedStyle(el).display !== "none";
    return {
      nav: visible(document.querySelector('nav[aria-label="主要导航"]')),
      burger: visible(document.querySelector('button[aria-label="打开导航菜单"]')),
      lang: Array.from(document.querySelectorAll("header a")).some(
        (a) => a.textContent.trim() === "EN" && a.offsetParent !== null
      ),
      brand: Array.from(document.querySelectorAll("header strong")).some(
        (s) => s.offsetParent !== null
      ),
      affil: Array.from(document.querySelectorAll("header small")).some(
        (s) => s.offsetParent !== null
      ),
    };
  });
  const pass = Object.keys(expect).every((k) => st[k] === expect[k]);
  results.push({ test: `header@${w}`, ...st, expect, pass });
}

// 4. 成员卡 hover 抬升 @1440 /team
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/team", { waitUntil: "networkidle0" });
const card = await page.$("article");
const before = await page.evaluate(
  () => getComputedStyle(document.querySelector("article")).transform
);
await card.hover();
await new Promise((r) => setTimeout(r, 350));
const after = await page.evaluate(
  () => getComputedStyle(document.querySelector("article")).transform
);
results.push({
  test: "memberCardLift",
  before,
  after,
  pass: before === "none" && after !== "none" && after !== before,
});

// 5. 320px 团队页卡片宽度（单列后应接近视口内容宽）
await page.setViewport({ width: 320, height: 900 });
await page.goto(BASE + "/team", { waitUntil: "networkidle0" });
const cardW = await page.evaluate(
  () => document.querySelector("article")?.offsetWidth
);
results.push({ test: "cardW@320", cardW, pass: cardW > 200 });

// 6. 子页面内容整体 -20%（zoom-80）：用 rect/offset 宽度比例验证
//    （getComputedStyle 在 zoom 区块内返回内部坐标字号，无法反映视觉缩放）
const zoomRatio = (sel) =>
  page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el || !el.offsetWidth) return 0;
    return +(el.getBoundingClientRect().width / el.offsetWidth).toFixed(2);
  }, sel);
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/team", { waitUntil: "networkidle0" });
const teamH1Ratio = await zoomRatio("h1");
const teamGridRatio = await zoomRatio("main .grid");
results.push({
  test: "subpageZoom@1440",
  teamH1Ratio,
  teamGridRatio,
  pass:
    teamH1Ratio >= 0.78 &&
    teamH1Ratio <= 0.82 &&
    teamGridRatio >= 0.78 &&
    teamGridRatio <= 0.82,
});

// 7. /join 与 /research/pain 页头 h1 同样 -20%
for (const path of ["/join", "/research/pain"]) {
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  const ratio = await zoomRatio("h1");
  results.push({ test: `subH1${path}`, ratio, pass: ratio >= 0.78 && ratio <= 0.82 });
}

await browser.close();

let allPass = true;
for (const r of results.filter((r) => r.test !== "overflow")) {
  if (!r.pass) allPass = false;
  console.log(
    `${r.pass ? "PASS" : "FAIL"} | ${r.test} | ${JSON.stringify(
      Object.fromEntries(Object.entries(r).filter(([k]) => k !== "test" && k !== "pass"))
    )}`
  );
}
const overs = results.filter((r) => r.test === "overflow" && !r.pass);
if (overs.length) {
  allPass = false;
  console.log("FAIL | overflow 详情:");
  for (const o of overs) console.log(`  ${o.w}px ${o.path}: 溢出 ${o.over}px`);
} else {
  console.log("PASS | overflow: 8 宽度 × 6 页面全部无横向溢出");
}
console.log(allPass ? "\n=== ALL PASS ===" : "\n=== HAS FAILURES ===");
