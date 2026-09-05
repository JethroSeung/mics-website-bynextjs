import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3000";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") errors.push(`[${m.type()}] ${m.text().slice(0, 120)}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${String(e).slice(0, 120)}`));

for (const path of ["/", "/en"]) {
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  const r = await page.evaluate(() => ({
    jsFlag: document.documentElement.classList.contains("js"),
    bodyChildren: document.body.children.length,
    title: document.title.slice(0, 30),
  }));
  console.log(`${path}: jsFlag=${r.jsFlag} bodyChildren=${r.bodyChildren} title="${r.title}..."`);
}
console.log(errors.length === 0 ? "PASS: 无 console 错误/警告" : `控制台消息 ${errors.length} 条：\n  ` + errors.slice(0, 5).join("\n  "));
await browser.close();
