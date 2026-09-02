// Cuts the studio background out of the portrait with rembg (run through uv, no global install).
// Output: src/assets/images/avatar-cutout.png. Review it before using it; keep the framed original as fallback.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "src/assets/images/avatar.png");
const out = resolve(root, "src/assets/images/avatar-cutout.png");

if (!existsSync(src)) {
  console.error(`[avatar] source not found: ${src}`);
  process.exit(1);
}

console.log("[avatar] running rembg via uvx (first run downloads the model)...");
const r = spawnSync("uvx", ["--from", "rembg[cli]", "rembg", "i", "-m", "isnet-general-use", "-a", src, out], {
  stdio: "inherit",
});
if (r.status !== 0) {
  console.error("[avatar] rembg failed. Is `uv` installed? Try: uvx --from 'rembg[cli]' rembg --help");
  process.exit(r.status ?? 1);
}
console.log(`[avatar] wrote ${out}`);
