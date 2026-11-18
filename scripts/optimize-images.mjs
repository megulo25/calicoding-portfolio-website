// =============================================================================
// optimize-images — pre-generate responsive WebP variants for /public/images.
//
// The site is a static export, so Next.js can't resize images at request
// time. Run this after adding or changing images:
//
//   bun run images
//
// For every .jpg/.jpeg/.png under public/images it writes WebP variants at the
// widths below (only those smaller than the original) next to the source as
// `<name>.w<width>.webp`, and records everything in
// src/data/image-manifest.json, which the device frames use to build
// `srcset`, `width` and `height` (no layout shift).
// =============================================================================

import { readdir, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve(import.meta.dirname, "..")
const PUBLIC = path.join(ROOT, "public")
const IMAGES = path.join(PUBLIC, "images")
const MANIFEST = path.join(ROOT, "src/data/image-manifest.json")
const WIDTHS = [480, 960, 1440, 1920]
const QUALITY = 78

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function isFresh(out, srcMtime) {
  try {
    return (await stat(out)).mtimeMs >= srcMtime
  } catch {
    return false
  }
}

const manifest = {}
let written = 0

for await (const file of walk(IMAGES)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue
  const { width, height } = await sharp(file).metadata()
  if (!width || !height) continue

  const srcMtime = (await stat(file)).mtimeMs
  const publicPath = "/" + path.relative(PUBLIC, file).split(path.sep).join("/")
  const variants = []

  for (const w of WIDTHS.filter((w) => w < width)) {
    const out = file.replace(/\.(jpe?g|png)$/i, `.w${w}.webp`)
    if (!(await isFresh(out, srcMtime))) {
      await sharp(file).resize({ width: w }).webp({ quality: QUALITY }).toFile(out)
      written++
    }
    variants.push({ w, src: "/" + path.relative(PUBLIC, out).split(path.sep).join("/") })
  }

  manifest[publicPath] = { width, height, variants }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n")
console.log(`${Object.keys(sorted).length} images, ${written} variants written → ${path.relative(ROOT, MANIFEST)}`)
