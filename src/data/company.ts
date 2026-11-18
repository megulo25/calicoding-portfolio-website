import type { CompanyInfo, SocialLink } from "@/types"

// =============================================================================
// Megulo Abebe Inc. — Centralized Company Information
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
  tagline: "We Build What's Next.",
  description: "Megulo Abebe Inc. is a digital product studio specializing in Mobile, Web, TV, and IoT experiences.",
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
