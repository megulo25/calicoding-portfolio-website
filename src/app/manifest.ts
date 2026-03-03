import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Foundry Tech",
    short_name: "Foundry",
    description:
      "We Build What's Next — Mobile, Web, TV & IoT digital experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#b87333",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
