import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, "../../newstudent");
const outputRoot = path.join(projectRoot, "src/data/recruitment-content");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const tracks = [
  { slug: "mmwave", file: "direction-mmwave.html" },
  { slug: "wifi-csi", file: "direction-wifi-csi.html" },
  { slug: "computer-vision", file: "vquala-challenge-v8.html" },
  { slug: "voice", file: "direction-voice.html" },
];

function asModule(value) {
  return `/* 此文件由 scripts/generate-recruitment-content.mjs 从 newstudent 生成，请勿手改。 */\nexport default ${JSON.stringify(value)} as const;\n`;
}

console.log("Launching Chrome for recruitment content migration...");
const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  timeout: 20_000,
  args: [
    "--allow-file-access-from-files",
    "--disable-web-security",
    "--disable-gpu",
    "--no-sandbox",
  ],
});
console.log("Chrome launched.");

await mkdir(outputRoot, { recursive: true });
const allClasses = new Set();

for (const track of tracks) {
  const page = await browser.newPage();
  const sourcePath = path.join(sourceRoot, track.file);
  await page.goto(pathToFileURL(sourcePath).href, { waitUntil: "load" });

  const result = await page.evaluate((slug) => {
    const rootSelector = `#recruitment-track-${slug}`;
    const main = document.querySelector("main#main-content");
    const sourceStyle = document.querySelector("style");
    if (!main || !sourceStyle?.sheet) {
      throw new Error("招新源页面缺少 main#main-content 或内联样式表");
    }

    const splitSelectors = (selectorText) => {
      const selectors = [];
      let current = "";
      let depth = 0;
      for (const char of selectorText) {
        if (char === "(") depth += 1;
        if (char === ")") depth -= 1;
        if (char === "," && depth === 0) {
          selectors.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      if (current.trim()) selectors.push(current.trim());
      return selectors;
    };

    const scopeSelector = (selector) => {
      if (selector === ":root" || selector === "html" || selector === "body") {
        return rootSelector;
      }
      if (selector.startsWith(":root ")) {
        return selector.replace(/^:root/, rootSelector);
      }
      if (selector.startsWith("html ") || selector.startsWith("body ")) {
        return selector.replace(/^(html|body)/, rootSelector);
      }
      if (selector === "*" || selector.startsWith("*::")) {
        return `${rootSelector} ${selector}`;
      }
      return `${rootSelector} ${selector}`;
    };

    const scopeCss = (input) => {
      const css = input.replace(/\/\*[\s\S]*?\*\//g, "");

      const findToken = (text, start) => {
        let quote = "";
        let parentheses = 0;
        for (let index = start; index < text.length; index += 1) {
          const char = text[index];
          if (quote) {
            if (char === "\\") index += 1;
            else if (char === quote) quote = "";
            continue;
          }
          if (char === '"' || char === "'") quote = char;
          else if (char === "(") parentheses += 1;
          else if (char === ")") parentheses -= 1;
          else if (parentheses === 0 && (char === "{" || char === ";")) {
            return { index, char };
          }
        }
        return null;
      };

      const findClosingBrace = (text, opening) => {
        let quote = "";
        let depth = 1;
        for (let index = opening + 1; index < text.length; index += 1) {
          const char = text[index];
          if (quote) {
            if (char === "\\") index += 1;
            else if (char === quote) quote = "";
            continue;
          }
          if (char === '"' || char === "'") quote = char;
          else if (char === "{") depth += 1;
          else if (char === "}") {
            depth -= 1;
            if (depth === 0) return index;
          }
        }
        throw new Error("招新源样式存在未闭合的大括号");
      };

      const transform = (text) => {
        let output = "";
        let cursor = 0;
        while (cursor < text.length) {
          const token = findToken(text, cursor);
          if (!token) {
            output += text.slice(cursor);
            break;
          }
          if (token.char === ";") {
            output += text.slice(cursor, token.index + 1);
            cursor = token.index + 1;
            continue;
          }

          const prelude = text.slice(cursor, token.index);
          const closing = findClosingBrace(text, token.index);
          const body = text.slice(token.index + 1, closing);
          const trimmed = prelude.trim();

          if (/^@(media|supports|container|layer|document)\b/i.test(trimmed)) {
            output += `${prelude}{${transform(body)}}`;
          } else if (trimmed.startsWith("@")) {
            output += `${prelude}{${body}}`;
          } else {
            const leading = prelude.match(/^\s*/)?.[0] ?? "";
            const selectors = splitSelectors(trimmed).map(scopeSelector).join(",\n");
            output += `${leading}${selectors} {${body}}`;
          }
          cursor = closing + 1;
        }
        return output;
      };

      return transform(css);
    };

    const normalizeUrl = (value, type) => {
      if (type === "src" && /vquala-face-quality\.png$/i.test(value)) {
        return "/images/recruitment/vquala-face-quality.png";
      }
      if (type === "href" && value.startsWith("#")) {
        return `#${slug}-${value.slice(1)}`;
      }
      return value;
    };

    const serializeNode = (node, lang) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
      if (node.nodeType !== Node.ELEMENT_NODE) return null;

      const element = node;
      const tag = element.tagName.toLowerCase();
      const attrs = {};
      for (const attr of element.attributes) {
        if (attr.name === "data-en" || attr.name.startsWith("on")) continue;
        let value = attr.value;
        if (attr.name === "id") value = `${slug}-${value}`;
        if (["aria-controls", "aria-labelledby", "aria-describedby"].includes(attr.name)) {
          value = value
            .split(/\s+/)
            .map((id) => `${slug}-${id}`)
            .join(" ");
        }
        if (attr.name === "href" || attr.name === "src") {
          value = normalizeUrl(value, attr.name);
        }
        if (lang === "en" && attr.name === "alt" && value === "人脸退化样本示意图") {
          value = "Examples of degraded face images";
        }
        attrs[attr.name] = value;
      }

      let childNodes = Array.from(element.childNodes);
      if (lang === "en" && element.hasAttribute("data-en")) {
        const template = document.createElement("template");
        template.innerHTML = element.getAttribute("data-en") ?? "";
        childNodes = Array.from(template.content.childNodes);
      }

      return {
        tag,
        attrs,
        children: childNodes.map((child) => serializeNode(child, lang)).filter(Boolean),
      };
    };

    const classes = new Set();
    main.querySelectorAll("[class]").forEach((element) => {
      element.classList.forEach((className) => classes.add(className));
    });

    return {
      zh: Array.from(main.childNodes).map((node) => serializeNode(node, "zh")).filter(Boolean),
      en: Array.from(main.childNodes).map((node) => serializeNode(node, "en")).filter(Boolean),
      css: scopeCss(sourceStyle.textContent ?? ""),
      classes: Array.from(classes),
    };
  }, track.slug);

  result.classes.forEach((className) => allClasses.add(className));
  await writeFile(path.join(outputRoot, `${track.slug}.zh.ts`), asModule(result.zh), "utf8");
  await writeFile(path.join(outputRoot, `${track.slug}.en.ts`), asModule(result.en), "utf8");
  await writeFile(
    path.join(outputRoot, `${track.slug}.css`),
    `/* 此文件由 scripts/generate-recruitment-content.mjs 从 newstudent 生成，请勿手改。 */\n${result.css}`,
    "utf8",
  );
  await page.close();
}

const classSource = [...allClasses].sort().join(" ");
await writeFile(
  path.join(outputRoot, "class-source.ts"),
  `/* Tailwind v4 扫描源页面使用到的工具类。 */\nexport const recruitmentSourceClasses = ${JSON.stringify(classSource)};\n`,
  "utf8",
);

await browser.close();

// 生成器也负责验证源文件仍然存在，避免在来源目录缺失时静默产出空页面。
for (const track of tracks) {
  await readFile(path.join(sourceRoot, track.file), "utf8");
}

console.log(`Generated recruitment content for ${tracks.length} tracks.`);
