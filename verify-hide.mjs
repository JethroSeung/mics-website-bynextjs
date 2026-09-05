import puppeteer from "puppeteer-core";

const BASE = "http://localhost:4321";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 320, height: 900 });
await page.goto(BASE + "/en", { waitUntil: "networkidle0" });

// 1. 找出所有 right > 320 或 width > 320 的元素（含被裁剪的）
const wide = await page.evaluate(() => {
  const vw = 320;
  return Array.from(document.querySelectorAll("body *"))
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > vw + 0.5 || r.right > vw + 0.5;
    })
    .slice(0, 25)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: String(el.className).slice(0, 70),
        w: Math.round(r.width),
        right: Math.round(r.right),
        text: (el.textContent || "").trim().slice(0, 25),
      };
    });
});
console.log("超宽元素：");
wide.forEach((o) => console.log(`  ${o.tag} w=${o.w} right=${o.right} | ${o.cls} | "${o.text}"`));

// 2. 逐个隐藏 body 直接子元素 + main 各 section
const drill = async (selector, label) => {
  const kids = await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    if (!root) return null;
    return Array.from(root.children).map((el, i) => ({
      i,
      tag: el.tagName,
      cls: String(el.className).slice(0, 40),
    }));
  }, selector);
  if (!kids) return;
  for (const k of kids) {
    const changed = await page.evaluate(
      ({ sel, idx }) => {
        const el = document.querySelector(sel).children[idx];
        const before = document.documentElement.scrollWidth;
        const prev = el.style.display;
        el.style.display = "none";
        const after = document.documentElement.scrollWidth;
        el.style.display = prev;
        return { before, after };
      },
      { sel: selector, idx: k.i }
    );
    if (changed.after !== changed.before) {
      console.log(`隐藏 ${label}[${k.i}] <${k.tag} ${kids[k.i].cls}> => ${changed.before} => ${changed.after}`);
    }
  }
};
console.log("\n隐藏测试：");
await drill("body", "body");
await drill("main", "main");
await browser.close();
