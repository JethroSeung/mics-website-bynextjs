import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

// Run from the project root. Keep originals outside the project before removal.
const root = fs.realpathSync(".");
const publicRoot = path.join(root, "public");
const backup = fs.mkdtempSync(path.join(os.tmpdir(), "mics-image-originals-"));
const all = fs.readdirSync(publicRoot, { recursive: true })
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const groups = new Map();
for (const file of all) {
  const stem = file.replace(/\.(jpe?g|png|webp)$/i, "");
  if (!groups.has(stem)) groups.set(stem, []);
  groups.get(stem).push(file);
}
const replacements = [];
const results = [];
for (const [stem, files] of groups) {
  const target = stem + ".webp";
  const existing = files.find((f) => f === target);
  const input = files.find((f) => /\.jpe?g$/i.test(f))
    ?? files.find((f) => /\.png$/i.test(f)) ?? existing;
  for (const file of files) {
    const destination = path.join(backup, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(publicRoot, file), destination);
    if (file !== target) replacements.push(["/" + file.split(path.sep).join("/"), "/" + target.split(path.sep).join("/")]);
  }
  const oldBytes = files.reduce((sum, file) => sum + fs.statSync(path.join(publicRoot, file)).size, 0);
  const validExisting = existing && (await sharp(path.join(publicRoot, existing)).metadata()).format === "webp";
  if (!validExisting) {
    let image = sharp(path.join(publicRoot, input)).rotate();
    if (stem.startsWith("images" + path.sep + "members" + path.sep) ||
        stem.startsWith("images" + path.sep + "supervisor" + path.sep)) {
      image = image.resize({ width: 760, withoutEnlargement: true });
    } else {
      image = image.resize({ width: 1600, withoutEnlargement: true });
    }
    const isPng = /\.png$/i.test(input);
    const buffer = await image.webp({ quality: 86, effort: 6, lossless: isPng }).toBuffer();
    await sharp(buffer).stats();
    fs.writeFileSync(path.join(publicRoot, target), buffer);
  }
  const metadata = await sharp(path.join(publicRoot, target)).metadata();
  if (metadata.format !== "webp") throw new Error("Not WebP: " + target);
  results.push({ target, sourceFiles: files, oldBytes, newBytes: fs.statSync(path.join(publicRoot, target)).size });
}
// Mechanical image-reference migration, including generated recruitment content.
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".md", ".css", ".html"]);
const skip = new Set(["node_modules", ".next", ".git", "out", "public"]);
const changedFiles = [];
function migrate(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skip.has(entry.name)) migrate(file);
    } else if (textExtensions.has(path.extname(file)) && file !== path.join(root, "scripts", "convert-site-images.mjs")) {
      const before = fs.readFileSync(file, "utf8");
      let after = before;
      for (const [oldPath, newPath] of replacements) after = after.split(oldPath).join(newPath);
      if (after !== before) {
        const destination = path.join(backup, "code", path.relative(root, file));
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, before);
        fs.writeFileSync(file, after);
        changedFiles.push(path.relative(root, file));
      }
    }
  }
}
migrate(root);
// Only remove explicitly requested JPEG originals, after successful conversion.
const removed = [];
for (const file of all.filter((f) => /\.jpe?g$/i.test(f))) {
  const absolute = path.resolve(publicRoot, file);
  if (!absolute.startsWith(publicRoot + path.sep)) throw new Error("Outside public: " + file);
  const target = absolute.replace(/\.jpe?g$/i, ".webp");
  if ((await sharp(target).metadata()).format !== "webp") throw new Error("Missing converted image");
  fs.unlinkSync(absolute);
  removed.push(file);
}
fs.writeFileSync(path.join(backup, "manifest.json"), JSON.stringify({ results, changedFiles, removed }, null, 2));
console.log(JSON.stringify({
  backup, webpImages: results.length, removedJpegFiles: removed.length, changedFiles,
  oldRasterBytes: results.reduce((n, r) => n + r.oldBytes, 0),
  uniqueWebpBytes: results.reduce((n, r) => n + r.newBytes, 0),
  pngOriginalsRetained: all.filter((f) => /\.png$/i.test(f)).length,
}, null, 2));
