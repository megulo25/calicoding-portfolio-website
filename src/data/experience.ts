import type { Experience } from "@/types"

// =============================================================================
// Career Timeline
//
// Professional roles, most recent first. Roles with public, shippable work
// link to their case studies in PROJECTS via `projectSlugs`.
// =============================================================================

export const EXPERIENCE: readonly Experience[] = [
  {
    id: "exp-credit-acceptance",
    company: "Credit Acceptance",
    title: "Software Engineer II",
    titleNote: "Hired as the React Native expert",
    location: "Remote",
    start: "Oct 2025",
    end: "Present",
    summary:
      "Leading an AI-native rewrite of the Credit Acceptance Mobile app and Customer Portal from Flutter to Expo / React Native — one codebase, one unified experience across iOS, Android, and the web. I orchestrate a team of autonomous AI coding agents that do much of the build, and I own the architecture, the guardrails, and every line that ships.",
    highlights: [
      "Architecting the Flutter → Expo / React Native migration as the team's React Native subject-matter expert",
      "Running agentic, multi-agent development workflows: specs and context in, reviewed pull requests out",
      "Human-in-the-loop review, automated quality gates, and eval-driven guardrails on all AI-generated code",
      "Unifying mobile and web into a single universal codebase with shared design system and business logic",
      "Continuously evaluating and adopting new AI tooling to push engineering throughput further",
    ],
    tags: ["AI-Native Engineering", "Agentic Workflows", "Expo", "React Native", "React Native Web", "TypeScript"],
    projectSlugs: ["credit-acceptance-mobile"],
    logo: "/images/credit_acceptance/icon.jpg",
    current: true,
  },
  {
    id: "exp-nbc-sports-next",
    company: "NBC Sports Next",
    title: "Software Engineer II",
    location: "San Diego, CA",
    start: "Jan 2023",
    end: "Nov 2025",
    summary:
      "Primary mobile engineer for the GolfPass streaming apps across iOS, Android, Apple TV, Fire TV, and Roku — serving 100K+ monthly active users at a 99% crash-free rate.",
    highlights: [
      "Cut cold-start time 45% by replacing bespoke stores with React Query's normalized cache",
      "Tripled release cadence to bi-weekly by automating Fastlane and App Store Connect screenshots",
      "Built a Maestro E2E suite in CI, saving 2 days of manual regression per release",
      "Integrated OneTrust CMP for GDPR / CCPA compliance across five platforms",
    ],
    tags: ["React Native", "TV Platforms", "React Query", "Fastlane", "Maestro", "Sentry"],
    projectSlugs: ["golfpass"],
    logo: "/images/golfpass/icon.jpg",
  },
  {
    id: "exp-career-break",
    company: "Career Break",
    title: "Professional Development",
    location: "San Diego, CA",
    start: "Nov 2021",
    end: "Dec 2022",
    summary:
      "Independent study in mobile system design, app architecture, and engineering best practices — and the start of my independent product work.",
    highlights: [],
    tags: ["System Design", "Mobile Architecture"],
    projectSlugs: ["dmaasd"],
    logo: null,
  },
  {
    id: "exp-solar-turbines",
    company: "Solar Turbines",
    title: "React Native Developer",
    location: "San Diego, CA",
    start: "Sep 2020",
    end: "Nov 2021",
    summary:
      "Built InSight Platform v2.0, the connected-equipment app Solar Turbines' customers and field technicians use to monitor gas-turbine fleets.",
    highlights: [
      "Cut the crash rate from 2.4% to 0.8% across 1,200 field technicians",
      "Migrated state to Redux Toolkit and rebuilt key charts with Reanimated 2 — 35% fewer frame drops on low-end devices",
      "Designed secure, scalable Python / Django API endpoints behind the app",
    ],
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Reanimated", "Django"],
    projectSlugs: ["solar-turbines-insight"],
    logo: "/images/solar_insight/icon.jpg",
  },
  {
    id: "exp-jpmc",
    company: "JPMorgan Chase",
    title: "IT Consultant",
    location: "New York Metro Area",
    start: "2019",
    end: "2020",
    summary: "IT consultant engagement at JPMC.",
    highlights: [],
    tags: ["Python"],
    logo: null,
  },
  {
    id: "exp-ucr",
    company: "University of California, Riverside",
    title: "Application Developer (Python)",
    location: "Riverside, CA",
    start: "2018",
    end: "2019",
    summary:
      "Built the web services and data pipelines behind research machine-learning models.",
    highlights: [
      "REST APIs for ML models with Django REST Framework, tracking performance and growing the PostgreSQL dataset",
      "Fully automated, asynchronous scraping workers with Celery and BeautifulSoup on Heroku",
      "OAuth2 authentication and Heroku deployments on a Linux / Git workflow",
    ],
    tags: ["Python", "Django REST", "Celery", "PostgreSQL", "Heroku"],
    logo: null,
  },
  {
    id: "exp-sdsc",
    company: "San Diego Supercomputer Center",
    title: "Machine Learning Engineering Intern",
    location: "La Jolla, CA",
    start: "2018",
    end: "2018",
    summary:
      "Applied deep learning research on explainable, hierarchical image classification.",
    highlights: [
      "Trained a multi-task deep learning model to learn hierarchical structure in a bird dataset — 95% accuracy",
      "Implemented Grad-CAM heatmaps to explain which pixels drove each prediction",
      "Built a Flask app to visualize model performance and decision-making",
    ],
    tags: ["Deep Learning", "Keras", "Explainable AI", "Flask"],
    logo: null,
  },
  {
    id: "exp-qualcomm-institute",
    company: "Qualcomm Institute",
    title: "Undergraduate Research Engineer (Deep Learning)",
    location: "La Jolla, CA",
    start: "2016",
    end: "2018",
    summary:
      "Deep learning research for civil-structure inspection, plus the internal tools researchers relied on.",
    highlights: [
      "Built a deep learning crack-detection model for civil structures — 96% accuracy",
      "Led a team of undergraduate developers building internal analytics tools (Flask, PostgreSQL)",
      "Real-time drone data acquisition with Django Channels, streamed to a live web dashboard",
    ],
    tags: ["Deep Learning", "Computer Vision", "scikit-learn", "Django Channels"],
    logo: null,
  },
] as const
