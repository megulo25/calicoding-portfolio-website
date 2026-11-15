import type { MetadataRoute } from "next"
import { COMPANY } from "@/data/company"
import { withBasePath } from "@/lib/utils"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.name.split(" ")[0],
    description:
      `${COMPANY.tagline} — Mobile, Web, TV & IoT digital experiences.`,
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#b87333",
    icons: [
      {
        src: withBasePath("/images/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: withBasePath("/images/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
