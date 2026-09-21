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
  "/join/disaster",
  "/join/disaster/sensing-computing",
  "/join/medeng",
  "/join/medeng/wifi-csi",
  "/join/medeng/computer-vision",
  "/join/medeng/voice",
  "/en/join",
  "/en/join/disaster",
  "/en/join/disaster/sensing-computing",
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
assert.equal(await count("aside a[href^='mailto:barcaxu@outlook.com']"), 1, "desktop sidebar should show the shared application recipient");
assert.match(await page.$eval("main", (element) => element.textContent ?? ""), /作品之外，也请让我们认识一下你/);
const applicationOrderIsCorrect = await page.evaluate(() => {
  const hero = document.querySelector("main .pl-hero");
  const guide = document.querySelector("main [aria-labelledby^='application-guide-']");
  const selector = document.querySelector("main .pl-selector");
  if (!hero || !guide || !selector) return false;
  return Boolean(
    hero.compareDocumentPosition(guide) & Node.DOCUMENT_POSITION_FOLLOWING &&
    guide.compareDocumentPosition(selector) & Node.DOCUMENT_POSITION_FOLLOWING
  );
});
assert.equal(applicationOrderIsCorrect, true, "application guidance should sit between the hero and task selector");
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
const medicalSidebarTop = await page.$eval("main aside > div", (element) => element.getBoundingClientRect().top);
await page.evaluate(async () => {
  scrollTo(0, 20);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
const medicalSidebarTopAfterScroll = await page.$eval("main aside > div", (element) => element.getBoundingClientRect().top);
assert.ok(Math.abs(medicalSidebarTopAfterScroll - medicalSidebarTop) <= 1, "medical recruitment sidebar should not drift during initial scrolling");
await page.evaluate(() => scrollTo(0, 0));

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

await page.goto(`${baseUrl}/join/disaster`, { waitUntil: "networkidle0" });
assert.equal(await count("aside nav li"), 3, "disaster sidebar should list three research tracks");
assert.equal(await count("aside nav a[aria-current='page']"), 1, "Communication-Sensing should be active");
assert.equal(await count("aside nav a"), 2, "Communication-Sensing and Sensing-Computing should be open");
assert.equal(await count("aside nav [aria-disabled='true']"), 1, "only Communication-Computing should remain disabled");
assert.equal(await count("aside a[href^='mailto:ycxuan4work@gmail.com']"), 1, "disaster sidebar should show the shared application recipient");
assert.equal(await count("[role='tab']"), 3, "Communication-Sensing should expose three participation routes");
assert.equal(await count("a[href='https://doi.org/10.1109/WCNC61545.2025.10978429']"), 1, "the corrected dual-band paper DOI should be present");
assert.equal(await count("a[href='https://doi.org/10.1109/JSAC.2022.3156632']"), 1, "the ISAC survey DOI should remain on its own paper");
await page.$$eval("[role='tab']", (tabs) => (tabs[1]).click());
assert.equal(await page.$$eval("[role='tab']", (tabs) => tabs[1].getAttribute("aria-selected")), "true");
assert.equal(await page.$eval("#disaster-panel-reproduction", (element) => !element.hasAttribute("hidden")), true);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-disaster-recruitment-desktop.png"), fullPage: false });

const disasterSidebarTop = await page.$eval("main aside > div", (element) => element.getBoundingClientRect().top);
await page.evaluate(async () => {
  scrollTo(0, 20);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
const disasterSidebarTopAfterScroll = await page.$eval("main aside > div", (element) => element.getBoundingClientRect().top);
assert.ok(Math.abs(disasterSidebarTopAfterScroll - disasterSidebarTop) <= 1, "disaster recruitment sidebar should not drift during initial scrolling");
await page.evaluate(async () => {
  scrollTo(0, document.documentElement.scrollHeight);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
const disasterSidebarTopAtEnd = await page.$eval("main aside > div", (element) => element.getBoundingClientRect().top);
assert.ok(disasterSidebarTopAtEnd < disasterSidebarTop, "sticky sidebar should still release before the footer");

await page.goto(`${baseUrl}/join/disaster/sensing-computing`, { waitUntil: "networkidle0" });
assert.match(await page.$eval("h1", (element) => element.textContent ?? ""), /感知与计算方向招新/);
assert.equal(await count("aside nav a[aria-current='page']"), 1, "Sensing-Computing should be active in the direction navigation");
assert.equal(await count("[role='tab']"), 2, "Sensing-Computing should expose reproduction and presentation routes");
assert.equal(await count("details"), 8, "Sensing-Computing should expose all eight paper tasks");
assert.equal(await count("main article a[href^='mailto:mountqingxubo@outlook.com']"), 1, "task results should go to the Sensing-Computing lead");
assert.equal(await count("aside a[href^='mailto:ycxuan4work@gmail.com']"), 1, "the sidebar should keep the shared personal-introduction recipient");
assert.equal(await page.$eval("#disaster-panel-reproduction", (element) => !element.hasAttribute("hidden")), true);
await page.$$eval("[role='tab']", (tabs) => tabs[1].click());
assert.equal(await page.$eval("#disaster-panel-presentation", (element) => !element.hasAttribute("hidden")), true);
assert.doesNotMatch(await page.$eval("main", (element) => element.textContent ?? ""), /痛感一体化/);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-sensing-computing-desktop.png"), fullPage: false });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/join`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 1, "medical-engineering card should link onward");
assert.equal(await count("main a[href='/join/disaster']"), 1, "disaster-sensing card should link onward");
assert.equal(await count("main a[href^='mailto:barcaxu@outlook.com']"), 1, "medical-engineering card should include the application email");
assert.equal(await count("main a[href^='mailto:ycxuan4work@gmail.com']"), 1, "disaster-sensing card should include the application email");
assert.match(await page.$eval("main", (element) => element.textContent ?? ""), /报名需同时完成[\s\S]*任意一项招新任务[\s\S]*简历或文字自我介绍/);
assert.equal(await count("a a"), 0, "the card should not contain nested interactive links");
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
await page.$eval("[aria-labelledby^='application-guide-']", (element) =>
  element.scrollIntoView({ block: "start" }),
);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-application-guide-mobile.png"), fullPage: false });

await page.goto(`${baseUrl}/join/disaster`, { waitUntil: "networkidle0" });
assert.equal(await count("main [class~='lg:hidden'] nav li"), 3, "mobile disaster navigation should list all three tracks");
assert.equal(await count("main [class~='lg:hidden'] nav [aria-disabled='true']"), 1, "only the unpublished Communication-Computing track should be disabled on mobile");
const disasterOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
assert.ok(disasterOverflow <= 1, `disaster detail should not overflow horizontally (overflow: ${disasterOverflow}px)`);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-disaster-recruitment-mobile.png"), fullPage: false });

await page.goto(`${baseUrl}/join/disaster/sensing-computing`, { waitUntil: "networkidle0" });
const activeDisasterTrackVisible = await page.$eval("main [class~='lg:hidden'] nav a[aria-current='page']", (element) => {
  const rect = element.getBoundingClientRect();
  return rect.left >= 0 && rect.right <= document.documentElement.clientWidth;
});
assert.equal(activeDisasterTrackVisible, true, "the active Sensing-Computing mobile track should be fully visible");
const sensingComputingOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
assert.ok(sensingComputingOverflow <= 1, `Sensing-Computing detail should not overflow horizontally (overflow: ${sensingComputingOverflow}px)`);
await page.screenshot({ path: path.join(os.tmpdir(), "mics-sensing-computing-mobile.png"), fullPage: false });

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 1, "homepage should link directly to medical-engineering recruitment");
assert.equal(await count("main a[href='/join/disaster']"), 1, "homepage should link directly to disaster-sensing recruitment");
await page.goto(`${baseUrl}/research/medeng`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 1, "medical-engineering research page should expose the recruitment callout");
await page.goto(`${baseUrl}/research/disaster`, { waitUntil: "networkidle0" });
assert.equal(await count("main a[href='/join/medeng']"), 0, "disaster research page should not show the medical-engineering callout");
assert.equal(await count("main a[href='/join/disaster']"), 1, "disaster research page should expose the disaster recruitment callout");

const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
for (const route of routes) {
  assert.ok(sitemap.includes(route), `sitemap should include ${route}`);
}

await browser.close();
console.log("Recruitment QA passed for routes, contextual entry points, tabs, sitemap, and mobile layout.");
