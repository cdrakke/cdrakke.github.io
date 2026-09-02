// Renders the built /og page to public/og.png (1200×630) and copies it into dist/ for the current build.
// Runs after `astro build` (see package.json "build"). Uses Puppeteer's bundled Chromium, or
// PUPPETEER_EXECUTABLE_PATH when set.
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync, copyFileSync } from "node:fs";
import puppeteer from "puppeteer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = resolve(root, "dist/og/index.html");
const out = resolve(root, "public/og.png");
const distOut = resolve(root, "dist/og.png");

if (!existsSync(html)) {
  console.error(`[og] built page not found: ${html}. Run \`astro build\` first.`);
  process.exit(1);
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  // Built assets are absolute (/_astro/...), so serve dist as the file root.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (url.startsWith("file:///_astro/") || url.startsWith("file:///images/") || url.startsWith("file:///audio/")) {
      req.continue({ url: pathToFileURL(resolve(root, "dist" + url.replace("file://", ""))).toString() });
    } else req.continue();
  });
  // The room settles in piece by piece on load; render the resting state, not the first frame.
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(pathToFileURL(html).toString(), { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))));
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  copyFileSync(out, distOut);
  console.log(`[og] wrote ${out} and ${distOut}`);
} finally {
  await browser.close();
}
