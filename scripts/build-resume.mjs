// Generates a print-ready PDF from public/resume/index.html using Puppeteer.
// Run with: npm run resume:pdf
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const htmlPath = resolve(projectRoot, "public/resume/index.html");
const pdfPath = resolve(
  projectRoot,
  "public/resume/Calvin_Drakke_Rulete_Resume.pdf",
);

if (!existsSync(htmlPath)) {
  console.error(`[resume] source HTML not found: ${htmlPath}`);
  process.exit(1);
}

console.log("[resume] launching headless Chromium...");
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  const url = pathToFileURL(htmlPath).toString();

  console.log(`[resume] loading ${url}`);
  await page.goto(url, { waitUntil: "networkidle0" });

  // Force a print-media render so @media print rules apply.
  await page.emulateMediaType("print");

  console.log(`[resume] writing ${pdfPath}`);
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log("[resume] done.");
} finally {
  // Swallow close-time errors so they can't mask the original failure.
  try {
    await browser.close();
  } catch {
    // ignore — we're already in cleanup
  }
}
