// Barrel export for utility functions
// Helpers will be exported here as they are created

/** Base path the site is served under (e.g. "/calicoding-portfolio-website" on GitHub Pages). Empty locally. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * Prefix a root-relative `/public` asset path with the deployment base path.
 * Needed for plain `<img>` tags, `next/image` string sources and the manifest,
 * which Next.js does not rewrite automatically when `basePath` is set.
 */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path
}
