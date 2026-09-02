// Prints the built /resume page to public/resume/Calvin_Drakke_Rulete_Resume.pdf (A4).
// Run `astro build` first, then `npm run resume:pdf`. Commit the PDF; the site links to it.
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync, copyFileSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = resolve(root, "dist/resume/index.html");
const out = resolve(root, "public/resume/Calvin_Drakke_Rulete_Resume.pdf");

if (!existsSync(html)) {
  console.error(`[resume] built page not found: ${html}. Run \`astro build\` first.`);
  process.exit(1);
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (url.startsWith("file:///_astro/")) {
      req.continue({ url: pathToFileURL(resolve(root, "dist" + url.replace("file://", ""))).toString() });
    } else req.continue();
  });
  await page.goto(pathToFileURL(html).toString(), { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMediaType("print");
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  mkdirSync(resolve(root, "dist/resume"), { recursive: true });
  copyFileSync(out, resolve(root, "dist/resume/Calvin_Drakke_Rulete_Resume.pdf"));
  console.log(`[resume] wrote ${out}`);
} finally {
  await browser.close();
}
