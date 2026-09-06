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
await page.goto(BASE + "/research/medeng", { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 800) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
});

const geo = await page.evaluate(() => {
  const box = (s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return {
      x: Math.round(r.x), y: Math.round(r.y + window.scrollY),
      w: Math.round(r.width), h: Math.round(r.height),
      borderLeft: parseFloat(st.borderLeftWidth) || 0,
      display: st.display,
    };
  };
  return {
    // zoom-80 正文容器（视觉应 ≈880）
    zoomWrap: box("section[aria-labelledby='detail-title'] .zoom-80"),
    summary: box("header .rounded-r-xl"),
    focus1: box("section[aria-labelledby='section-1'] .grid"),
    asideImg: box("aside img"),
    pub1: box("#publications-title ~ div article"),
    pub1Img: box("#publications-title ~ div img"),
    focusNo: box("section[aria-labelledby='section-1'] .grid > span"),
    focusTitle: box("section[aria-labelledby='section-1'] .grid h4"),
  };
});
console.log(JSON.stringify(geo, null, 1));

const pass =
  geo.zoomWrap.w > 870 && geo.zoomWrap.w < 890 &&            // 视觉 880 对齐旧站
  geo.summary.borderLeft >= 3 &&                              // 左竖线（zoom 后 ≥3px）
  geo.summary.w > 600 &&
  geo.focus1.display === "grid" &&
  geo.focusNo.x < geo.focusTitle.x &&                         // 编号在标题左侧
  Math.abs(geo.asideImg.w / geo.asideImg.h - 16 / 9) < 0.1 && // 16:9
  geo.pub1.display === "grid" &&
  geo.pub1Img.w > 600;
console.log(pass ? "\nPASS: 排版几何符合设计" : "\nFAIL: 排版异常");
await browser.close();
