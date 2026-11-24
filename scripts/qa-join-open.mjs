import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import puppeteer from "puppeteer-core";

// Serve the production export; hosting redirects are checked separately below.
const root = path.resolve("out");
const server = http.createServer((req, res) => {
  let file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  if (fs.existsSync(file + ".html")) file += ".html";
  else if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
  if (!fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
  res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream");
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 375, 820, 1440]) {
    for (const prefix of ["", "/en"]) {
      await page.setViewport({ width, height: 1000 });
      await page.goto(`http://127.0.0.1:${server.address().port}${prefix}/join`, { waitUntil: "networkidle0" });
      await page.evaluate(() => window.scrollTo(0, 650));
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        cards: document.querySelectorAll("article#medeng,article#disaster").length,
        taskLinks: [...document.querySelectorAll("article#medeng a,article#disaster a")]
          .map((a) => a.getAttribute("href")).filter((href) => href && !href.startsWith("mailto:")),
        emails: [...document.querySelectorAll("a[href^=mailto]")].map((a) => a.getAttribute("href")),
        closed: /本轮本科生集中招新已结束|This round of undergraduate recruitment has closed/.test(document.body.textContent),
        graduateFirst: (() => {
          const headings = [...document.querySelectorAll("h3")];
          const graduate = headings.find((h) => /欢迎报考研究生|Prospective graduate students/.test(h.textContent));
          const undergraduate = headings.find((h) => /本科生科研交流|Undergraduate research enquiries/.test(h.textContent));
          if (!graduate || !undergraduate) return false;
          const first = graduate.getBoundingClientRect();
          const second = undergraduate.getBoundingClientRect();
          return second.top >= first.bottom && Math.abs(first.left - second.left) < 1;
        })(),
      }));
      if (result.overflow > 1 || result.cards !== 2 || result.closed || !result.graduateFirst ||
          !["/join/medeng", "/join/disaster"].every((route) => result.taskLinks.includes(prefix + route)) ||
          !["barcaxu@outlook.com", "ycxuan4work@gmail.com", "zuoyiping@njupt.edu.cn"].every((email) => result.emails.includes("mailto:" + email))) {
        throw new Error(JSON.stringify(result));
      }
      console.log("PASS", width, prefix || "zh");
      if (!prefix && [375, 1440].includes(width)) {
        await page.screenshot({ path: path.join(process.env.TEMP, `mics-join-${width}.png`), fullPage: true });
      }
    }
  }
  const detailRoutes = [
    "/join/medeng", "/join/medeng/wifi-csi", "/join/medeng/computer-vision", "/join/medeng/voice",
    "/join/disaster", "/join/disaster/sensing-computing", "/join/disaster/communication-computing",
  ];
  for (const width of [375, 1440]) {
    await page.setViewport({ width, height: 1000 });
    for (const prefix of ["", "/en"]) {
      for (const route of detailRoutes) {
        const response = await page.goto(`http://127.0.0.1:${server.address().port}${prefix}${route}`, { waitUntil: "networkidle0" });
        if (response.status() !== 200 || !await page.$("h1")) throw new Error("Missing detail: " + prefix + route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (overflow > 1) throw new Error(`Detail overflow ${width}: ${prefix}${route}: ${overflow}`);
        const tabs = await page.$$("[role=tab]");
        if (tabs.length > 1) {
          await tabs[1].click();
          if (await tabs[1].evaluate((tab) => tab.getAttribute("aria-selected")) !== "true") throw new Error("Task tab failed: " + route);
        }
        const navSelector = width >= 1040 ? "aside nav a" : "main nav a";
        const navCount = await page.$$eval(navSelector, (links) => links.filter((link) => link.getBoundingClientRect().width > 0).length);
        const expected = route.includes("/medeng") ? 4 : 3;
        if (navCount !== expected) throw new Error("Track navigation: " + prefix + route + ": " + navCount);
        console.log("PASS detail", width, prefix + route);
      }
      await page.goto(`http://127.0.0.1:${server.address().port}${prefix || "/"}`, { waitUntil: "networkidle0" });
      for (const area of ["medeng", "disaster"]) {
        if (!await page.$(`main a[href="${prefix}/join/${area}"]`)) throw new Error("Missing homepage task entry");
        await page.goto(`http://127.0.0.1:${server.address().port}${prefix}/research/${area}`, { waitUntil: "networkidle0" });
        if (!await page.$(`a[href="${prefix}/join#${area}"]`)) throw new Error("Research contact entry changed");
        await page.goto(`http://127.0.0.1:${server.address().port}${prefix || "/"}`, { waitUntil: "networkidle0" });
      }
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
  const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
  const { redirects } = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  for (const prefix of ["", "/en"]) {
    for (const area of ["medeng", "disaster"]) {
      const oldPath = `${prefix}/join/${area}`;
      if (!sitemap.includes(oldPath) || !fs.existsSync("out" + oldPath + ".html")) throw new Error("Missing restored route: " + oldPath);
      if (redirects.some((rule) => rule.source.startsWith(oldPath))) throw new Error("Recruitment redirect still active: " + oldPath);
    }
    for (const route of detailRoutes) if (!sitemap.includes(prefix + route)) throw new Error("Missing sitemap detail");
  }
  if (!redirects.some((rule) => rule.source === "/research/pain" && rule.destination === "/research/disaster")) throw new Error("Historical redirect removed");
  console.log("PASS restored routes, entries, task tabs, sitemap, redirect configuration and browser console");
} finally {
  if (browser) await browser.close();
  server.close();
}
