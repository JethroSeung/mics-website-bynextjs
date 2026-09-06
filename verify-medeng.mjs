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

// 1. 中文页内容完整性 @1440（next/image 懒加载：渐进滚动到底触发加载）
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/research/medeng", { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
});
try {
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll("img")).every((img) => img.complete && img.naturalWidth > 0),
    { timeout: 10000 }
  );
} catch {
  const unloaded = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img"))
      .filter((img) => !(img.complete && img.naturalWidth > 0))
      .map((img) => img.src.slice(-60))
  );
  console.log("未加载图片:", unloaded);
}
const zh = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const qa = (s) => document.querySelectorAll(s);
  const img = (s) => {
    const el = q(s);
    return el ? { ok: el.complete && el.naturalWidth > 0, w: Math.round(el.getBoundingClientRect().width) } : null;
  };
  return {
    h1: q("h1")?.textContent.trim(),
    overviewH2: q("#detail-title")?.textContent.trim(),
    summaryLabel: q("header .rounded-r-xl p:first-child")?.textContent.trim(),
    sectionH3s: Array.from(qa("section[aria-labelledby^='section-'] h3")).map((e) => e.textContent.trim()),
    focusTitles: Array.from(qa("section[aria-labelledby^='section-'] h4")).slice(0, 5).map((e) => e.textContent.trim()),
    focusCount: qa("section[aria-labelledby^='section-'] .grid > span[aria-hidden]").length,
    asideTitle: q("aside h4")?.textContent.trim(),
    asideImg: img("aside img"),
    pubsTitle: q("#publications-title")?.textContent.trim(),
    pubCount: qa("#publications-title ~ div article").length,
    pubLinks: Array.from(qa("#publications-title ~ div a")).map((a) => a.href),
    pubFigure: img("#publications-title ~ div img"),
    hasReveal: !!q(".reveal"),
    paragraphs: qa("main p").length,
  };
});
results.push({
  test: "zh-content",
  pass:
    zh.h1 === "医工交叉-多模态感知" &&
    zh.overviewH2 === "多模态感知：面向人体与环境状态的智能理解" &&
    zh.summaryLabel === "重点任务" &&
    JSON.stringify(zh.sectionH3s) === JSON.stringify(["行业背景", "研究方向", "未来方向"]) &&
    zh.focusCount === 4 &&
    zh.asideTitle === "医工交叉合作" &&
    zh.asideImg?.ok === true &&
    zh.pubsTitle === "代表成果" &&
    zh.pubCount === 4 &&
    zh.pubLinks.length === 3 &&
    zh.pubFigure?.ok === true &&
    zh.hasReveal === true, // 2026-09-06：详情页加回简单滚动淡入（导师确认保留）
  zh,
});

// 2. 英文页内容 @1440
await page.goto(BASE + "/en/research/medeng", { waitUntil: "networkidle0" });
const en = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const qa = (s) => document.querySelectorAll(s);
  return {
    h1: q("h1")?.textContent.trim(),
    overviewH2: q("#detail-title")?.textContent.trim(),
    sectionH3s: Array.from(qa("section[aria-labelledby^='section-'] h3")).map((e) => e.textContent.trim()),
    focusTitles: Array.from(qa("section[aria-labelledby^='section-'] h4")).slice(0, 4).map((e) => e.textContent.trim()),
    asideTitle: q("aside h4")?.textContent.trim(),
    pubsTitle: q("#publications-title")?.textContent.trim(),
    viewPaper: q("#publications-title ~ div a")?.textContent.trim(),
    pubCount: qa("#publications-title ~ div article").length,
  };
});
results.push({
  test: "en-content",
  pass:
    en.h1 === "Medical-Engineering Multimodal Sensing" &&
    en.overviewH2 === "Multimodal sensing for human and environmental understanding" &&
    JSON.stringify(en.sectionH3s) === JSON.stringify(["Industry background", "Research directions", "Future directions"]) &&
    en.asideTitle === "Medical collaboration" &&
    en.pubsTitle === "Representative works" &&
    en.viewPaper === "View paper" &&
    en.pubCount === 4,
  en,
});

// 3. 溢出检查：8 宽度 × 2 语言
for (const w of [320, 375, 560, 820, 1040, 1280, 1440, 1920]) {
  for (const path of ["/research/medeng", "/en/research/medeng", "/research/pain"]) {
    await page.setViewport({ width: w, height: 900 });
    await page.goto(BASE + path, { waitUntil: "networkidle0" });
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    results.push({ test: "overflow", w, path, over, pass: over <= 1 });
  }
}

// 4. pain 页占位态不受影响
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/research/pain", { waitUntil: "networkidle0" });
const pain = await page.evaluate(() => ({
  pending: !!document.querySelector("#pending-title"),
  hasPulse: !!document.querySelector(".animate-pulse"),
}));
results.push({ test: "pain-placeholder", pain, pass: pain.pending && !pain.hasPulse });

for (const r of results) {
  if (r.test !== "zh-content" && r.test !== "en-content") console.log(`${r.pass ? "PASS" : "FAIL"} | ${r.test} | w=${r.w} ${r.path} over=${r.over}`);
  else console.log(`${r.pass ? "PASS" : "FAIL"} | ${r.test}`, r.pass ? "" : JSON.stringify(r.zh || r.en, null, 1));
}
console.log(results.every((r) => r.pass) ? "\n=== ALL PASS ===" : "\n=== HAS FAIL ===");
await browser.close();
