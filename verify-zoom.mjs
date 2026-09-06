import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3000";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });

await page.click('button[aria-label="打开导航菜单"]');
await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
const r = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const rect = dialog.getBoundingClientRect();
  const link = dialog.querySelector("a");
  return {
    dialogW: Math.round(rect.width),
    dialogVisible: rect.width > 200,
    linkFS: link ? getComputedStyle(link).fontSize : "null",
  };
});
console.log(JSON.stringify(r));
console.log(r.dialogVisible ? "PASS: 移动端抽屉正常打开" : "FAIL");
await browser.close();
