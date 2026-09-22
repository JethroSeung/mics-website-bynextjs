import puppeteer from "puppeteer-core";

const base = process.env.GUIDE_QA_BASE_URL ?? "http://localhost:3001";
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: edge,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
const results = [];

for (const width of [320, 375, 820, 1440]) {
  await page.setViewport({ width, height: 900 });
  for (const path of ["/join", "/join/getting-started", "/en/join/getting-started"]) {
    const response = await page.goto(base + path, { waitUntil: "networkidle0" });
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelector("h1")?.textContent?.trim(),
    }));
    results.push({
      name: `${width}px ${path}`,
      pass: response?.ok() === true && metrics.overflow <= 1 && Boolean(metrics.h1),
      ...metrics,
    });
  }
}

await page.setViewport({ width: 1440, height: 1000 });
await page.goto(base + "/join/getting-started", { waitUntil: "networkidle0" });
const structure = await page.evaluate(() => {
  const external = [...document.querySelectorAll('main a[target="_blank"]')];
  const aside = document.querySelector("main aside");
  const article = document.querySelector("main article");
  const animated = document.querySelector(".recruitment-track-enter");
  const asideRect = aside?.getBoundingClientRect();
  const articleRect = article?.getBoundingClientRect();
  const animationStyle = animated ? getComputedStyle(animated) : null;
  return {
    sections: document.querySelectorAll("main section[id]").length,
    entries: document.querySelectorAll("main section article").length,
    navLinks: document.querySelectorAll("aside nav a").length,
    externalLinks: external.length,
    unsafeExternalLinks: external.filter(
      (link) => !link.getAttribute("rel")?.includes("noreferrer")
    ).length,
    asideLeft: Math.round(asideRect?.left ?? -1),
    asideWidth: Math.round(asideRect?.width ?? -1),
    articleWidth: Math.round(articleRect?.width ?? -1),
    animationName: animationStyle?.animationName,
    animationDuration: animationStyle?.animationDuration,
  };
});
results.push({
  name: "guide structure",
  pass:
    structure.sections === 6 &&
    structure.navLinks === 6 &&
    structure.entries >= 20 &&
    structure.externalLinks >= 20 &&
    structure.unsafeExternalLinks === 0 &&
    structure.asideLeft >= 24 &&
    structure.asideLeft <= 64 &&
    structure.asideWidth === 196 &&
    structure.articleWidth > 1100 &&
    structure.animationName === "recruitment-track-enter" &&
    structure.animationDuration === "0.4s",
  ...structure,
});
await page.screenshot({ path: "qa-guide-desktop.png", fullPage: true });

await page.setViewport({ width: 375, height: 812 });
await page.goto(base + "/join/getting-started", { waitUntil: "networkidle0" });
await page.screenshot({ path: "qa-guide-mobile.png", fullPage: true });

await page.setViewport({ width: 1440, height: 1000 });
await page.goto(base + "/join", { waitUntil: "networkidle0" });
const guideEntry = await page.$('a[href="/join/getting-started"]');
if (guideEntry) await guideEntry.screenshot({ path: "qa-guide-entry.png" });

await browser.close();

for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"} | ${result.name} | ${JSON.stringify(result)}`);
}

if (results.some((result) => !result.pass)) process.exitCode = 1;
