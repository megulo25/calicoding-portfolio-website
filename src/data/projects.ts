import type { Project } from "@/types"

// =============================================================================
// Foundry Tech — Portfolio Project Data
//
// Each project maps to the four service pillars: Mobile, Web, TV, IoT.
// A project may target multiple platforms (e.g. Mobile + TV).
// Thumbnails fall back to gradient placeholders when no image is provided.
// =============================================================================

export const PROJECTS: readonly Project[] = [
  {
    id: "proj-03",
    title: "Addis Restaurant Website",
    slug: "addis-restaurant-website",
    platforms: ["Web"],
    description: "A static restaurant website for Addis Ethiopian Restaurant in San Diego, featuring an online menu, about section, contact information, and an immersive video banner — originally built on WordPress and exported as a fully static site hosted on GitHub Pages.",
    thumbnail: "/images/addis_restaurant/index.jpg",
    techStack: ["WordPress", "PHP", "HTML", "CSS", "jQuery", "Simply Static", "GitHub Pages", "AWS Lightsail", "Gutenify Theme"],
    year: 2021,
    featured: true,
    overview: "Addis Restaurant is a family-owned Ethiopian restaurant in San Diego, CA, run by husband and wife Fekad & Alem since 2016. The website serves as their digital presence — showcasing their full breakfast, lunch, and dinner menus with prices and descriptions, telling their immigration story and passion for Ethiopian cuisine, and providing essential contact details, hours (11 AM – 9 PM), and a Google Maps link for directions. The site also integrates social media links to Facebook, Instagram, and Yelp, and provides an online ordering link through GrubHub.",
    challenge: "The client needed an affordable, low-maintenance website that could be updated occasionally without incurring ongoing hosting costs. WordPress provided the content editing experience they needed, but running a live WordPress instance 24/7 was unnecessary and expensive for a small restaurant. Additionally, the site needed to be visually rich — with custom fonts (Cormorant Garamond, Jost, Roboto), animations, a hero video banner, and a responsive layout — while remaining performant and easy to maintain by a solo developer.",
    solution: "I built the site on a temporary AWS Lightsail WordPress instance using the Gutenify Restaurant theme (a Full Site Editing block-based theme) and customized it with the WordPress Block Editor. When updates are needed, a new Lightsail instance is spun up, the site is imported via the All-in-One WP Migration plugin, changes are made, and the site is then exported to static files using the Simply Static plugin configured for offline usage. The resulting static HTML, CSS, and JS files are committed to a GitHub repository and served via GitHub Pages with a custom domain — eliminating all hosting costs while preserving the full WordPress editing workflow.",
    results: "The restaurant now has a professional, fast-loading static website at addisrestaurantsd.com with zero ongoing hosting costs. The site features a full categorized menu (breakfast, lunch, and dinner with 30+ items), an engaging auto-playing video hero section, animated scroll-in content, a photo gallery, an about-us section with the owners' story, and a comprehensive footer with contact info, hours, quick links, and social media integration. The update workflow allows the client's site to be refreshed at any time without needing a permanently running server.",
    gallery: ["/images/addis_restaurant/index.jpg", "/images/addis_restaurant/menu.jpg", "/images/addis_restaurant/team.jpg"],
    links: {
      liveUrl: "https://www.addisrestaurantsd.com/"
    },
    client: "Addis Restaurant",
    role: "Design & Development",
  },
  {
    id: "proj-02",
    title: "DMAASD",
    slug: "dmaasd",
    platforms: ["Mobile"],
    description: "A full-stack mobile application for the Dir Biyaber Edir community, enabling members to manage obituaries, notifications, and community communications through a secure, cross-platform experience.",
    thumbnail: "/images/dmaasd/thumbnail.png",
    techStack: [
      "Expo",
      "React Native",
      "TypeScript",
      "GraphQL",
      "AWS Amplify",
      "AWS Cognito",
      "AWS AppSync",
      "DynamoDB",
      "AWS Lambda",
      "Zustand",
      "TanStack Query",
      "Sentry",
    ],
    year: 2019,
    featured: false,
    overview: "DMAASD is a cross-platform mobile application built for the Dir Biyaber Edir community organization. The app serves as a centralized hub for community members to stay connected, receive real-time push notifications, manage obituaries, and access important community information — all secured behind biometric and Cognito-based authentication.",
    challenge: "The community relied on fragmented, manual communication channels to coordinate sensitive matters like obituary announcements and member notifications. There was no centralized, secure, and accessible platform — especially one that catered to members across different devices and platforms. The app needed to handle sensitive personal data securely, support biometric authentication, deliver reliable push notifications, and remain performant even as the community grew.",
    solution: "Built a production-grade React Native application using Expo (SDK 54) with file-based routing via Expo Router. The backend leverages a fully serverless AWS architecture — Cognito for authentication (including biometric login via Face ID and fingerprint), AppSync with GraphQL for real-time data operations, DynamoDB for storage, and Lambda for business logic. State management is cleanly separated: server state with TanStack Query, client state with Zustand. The app includes push notifications, quick actions for common tasks like creating obituaries and notifications, over-the-air updates via EAS Update, and error monitoring through Sentry. The new architecture (React Native New Architecture) is enabled for improved performance.",
    results: "The app has been actively maintained through 20+ iOS builds and 44+ Android builds, reaching version 2.10.0. It successfully digitized the community's communication workflows, providing members with instant push notifications, streamlined obituary management, and secure access to community resources. The serverless backend ensures low operational costs and automatic scalability, while OTA updates allow rapid iteration without app store review cycles.",
    gallery: null,
    links: {
      iosAppStore: "https://apps.apple.com/us/app/dmaasd/id6449449839",
      googlePlay: "https://play.google.com/store/apps/details?id=com.megulo25.DirBiyaberEdir&hl=en_US"
    },
    client: "DMAASD",
    role: "Design & Development",
  },
  // ── Mobile ──────────────────────────────────────────────────────────────
  {
    id: "proj-01",
    title: "Addis Tab",
    slug: "addis-tab",
    platforms: ["Mobile"],
    description: "A mobile application for managing business-customer credit tabs, enabling small businesses to track transactions, monitor customer debts, and streamline payment collection — all from their phone.",
    thumbnail: "/images/addis_tab/index.PNG",
    techStack: [
      "Expo",
      "React Native",
      "TypeScript",
      "AWS Amplify",
      "AWS AppSync (GraphQL)",
      "Amazon Cognito",
      "Amazon S3",
      "AWS Lambda",
      "TanStack Query",
      "Zustand",
      "React Native Paper",
      "EAS Build"
    ],
    year: 2019,
    featured: true,
    overview: "Addis Tab is a cross-platform iOS and Android application designed for small businesses — like neighborhood markets — that extend credit to their customers. It provides role-based dashboards for both Business owners and Customers, enabling real-time tracking of credit tabs, payment history, and outstanding debts. Business users can add customers, record credit and payment transactions with optional photo receipts, and monitor key financial metrics like total debt, open tabs, collection rate, and net cash flow. Customer users get a read-only view of their transaction history and outstanding balance. The app features phone-number-based OTP authentication, biometric login (Face ID / Fingerprint), push notifications for transaction alerts, and offline-first data persistence.",
    challenge: "Small businesses that operate on informal credit systems — common in many communities — had no simple, affordable way to digitally track who owes what. Paper ledgers are error-prone, hard to reconcile, and offer no transparency to customers. The core technical challenges included building a reliable real-time sync system between business and customer devices, implementing a secure passwordless authentication flow using phone numbers and OTP via Twilio, handling optimistic concurrency for conflict resolution across multiple devices, and delivering a smooth native experience on both iOS and Android from a single codebase.",
    solution: "Built a full-stack mobile application using Expo and React Native for the frontend with AWS Amplify Gen 1 powering the entire backend. The app uses AWS AppSync (GraphQL) for the data API with optimistic concurrency conflict resolution, Amazon Cognito with custom Lambda triggers for passwordless phone-number authentication via Twilio, and Amazon S3 for transaction receipt image storage. The frontend follows a feature-first architecture with Expo Router v6 for file-based navigation, TanStack Query v5 with AsyncStorage persistence for offline-capable server state management, and Zustand for lightweight client state. React Native Paper provides a consistent Material Design UI, while EAS Build handles CI/CD across both platforms. Push notifications via Expo's notification service keep customers informed of new transactions in real time.",
    results: "Successfully launched on both the Apple App Store and Google Play Store. The app serves active business users who manage customer credit tabs daily, replacing manual paper-based tracking with a digital solution. Key outcomes include real-time debt visibility for both merchants and customers, significantly reduced reconciliation errors, biometric-secured access for quick daily use, and an offline-first architecture that ensures reliability even with intermittent connectivity.",
    gallery: null,
    links: {
      iosAppStore: "https://apps.apple.com/us/app/addis-tab/id6504838248",
      googlePlay: "https://play.google.com/store/apps/details?id=com.megulo25.AddisTab"
    },
    client: "Addis Market",
    role: "Design & Development"
  },
  // ── Web ─────────────────────────────────────────────────────────────────
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
    gallery: null,
    links: {},
    client: "Meridian Corp",
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
    gallery: null,
    links: {},
    client: "NovaCast Media",
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
    gallery: null,
    links: {},
    client: "Panorama Digital",
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
    gallery: null,
    links: {},
    client: "AgriVerde",
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
    gallery: null,
    links: {},
    client: "Steelmark Industries",
    role: "Design & Development",
  },
] as const
