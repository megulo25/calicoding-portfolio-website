// =============================================================================
// Foundry Tech — Shared Type Definitions
// =============================================================================

/**
 * Target platforms corresponding to Foundry Tech's four service pillars.
 * A project can ship to one or more platforms.
 */
export type Platform = "Mobile" | "Web" | "TV" | "IoT"

/**
 * Platform-specific and general external links for a project.
 * All fields are optional — only populate the ones that apply.
 */
export interface ProjectLinks {
  /** URL to the live web product */
  liveUrl?: string
  /** URL to the source repository */
  repoUrl?: string
  /** iOS App Store URL */
  iosAppStore?: string
  /** Google Play Store URL */
  googlePlay?: string
  /** Amazon Appstore (Fire TV / tablets) URL */
  amazonAppStore?: string
  /** Roku Channel Store URL */
  rokuChannelStore?: string
}

/**
 * A portfolio project / case study.
 */
export interface Project {
  /** Unique identifier */
  id: string
  /** Display title */
  title: string
  /** URL-safe slug used for routing (`/work/[slug]`) */
  slug: string
  /** Target platforms this project ships to */
  platforms: Platform[]
  /** Short description (1–2 sentences) */
  description: string
  /** Path to thumbnail image relative to `/public` */
  thumbnail: string
  /** Technologies used */
  techStack: string[]
  /** Year the project was completed */
  year: number
  /** Whether to feature this project at a larger size in the grid */
  featured: boolean

  // ── Case-study detail fields ────────────────────────────────────────────

  /** Extended project overview (2–3 paragraphs) */
  overview: string
  /** The problem or challenge the project addressed */
  challenge: string
  /** How the team approached and solved the challenge */
  solution: string
  /** Outcomes, metrics, and impact */
  results: string
  /** Gallery image paths relative to `/public`, or null if no gallery */
  gallery: string[] | null
  /** External links (app stores, live URLs, repos, etc.) */
  links: ProjectLinks
  /** Client name (if disclosable), or null */
  client: string | null
  /** Team's role on the project (e.g. "Design & Development"), or null */
  role: string | null
}

/**
 * State shape for the Dev-Mode context.
 */
export interface DevModeState {
  /** Whether Dev-Mode is currently active */
  isDevMode: boolean
  /** Toggle Dev-Mode on/off */
  toggleDevMode: () => void
}

/**
 * Navigation link item used by header, mobile nav, and footer.
 */
export interface NavItem {
  /** Display label */
  label: string
  /** Route path */
  href: string
}

// ---------------------------------------------------------------------------
// Company & Team
// ---------------------------------------------------------------------------

/**
 * Social media platform identifiers.
 */
export type SocialPlatform = "GitHub" | "LinkedIn" | "X"

/**
 * A social media profile link.
 */
export interface SocialLink {
  /** Platform name */
  platform: SocialPlatform
  /** Full URL to the profile */
  url: string
  /** Accessible label (e.g. "GitHub", "X / Twitter") */
  label: string
}

/**
 * Centralized company identity and contact information.
 */
export interface CompanyInfo {
  /** Trading / brand name */
  name: string
  /** Legal entity name (if different) */
  legalName?: string
  /** Primary website URL (no trailing slash) */
  url: string
  /** Primary contact email */
  email: string
  /** City / region label */
  location: string
  /** Brand tagline */
  tagline: string
  /** Short company description for SEO / meta tags */
  description: string
  /** Current availability window (e.g. "Q3 2026") */
  availability: string
  /** Year the company was founded — used to compute "years of craft" */
  foundedYear: number
  /** Twitter / X handle (including @) */
  twitter: string
  /** Percentage string for client retention (e.g. "99%") */
  clientRetention: string
}

/**
 * A team member displayed on the About page.
 */
export interface TeamMember {
  /** Full name */
  name: string
  /** Job title or role */
  role: string
  /** Short biographical blurb (1–2 sentences) */
  bio: string
  /** Path to upper-body portrait image relative to `/public`, or null for fallback avatar */
  portrait: string | null
  /** Optional social profile links */
  socials?: SocialLink[]
}
