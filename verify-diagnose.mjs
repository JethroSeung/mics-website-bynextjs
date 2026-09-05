import puppeteer from "puppeteer-core";

const BASE = "http://localhost:4321";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();

for (const [w, path] of [[320, "/en"], [375, "/en"], [320, "/"]]) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  const report = await page.evaluate(() => {
    const doc = document.documentElement;
    const vw = doc.clientWidth;
    const clippedByAncestor = (el) => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        const o = getComputedStyle(p).overflow;
        if (["hidden", "clip", "auto", "scroll"].includes(o)) return true;
        p = p.parentElement;
      }
      return false;
    };
    const offenders = Array.from(document.querySelectorAll("body *"))
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.right > vw + 1 && !clippedByAncestor(el);
      })
      .slice(0, 10)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          cls: String(el.className).slice(0, 60),
          w: Math.round(r.width),
          right: Math.round(r.right),
          text: (el.textContent || "").trim().slice(0, 30),
        };
      });
    return {
      clientW: vw,
      scrollW: doc.scrollWidth,
      bodyScrollW: document.body.scrollWidth,
      offenders,
    };
  });
  console.log(`\n=== ${w}px ${path} === clientW=${report.clientW} docScrollW=${report.scrollW} bodyScrollW=${report.bodyScrollW}`);
  if (report.offenders.length === 0) console.log("(无未裁剪的溢出元素)");
  report.offenders.forEach((o) =>
    console.log(`  ${o.tag} w=${o.w} right=${o.right} | ${o.cls} | "${o.text}"`)
  );
}
await browser.close();
