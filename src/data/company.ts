import type { CompanyInfo, SocialLink } from "@/types"

// =============================================================================
// Megulo Abebe — Centralized Identity Information
//
// Single source of truth for company identity, contact details, and social
// links. Every page that needs company info should import from here rather
// than hardcoding values.
// =============================================================================

export const COMPANY: CompanyInfo = {
  name: "Megulo Abebe",
  url: "https://meguloabebe.com/",
  email: "meguloabebe@gmail.com",
  location: "San Diego, CA",
  tagline: "Software Engineer",
  description: "Software engineer shipping iOS, Android, TV and web apps for NBC Sports Next, Credit Acceptance and Solar Turbines — now leading AI-native, agent-driven development.",
  foundedYear: 2019,
  twitter: "@megulo25",
} as const

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/megulo25",
    label: "GitHub",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/megulo-a-751a5393/",
    label: "LinkedIn",
  },
  {
    platform: "X",
    url: "https://x.com/megulo25",
    label: "X / Twitter",
  },
] as const
