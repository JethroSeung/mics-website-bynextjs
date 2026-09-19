import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:4173";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--disable-gpu", "--no-sandbox"],
});

const routes = [
  "/join",
  "/join/medeng",
  "/join/medeng/wifi-csi",
  "/join/medeng/computer-vision",
  "/join/medeng/voice",
  "/en/join",
  "/en/join/medeng",
  "/en/join/medeng/wifi-csi",
  "/en/join/medeng/computer-vision",
  "/en/join/medeng/voice",
];

const page = await browser.newPage();
const count = (selector) => page.$$eval(selector, (elements) => elements.length);
for (const route of routes) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle0" });
  assert.equal(response?.status(), 200, `${route} should return HTTP 200`);
  assert.equal(await count("body > header"), 1, `${route} should have one global header`);
  assert.equal(await count("body > footer"), 1, `${route} should have one global footer`);
}

await page.setViewport({ width: 1920, height: 1000, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/join/medeng`, { waitUntil: "networkidle0" });
assert.equal(await count("aside nav a"), 4, "desktop local navigation should list four tracks");
const desktopLayout = await page.evaluate(() => {
  const aside = document.querySelector("main aside");
  const article = document.querySelector("main article");
  const content = document.querySelector("main article .pl-container");
  return {
    asideLeft: aside?.getBoundingClientRect().left ?? Number.POSITIVE_INFINITY,
    asideWidth: aside?.getBoundingClientRect().width ?? Number.POSITIVE_INFINITY,
    articleLeft: article?.getBoundingClientRect().left ?? Number.POSITIVE_INFINITY,
    articleWidth: article?.getBoundingClientRect().width ?? Number.POSITIVE_INFINITY,
    contentWidth: content?.getBoundingClientRect().width ?? Number.POSITIVE_INFINITY,
    animationDuration: article ? getComputedStyle(article).animationDuration : "",
  };
});
assert.ok(desktopLayout.asideLeft < 100, `desktop sidebar should stay close to the left edge (${desktopLayout.asideLeft}px)`);
assert.equal(desktopLayout.asideWidth, 196, "desktop sidebar should use the compact 196px width");
assert.equal(desktopLayout.articleLeft - desktopLayout.asideLeft - desktopLayout.asideWidth, 24, "sidebar gap should be 24px");
assert.ok(desktopLayout.articleWidth > 1200, `article background should extend across the remaining viewport (${desktopLayout.articleWidth}px)`);
assert.ok(desktopLayout.contentWidth <= 1100, `content width should remain readable (${desktopLayout.contentWidth}px)`);
assert.equal(desktopLayout.animationDuration, "0.4s", "track content should use the 400ms entrance animation");
assert.match(await page.$eval("aside", (element) => element.textContent ?? ""), /返回招新方向[\s\S]*任选其一即可/);
assert.match(await page.$eval("h1", (element) => element.textContent ?? ""), /毫米波/);

await page.click("aside nav a[href='/join/medeng/wifi-csi']");
await page.waitForFunction(() => location.pathname === "/join/medeng/wifi-csi");
await page.waitForFunction(() => document.querySelector("h1")?.textContent?.includes("Wi-Fi"));
const routeAnimationRunning = await page.$eval("main article", (article) =>
  article.getAnimations().some((animation) => animation.playState === "running"),
);
assert.equal(routeAnimationRunning, true, "the entrance animation should restart after track navigation");

await page.goto(`${baseUrl}/join/medeng`, { waitUntil: "networkidle0" });
assert.equal(await count("[role='tab']"), 3, "millimeter-wave page should expose three task tabs");
await page.$$eval("[role='tab']", (tabs) => (tabs[1]).click());
assert.equal(await page.$$eval("[role='tab']", (tabs) => tabs[1].getAttribute("aria-selected")), "true");
const controlledPanel = await page.$$eval("[role='tab']", (tabs) => tabs[1].getAttribute("aria-controls"));
assert.ok(controlledPanel);
assert.equal(await page.$eval(`#${controlledPanel}`, (element) => !element.hasAttribute("hidden")), true);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-recruitment-desktop.png"), fullPage: false });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/join`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 1, "only the medical-engineering card should link onward");
assert.equal(await count("main a[href*='/join/disaster']"), 0, "disaster card should not be interactive yet");
const joinOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
assert.ok(joinOverflow <= 1, `join page should not overflow horizontally (overflow: ${joinOverflow}px)`);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-join-mobile.png"), fullPage: true });

await page.goto(`${baseUrl}/join/medeng/computer-vision`, { waitUntil: "networkidle0" });
assert.equal(await count("main nav a") >= 4, true);
const activeTrackVisible = await page.$eval("main nav a[aria-current='page']", (element) => {
  const rect = element.getBoundingClientRect();
  return rect.left >= 0 && rect.right <= document.documentElement.clientWidth;
});
assert.equal(activeTrackVisible, true, "the active mobile track should be fully visible");
const detailOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
assert.ok(detailOverflow <= 1, `detail page should not overflow horizontally (overflow: ${detailOverflow}px)`);
assert.equal(await count("img[src='/images/recruitment/vquala-face-quality.png']"), 1);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-recruitment-mobile.png"), fullPage: false });

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 1, "homepage should link directly to medical-engineering recruitment");
await page.goto(`${baseUrl}/research/medeng`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 1, "medical-engineering research page should expose the recruitment callout");
await page.goto(`${baseUrl}/research/disaster`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 0, "disaster research page should not show the medical-engineering callout");

const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
for (const route of routes) {
  assert.ok(sitemap.includes(route), `sitemap should include ${route}`);
}

await browser.close();
console.log("Recruitment QA passed for routes, contextual entry points, tabs, sitemap, and mobile layout.");
