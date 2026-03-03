import type { Project } from "@/types"

// =============================================================================
// Foundry Tech — Portfolio Project Data
//
// Each project maps to the four service pillars: Mobile, Web, TV, IoT.
// Thumbnails use generated gradient placeholders via CSS (no external images).
// =============================================================================

export const PROJECTS: readonly Project[] = [
  // ── Mobile ──────────────────────────────────────────────────────────────
  {
    id: "proj-01",
    title: "Pulse Health",
    slug: "pulse-health",
    category: "Mobile",
    description:
      "A cross-platform health tracking app with real-time biometric dashboards and physician-facing analytics.",
    thumbnail: "/projects/pulse-health.jpg",
    techStack: ["React Native", "TypeScript", "GraphQL", "HealthKit"],
    year: 2025,
    featured: true,
  },
  {
    id: "proj-02",
    title: "UrbanPay",
    slug: "urban-pay",
    category: "Mobile",
    description:
      "Contactless payment and transit-pass app servicing 2M+ daily commuters across three metro systems.",
    thumbnail: "/projects/urban-pay.jpg",
    techStack: ["Swift", "Kotlin", "NFC", "Stripe"],
    year: 2024,
    featured: false,
  },

  // ── Web ─────────────────────────────────────────────────────────────────
  {
    id: "proj-03",
    title: "Arclight Studio",
    slug: "arclight-studio",
    category: "Web",
    description:
      "Brand-forward marketing site and design system for a high-end architecture firm with immersive WebGL transitions.",
    thumbnail: "/projects/arclight-studio.jpg",
    techStack: ["Next.js", "Three.js", "Framer Motion", "Sanity"],
    year: 2025,
    featured: true,
  },
  {
    id: "proj-04",
    title: "Meridian Analytics",
    slug: "meridian-analytics",
    category: "Web",
    description:
      "Enterprise data-visualization dashboard processing 50M+ events per day with sub-200ms render times.",
    thumbnail: "/projects/meridian-analytics.jpg",
    techStack: ["React", "D3.js", "WebSockets", "PostgreSQL"],
    year: 2024,
    featured: false,
  },

  // ── TV ──────────────────────────────────────────────────────────────────
  {
    id: "proj-05",
    title: "StreamForge",
    slug: "stream-forge",
    category: "TV",
    description:
      "Smart TV streaming interface with voice navigation, adaptive bitrate, and 10-foot UI across Tizen & webOS.",
    thumbnail: "/projects/stream-forge.jpg",
    techStack: ["React", "Tizen", "webOS", "Shaka Player"],
    year: 2025,
    featured: true,
  },
  {
    id: "proj-06",
    title: "SignalBoard",
    slug: "signal-board",
    category: "TV",
    description:
      "Digital signage management platform powering 4,000+ displays across retail, hospitality, and transit.",
    thumbnail: "/projects/signal-board.jpg",
    techStack: ["Electron", "Node.js", "MQTT", "Canvas API"],
    year: 2023,
    featured: false,
  },

  // ── IoT ─────────────────────────────────────────────────────────────────
  {
    id: "proj-07",
    title: "TerraLink",
    slug: "terra-link",
    category: "IoT",
    description:
      "Agricultural sensor network and companion app monitoring soil, weather, and crop telemetry across 12,000 acres.",
    thumbnail: "/projects/terra-link.jpg",
    techStack: ["React Native", "AWS IoT", "LoRaWAN", "TimescaleDB"],
    year: 2025,
    featured: false,
  },
  {
    id: "proj-08",
    title: "ForgeFloor",
    slug: "forge-floor",
    category: "IoT",
    description:
      "Industrial control dashboard for smart factories — real-time machine telemetry, predictive maintenance, and OEE tracking.",
    thumbnail: "/projects/forge-floor.jpg",
    techStack: ["Next.js", "OPC-UA", "InfluxDB", "WebGL"],
    year: 2024,
    featured: true,
  },
] as const
