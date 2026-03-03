// =============================================================================
// Foundry Tech — Shared Type Definitions
// =============================================================================

/**
 * Project categories corresponding to Foundry Tech's four service pillars.
 */
export type ProjectCategory = "Mobile" | "Web" | "TV" | "IoT"

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
  /** Service category */
  category: ProjectCategory
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
  /** Path to headshot image relative to `/public`, or null for fallback avatar */
  headshot: string | null
  /** Optional social profile links */
  socials?: SocialLink[]
}
