// Generates a raster with Gemini (Nano Banana) and records the prompt beside it.
//
//   GEMINI_API_KEY=... node scripts/gen-image.mjs --prompt "..." --out path.png [--ref image.png ...] [--model gemini-3.1-flash-image] [--aspect 16:9]
//
// Writes <out> and <out>.json ({ prompt, model, refs, createdAt }). When the Impeccable skill is installed,
// it also embeds the prompt in the PNG through its embed-prompt.mjs so provenance travels with the file.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";

const args = process.argv.slice(2);
const get = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const getAll = (name) => args.flatMap((a, i) => (a === `--${name}` ? [args[i + 1]] : []));

const key = process.env.GEMINI_API_KEY;
const prompt = get("prompt") ?? (get("prompt-file") ? readFileSync(get("prompt-file"), "utf8") : null);
const out = get("out");
const model = get("model", "gemini-3.1-flash-image");
const aspect = get("aspect", null);
const refs = getAll("ref");

if (!key) {
  console.error("[gen-image] GEMINI_API_KEY is not set. Export it in your shell before running.");
  process.exit(2);
}
if (!prompt || !out) {
  console.error("[gen-image] usage: --prompt \"...\" --out file.png [--ref image.png] [--model ...] [--aspect 16:9]");
  process.exit(1);
}

const mime = (p) => ({ ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" })[extname(p).toLowerCase()] ?? "image/png";

const parts = [
  ...refs.map((r) => ({ inlineData: { mimeType: mime(r), data: readFileSync(r).toString("base64") } })),
  { text: prompt },
];

const body = {
  contents: [{ role: "user", parts }],
  generationConfig: {
    responseModalities: ["IMAGE"],
    ...(aspect ? { imageConfig: { aspectRatio: aspect } } : {}),
  },
};

const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-goog-api-key": key },
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error(`[gen-image] Gemini answered ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const json = await res.json();
const image = json.candidates?.flatMap((c) => c.content?.parts ?? []).find((p) => p.inlineData?.data);
if (!image) {
  console.error("[gen-image] no image in the response:", JSON.stringify(json).slice(0, 600));
  process.exit(1);
}

const outPath = resolve(out);
writeFileSync(outPath, Buffer.from(image.inlineData.data, "base64"));
writeFileSync(`${outPath}.json`, JSON.stringify({ prompt, model, refs, aspect, createdAt: new Date().toISOString() }, null, 2));
console.log(`[gen-image] wrote ${outPath} (${image.inlineData.mimeType})`);

// Provenance: embed the prompt in the file when Impeccable's tool is around.
const candidates = [
  ...(process.env.IMPECCABLE_SKILL_DIR ? [resolve(process.env.IMPECCABLE_SKILL_DIR, "scripts/embed-prompt.mjs")] : []),
  resolve(homedir(), ".claude/plugins/cache/impeccable/impeccable"),
];
let embed = null;
for (const c of candidates) {
  if (c.endsWith("embed-prompt.mjs") && existsSync(c)) embed = c;
  else if (existsSync(c)) {
    const { readdirSync } = await import("node:fs");
    const versions = readdirSync(c).sort().reverse();
    for (const v of versions) {
      const p = resolve(c, v, "skills/impeccable/scripts/embed-prompt.mjs");
      if (existsSync(p)) {
        embed = p;
        break;
      }
    }
  }
  if (embed) break;
}
if (embed) {
  const r = spawnSync("node", [embed, outPath, "--prompt", prompt], { stdio: "inherit" });
  if (r.status !== 0) console.warn("[gen-image] prompt embedding failed; the .json sidecar still records it.");
}
