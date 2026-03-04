import type { TeamMember } from "@/types"

// =============================================================================
// Foundry Tech — Team Member Data
//
// Single source of truth for team / staff information displayed on the About
// page (and anywhere else team data is needed).
//
// Portrait images should be placed in /public/images/team/ and referenced by
// their path relative to /public (e.g. "/images/team/megulo-abebe.jpg").
// Set `portrait` to `null` to fall back to a gradient-initials avatar.
// =============================================================================

export const TEAM: readonly TeamMember[] = [
  {
    name: "Megulo Abebe",
    role: "Founder & Lead Engineer",
    bio: "7 years building digital products across startups and Fortune 500s. Obsessed with systems thinking and clean architecture.",
    portrait: "/images/team/megulo.jpg",
    socials: [
      { platform: "GitHub", url: "https://github.com/megulo25", label: "GitHub" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/megulo-a-751a5393/", label: "LinkedIn" },
      { platform: "X", url: "https://x.com/megulo25", label: "X / Twitter" },
    ],
  }
] as const
