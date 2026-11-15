import type { NextConfig } from "next"

// Set in CI for GitHub Pages (served from /<repo-name>/); empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
