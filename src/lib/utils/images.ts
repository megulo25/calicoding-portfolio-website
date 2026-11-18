import manifest from "@/data/image-manifest.json"
import { withBasePath } from "@/lib/utils"

// =============================================================================
// Responsive images — reads the manifest written by `bun run images` and
// returns `<img>` attributes with a WebP srcset and intrinsic dimensions.
// Images missing from the manifest fall back to the original file.
// =============================================================================

interface ManifestEntry {
  width: number
  height: number
  variants: { w: number; src: string }[]
}

const MANIFEST = manifest as Record<string, ManifestEntry>

export interface ResponsiveImageProps {
  src: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
}

/**
 * Build `src`/`srcSet`/`width`/`height` for a `/public` image path.
 * `sizes` describes the rendered width so the browser picks the right file.
 */
export function responsiveImage(src: string, sizes = "100vw"): ResponsiveImageProps {
  const entry = MANIFEST[src]
  if (!entry) return { src: withBasePath(src) }

  const candidates = entry.variants.map((v) => `${withBasePath(v.src)} ${v.w}w`)
  candidates.push(`${withBasePath(src)} ${entry.width}w`)

  return {
    src: withBasePath(src),
    srcSet: candidates.join(", "),
    sizes,
    width: entry.width,
    height: entry.height,
  }
}
