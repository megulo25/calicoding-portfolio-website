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
