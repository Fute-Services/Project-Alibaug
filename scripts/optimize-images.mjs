import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve(process.cwd(), "src/assets");
const RASTER_EXT = new Set([".jpg", ".jpeg", ".png"]);
const SKIP_UNDER_BYTES = 80 * 1024; // icons/small logos aren't worth touching
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skippedSmall = 0;
const mapping = [];

for await (const file of walk(ASSETS_DIR)) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER_EXT.has(ext)) continue;

  const { size } = await stat(file);
  if (size < SKIP_UNDER_BYTES) {
    skippedSmall++;
    continue;
  }

  const outPath = file.slice(0, -ext.length) + ".webp";
  const buffer = await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  await writeFile(outPath, buffer);

  totalBefore += size;
  totalAfter += buffer.length;
  converted++;
  mapping.push({ from: file, to: outPath });

  console.log(
    `${path.relative(ASSETS_DIR, file)} : ${(size / 1024 / 1024).toFixed(2)}MB -> ${(buffer.length / 1024 / 1024).toFixed(2)}MB`
  );
}

console.log("\n--- Summary ---");
console.log(`Converted: ${converted}, Skipped (already small): ${skippedSmall}`);
console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)}MB`);
console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
console.log(`Reduction:    ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%`);

await writeFile(
  path.resolve(process.cwd(), "scripts/image-mapping.json"),
  JSON.stringify(mapping, null, 2)
);
console.log("\nWrote scripts/image-mapping.json (original -> webp path mapping)");
