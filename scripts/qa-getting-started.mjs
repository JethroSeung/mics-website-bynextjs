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
const nodeEntry = await page.evaluate(() => {
  const mainText = document.querySelector("main")?.textContent ?? "";
  return {
    hasTitle: mainText.includes("JavaScript / TypeScript / Node.js / npm"),
    hasLtsGuidance: mainText.includes("LTS 长期支持版本"),
    hasNodeLink: Boolean(document.querySelector('main a[href="https://nodejs.org/en/download"]')),
    hasNpmLink: Boolean(document.querySelector('main a[href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/"]')),
    hasTypeScriptLink: Boolean(document.querySelector('main a[href="https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html"]')),
  };
});
const entryAppearance = await page.evaluate(() => {
  const sectionRows = [...document.querySelectorAll("main section[id]")].map((section) => {
    const rows = [...section.querySelectorAll(":scope > div:last-child > article")];
    const stripedRows = section.id === "environment" ? rows.slice(1) : rows;

    return {
      id: section.id,
      firstBackground: stripedRows[0] ? getComputedStyle(stripedRows[0]).backgroundColor : null,
      secondBackground: stripedRows[1] ? getComputedStyle(stripedRows[1]).backgroundColor : null,
    };
  });
  const titles = [...document.querySelectorAll("main section article h3")];
  const environmentRows = [...document.querySelectorAll("main section#environment article")];

  return {
    allTitlesNearBlack: titles.every(
      (title) => getComputedStyle(title).color === "rgb(23, 33, 43)"
    ),
    everySectionAlternates: sectionRows.every(
      (section) =>
        section.firstBackground === "rgb(255, 255, 255)" &&
        section.secondBackground === "rgb(250, 251, 252)"
    ),
    prefaceIsMuted: environmentRows[0]
      ? getComputedStyle(environmentRows[0]).backgroundColor === "rgb(250, 251, 252)"
      : false,
    aiToolsCalloutRemoved: !(document.querySelector("main")?.textContent ?? "").includes(
      "使用 AI 工程工具前"
    ),
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
    structure.animationDuration === "0.4s" &&
    Object.values(nodeEntry).every(Boolean) &&
    Object.values(entryAppearance).every(Boolean),
  ...structure,
  ...nodeEntry,
  ...entryAppearance,
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
