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
  /**
   * How screenshots are framed: "phone" renders portrait screenshots inside a
   * device frame, "browser" renders landscape screenshots inside a browser window,
   * "tv" renders 16:9 screenshots inside a television bezel, "render" shows
   * CAD / 3D renders as-is with no device chrome.
   */
  showcase: "phone" | "browser" | "tv" | "render"
  /**
   * Optional additional galleries for other platforms (e.g. a TV or watch
   * companion app), each shown under its own label on the case-study page.
   */
  extraGalleries?: ExtraGallery[]
  /**
   * Optional hero reel. Plays inside the showcase frame on the project card and
   * the case-study hero, in place of the thumbnail (which stays as the poster).
   */
  reel?: Reel
  /** Optional looping animation clips (muted, autoplay) shown on the case-study page */
  videos?: ProjectVideo[]
  /** Short, scannable list of key features shown on the case-study page */
  highlights: string[]
  /** Social share image (1200×630); defaults to the thumbnail */
  ogImage?: string
  /** Attribution for third-party content in the project's media */
  credits?: ProjectCredits
  /** Current status line (e.g. "Live on App Store & Google Play"), or null */
  status: string | null
}

/**
 * A short, muted, looping clip. Plays only while on screen.
 */
export interface Reel {
  /** MP4 path relative to `/public` (desktop / default) */
  src: string
  /** Optional portrait or smaller cut for phones (≤ 640 px wide) */
  mobileSrc?: string
  /** Poster frame path relative to `/public` (shown before load and for reduced motion) */
  poster: string
  /** Loop the clip (default true). A non-looping clip plays once, then shows a replay button. */
  loop?: boolean
}

/**
 * A captioned clip in the case study's "In Motion" section.
 */
export interface ProjectVideo extends Reel {
  /** Caption shown under the clip; also used as its accessible label */
  caption: string
  /** Device frame the clip plays in (default "render": no device chrome) */
  frame?: "tv" | "phone" | "render"
  /** Longer description for screen readers (defaults to the caption) */
  alt?: string
}

/**
 * Attribution for third-party content shown in a project's media
 * (e.g. Creative Commons films in a demo catalog).
 */
export interface ProjectCredits {
  /** One line per credited work */
  lines: string[]
  /** License links shown after the lines */
  licenses?: { label: string; href: string }[]
}

/**
 * A labelled set of screenshots for an additional platform.
 */
export interface ExtraGallery {
  /** Section label (e.g. "Apple TV") */
  label: string
  /** Device frame used for every image in this gallery */
  frame: "phone" | "browser" | "tv" | "watch" | "render"
  /** Image paths relative to `/public` */
  images: string[]
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
  /** Year the company was founded — used to compute "years of craft" */
  foundedYear: number
  /** Twitter / X handle (including @) */
  twitter: string
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
