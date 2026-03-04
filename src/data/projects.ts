import type { Project } from "@/types"

// =============================================================================
// Foundry Tech — Portfolio Project Data
//
// Each project maps to the four service pillars: Mobile, Web, TV, IoT.
// A project may target multiple platforms (e.g. Mobile + TV).
// Thumbnails use generated gradient placeholders via CSS (no external images).
// =============================================================================

export const PROJECTS: readonly Project[] = [
  // ── Mobile ──────────────────────────────────────────────────────────────
  {
    id: "proj-01",
    title: "Addis Tab",
    slug: "addis-tab",
    platforms: ["Mobile"],
    description: "A cross-platform health tracking app with real-time biometric dashboards and physician-facing analytics.",
    thumbnail: "/projects/pulse-health.jpg",
    techStack: ["Expo", "React Native", "TypeScript", "GraphQL", "AWS"],
    year: 2019,
    featured: true,
    overview: "Pulse Health is a comprehensive wellness platform that bridges the gap between patients and healthcare providers. The app delivers real-time biometric tracking — heart rate, sleep patterns, activity levels, and blood oxygen — through an intuitive mobile interface available on both iOS and Android.\n\nOn the provider side, a companion analytics dashboard aggregates patient data into actionable insights, enabling physicians to monitor chronic conditions remotely and intervene proactively. The system processes over 500,000 biometric data points daily across its user base.",
    challenge: "The existing patient-monitoring workflow relied on periodic in-office visits, leaving gaps of weeks or months between data points. Patients lacked visibility into their own health trends, and physicians had no way to detect concerning patterns between appointments. The client needed a solution that felt consumer-friendly for patients while meeting clinical-grade data accuracy standards.",
    solution: "We built a cross-platform mobile app using React Native to maximize code sharing between iOS and Android while leveraging native HealthKit and Google Fit integrations for sensor-accurate data collection. A GraphQL API layer enabled flexible, efficient data queries for both the patient app and the physician dashboard. Real-time sync was achieved through WebSocket connections that push critical alerts within seconds.",
    results: "The app launched to 15,000 active users within the first three months. Physician engagement increased by 40%, with doctors reporting earlier detection of patient health anomalies. The platform reduced unnecessary in-person visits by 25%, saving an estimated $2M annually across the provider network.",
    gallery: [],
    links: {},
    client: "Addis Market",
    duration: "16 weeks",
    role: "Design & Development",
  },
  {
    id: "proj-02",
    title: "UrbanPay",
    slug: "urban-pay",
    platforms: ["Mobile"],
    description:
      "Contactless payment and transit-pass app servicing 2M+ daily commuters across three metro systems.",
    thumbnail: "/projects/urban-pay.jpg",
    techStack: ["Swift", "Kotlin", "NFC", "Stripe"],
    year: 2024,
    featured: false,
    overview:
      "UrbanPay unifies contactless payments and transit passes into a single mobile wallet, eliminating the need for physical cards across three major metropolitan transit systems. The app supports NFC tap-to-pay at turnstiles, bus readers, and participating retail locations.\n\nThe platform handles peak loads of 120,000 transactions per minute during rush hours, with sub-300ms authorization times that keep commuters moving without friction.",
    challenge:
      "Each of the three transit authorities operated independent fare systems with different protocols, card standards, and backend infrastructure. Commuters were forced to carry multiple cards and manage separate accounts. The client needed a unified experience that abstracted away the underlying complexity while meeting strict PCI-DSS and transit authority security requirements.",
    solution:
      "We developed native apps for iOS (Swift) and Android (Kotlin) to ensure maximum NFC performance and reliability — a critical requirement for tap-to-pay at high-throughput turnstiles. The payment layer integrates Stripe for retail transactions and custom transit APIs for fare calculation. A tokenization system maps a single user identity across all three transit networks without exposing cross-system data.",
    results:
      "UrbanPay reached 2 million daily active users within six months of launch. Average station throughput improved by 18% due to faster tap times. Customer support tickets related to fare issues dropped 62%, and the app maintains a 4.8-star average rating across both app stores.",
    gallery: [],
    links: {},
    client: "Metro Transit Alliance",
    duration: "20 weeks",
    role: "Full-Stack Development",
  },

  // ── Web ─────────────────────────────────────────────────────────────────
  {
    id: "proj-03",
    title: "Arclight Studio",
    slug: "arclight-studio",
    platforms: ["Web"],
    description:
      "Brand-forward marketing site and design system for a high-end architecture firm with immersive WebGL transitions.",
    thumbnail: "/projects/arclight-studio.jpg",
    techStack: ["Next.js", "Three.js", "Framer Motion", "Sanity"],
    year: 2025,
    featured: true,
    overview:
      "Arclight Studio's digital presence needed to match the caliber of their physical work — award-winning architectural design. We created an immersive marketing site that treats each project as a visual narrative, with smooth WebGL transitions that echo the spatial experience of walking through one of their buildings.\n\nBacked by a Sanity CMS, the content team can publish new case studies, update project galleries, and manage team bios without developer involvement. The design system ensures visual consistency across 40+ page templates.",
    challenge:
      "The firm's previous website was a static WordPress site that failed to convey the sophistication of their work. Page load times exceeded 8 seconds, mobile experience was broken, and the content team had no way to update portfolio projects without filing a support ticket. The new site needed to be a portfolio piece in its own right — fast, beautiful, and effortlessly maintainable.",
    solution:
      "We built on Next.js for its hybrid rendering capabilities — static generation for portfolio pages and server-side rendering for dynamic content. Three.js powers the immersive 3D transitions between project pages, while Framer Motion handles micro-interactions and scroll-driven animations. A component-based design system in Figma maps 1:1 to React components, ensuring design-dev parity.",
    results:
      "Page load times dropped from 8+ seconds to under 1.2 seconds. The site won an Awwwards Honorable Mention within two weeks of launch. Content publishing turnaround went from 5 days to under 30 minutes. Organic traffic increased 140% in the first quarter, with average session duration up 3.2x.",
    gallery: [],
    links: {},
    client: "Arclight Architecture",
    duration: "14 weeks",
    role: "Design & Development",
  },
  {
    id: "proj-04",
    title: "Meridian Analytics",
    slug: "meridian-analytics",
    platforms: ["Web"],
    description:
      "Enterprise data-visualization dashboard processing 50M+ events per day with sub-200ms render times.",
    thumbnail: "/projects/meridian-analytics.jpg",
    techStack: ["React", "D3.js", "WebSockets", "PostgreSQL"],
    year: 2024,
    featured: false,
    overview:
      "Meridian Analytics is an enterprise-grade data visualization platform that transforms raw event streams into actionable business intelligence. The dashboard processes over 50 million events daily, rendering complex charts, heatmaps, and geospatial visualizations with sub-200ms response times.\n\nThe platform serves cross-functional teams — from C-suite executives viewing high-level KPIs to data analysts drilling into granular event logs — all through a single, role-adaptive interface.",
    challenge:
      "The client's existing analytics tooling was a patchwork of spreadsheets, Tableau exports, and custom SQL queries that took hours to produce insights. Real-time data was inaccessible to non-technical stakeholders, and the volume of incoming events was overwhelming their legacy data pipeline. They needed a unified platform that could ingest, process, and visualize data at scale — in real time.",
    solution:
      "We built a React frontend with D3.js for custom, high-performance visualizations that go beyond off-the-shelf charting libraries. WebSocket connections deliver real-time data updates without polling. The backend streams events through a PostgreSQL-backed pipeline with materialized views optimized for the dashboard's most common query patterns. Role-based access control ensures each user sees only the data relevant to their function.",
    results:
      "Time-to-insight dropped from hours to seconds. The platform handles 50M+ daily events with p99 render times under 200ms. Executive adoption reached 92% within the first month — up from 15% with the previous tooling. The client reported a 30% improvement in data-driven decision-making velocity.",
    gallery: [],
    links: {},
    client: "Meridian Corp",
    duration: "18 weeks",
    role: "Frontend Architecture & Development",
  },

  // ── TV ──────────────────────────────────────────────────────────────────
  {
    id: "proj-05",
    title: "StreamForge",
    slug: "stream-forge",
    platforms: ["TV"],
    description:
      "Smart TV streaming interface with voice navigation, adaptive bitrate, and 10-foot UI across Tizen & webOS.",
    thumbnail: "/projects/stream-forge.jpg",
    techStack: ["React", "Tizen", "webOS", "Shaka Player"],
    year: 2025,
    featured: true,
    overview:
      "StreamForge is a next-generation smart TV streaming application designed for the 10-foot experience. The interface supports voice-driven navigation, adaptive bitrate streaming, and seamless content discovery across Samsung (Tizen) and LG (webOS) platforms.\n\nThe app serves a content catalog of 15,000+ titles with personalized recommendations, watchlist management, and multi-profile household support. Playback quality adapts in real time to network conditions without buffering interruptions.",
    challenge:
      "Smart TV development presents unique constraints — limited processing power, non-standard input methods (remote controls, voice), and fragmented platform APIs across manufacturers. The client's existing app was a WebView wrapper that suffered from 4+ second load times, frequent crashes on older TV models, and no voice navigation support. Users were abandoning the platform for competitors with better TV experiences.",
    solution:
      "We built a custom React-based rendering layer optimized for TV hardware constraints, with spatial navigation that maps remote control d-pad inputs to a focus management system. Shaka Player handles adaptive bitrate streaming with custom buffer management tuned for TV chipsets. Voice navigation integrates with each platform's native voice SDK (Bixby on Tizen, ThinQ on webOS). Performance budgets enforce sub-2-second cold starts on target hardware.",
    results:
      "App load times dropped from 4+ seconds to 1.6 seconds on reference hardware. User session duration increased 45%, and the crash rate fell to under 0.1%. Voice navigation adoption reached 35% of active users within the first quarter. The app achieved a 4.6-star rating on both the Samsung and LG app stores.",
    gallery: [],
    links: {},
    client: "NovaCast Media",
    duration: "22 weeks",
    role: "Design & Development",
  },
  {
    id: "proj-06",
    title: "SignalBoard",
    slug: "signal-board",
    platforms: ["TV"],
    description:
      "Digital signage management platform powering 4,000+ displays across retail, hospitality, and transit.",
    thumbnail: "/projects/signal-board.jpg",
    techStack: ["Electron", "Node.js", "MQTT", "Canvas API"],
    year: 2023,
    featured: false,
    overview:
      "SignalBoard is an enterprise digital signage platform that manages content across 4,000+ displays deployed in retail stores, hotel lobbies, airport terminals, and transit stations. The system delivers scheduled and real-time content — from promotional graphics to live data feeds — with sub-second synchronization across display clusters.\n\nA web-based management console gives operators drag-and-drop content scheduling, real-time display health monitoring, and template-based content creation without design software.",
    challenge:
      "The client's display network had grown organically, resulting in a fragmented mix of hardware, operating systems, and proprietary content management tools. Updating content across all displays required manual intervention at each location. There was no centralized monitoring — operators didn't know when a display went offline until a customer complaint arrived. The system needed to unify management while supporting heterogeneous hardware.",
    solution:
      "We built an Electron-based display player that runs on commodity hardware, normalizing the rendering layer across different display setups. MQTT provides lightweight, reliable messaging for content updates and health telemetry — critical for displays on unreliable network connections. The Canvas API powers a custom rendering engine that handles text, images, video, and live data overlays with consistent performance across hardware tiers.",
    results:
      "Content update deployment time went from 48 hours (manual) to under 60 seconds (automated). Display uptime improved from 87% to 99.4% thanks to proactive health monitoring and automatic recovery. The platform scaled from 800 to 4,000+ displays without architecture changes. Operational staffing costs decreased by 35%.",
    gallery: [],
    links: {},
    client: "Panorama Digital",
    duration: "16 weeks",
    role: "Full-Stack Development",
  },

  // ── IoT ─────────────────────────────────────────────────────────────────
  {
    id: "proj-07",
    title: "TerraLink",
    slug: "terra-link",
    platforms: ["IoT"],
    description:
      "Agricultural sensor network and companion app monitoring soil, weather, and crop telemetry across 12,000 acres.",
    thumbnail: "/projects/terra-link.jpg",
    techStack: ["React Native", "AWS IoT", "LoRaWAN", "TimescaleDB"],
    year: 2025,
    featured: false,
    overview:
      "TerraLink is a precision agriculture platform that connects a network of field-deployed sensors to a mobile companion app, giving farmers real-time visibility into soil moisture, temperature, nutrient levels, weather conditions, and crop health across 12,000 acres of farmland.\n\nThe system ingests data from 2,400+ LoRaWAN sensors, processes it through an AWS IoT pipeline, and delivers actionable recommendations — when to irrigate, fertilize, or harvest — directly to the farmer's phone.",
    challenge:
      "Traditional farming relies on periodic manual soil sampling and weather intuition, leading to over-irrigation, fertilizer waste, and missed harvest windows. The client's existing sensor hardware had no unified data platform — each sensor vendor provided its own dashboard with incompatible data formats. Farmers needed a single pane of glass that worked in the field, often with limited cellular connectivity.",
    solution:
      "We designed a React Native mobile app with an offline-first architecture that syncs when connectivity is available — critical for rural deployment. The backend leverages AWS IoT Core for device management and message routing, with LoRaWAN gateways providing long-range, low-power sensor connectivity. TimescaleDB handles time-series data at scale, powering both real-time dashboards and historical trend analysis. ML models generate irrigation and fertilization recommendations based on sensor data and weather forecasts.",
    results:
      "Water usage decreased 22% across monitored farms through data-driven irrigation scheduling. Crop yield improved an average of 12% in the first growing season. The platform reduced fertilizer costs by $180,000 annually across the deployment. Sensor data uptime reached 99.2% despite rural deployment conditions.",
    gallery: [],
    links: {},
    client: "AgriVerde",
    duration: "24 weeks",
    role: "Mobile App & Cloud Infrastructure",
  },
  {
    id: "proj-08",
    title: "ForgeFloor",
    slug: "forge-floor",
    platforms: ["IoT"],
    description:
      "Industrial control dashboard for smart factories — real-time machine telemetry, predictive maintenance, and OEE tracking.",
    thumbnail: "/projects/forge-floor.jpg",
    techStack: ["Next.js", "OPC-UA", "InfluxDB", "WebGL"],
    year: 2024,
    featured: true,
    overview:
      "ForgeFloor is an industrial IoT dashboard that brings smart factory visibility to the browser. The platform connects directly to factory floor machinery via OPC-UA, ingesting real-time telemetry — vibration, temperature, throughput, energy consumption — and presenting it through an intuitive WebGL-powered 3D factory visualization.\n\nOperators can monitor Overall Equipment Effectiveness (OEE), configure alerts for anomalous machine behavior, and access predictive maintenance recommendations that prevent costly unplanned downtime.",
    challenge:
      "The client operated three manufacturing facilities with 200+ CNC machines, injection molders, and assembly robots — each with proprietary control systems and no unified monitoring. Machine failures were detected only after they caused production stoppages, costing an average of $45,000 per hour in lost output. The operations team relied on clipboard-based manual inspections and had no historical data for trend analysis.",
    solution:
      "We built a Next.js web application with a WebGL-rendered 3D floor plan that gives operators a spatial, real-time view of their entire factory. OPC-UA integration connects directly to machine PLCs without requiring hardware modifications. InfluxDB stores high-frequency time-series data (sampling at 1Hz per machine), enabling both real-time monitoring and historical trend analysis. A predictive maintenance engine uses vibration-pattern analysis to forecast bearing failures 48–72 hours in advance.",
    results:
      "Unplanned downtime decreased 38% in the first six months. The predictive maintenance system achieved 89% accuracy in failure prediction, preventing an estimated $2.1M in lost production. OEE visibility drove a 15% improvement in overall equipment utilization. The platform now monitors 200+ machines across three facilities from a single dashboard.",
    gallery: [],
    links: {},
    client: "Steelmark Industries",
    duration: "20 weeks",
    role: "Design & Development",
  },
] as const
