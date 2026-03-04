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
    bio: "12 years building digital products across startups and Fortune 500s. Obsessed with systems thinking and clean architecture.",
    portrait: null,
    socials: [
      { platform: "GitHub", url: "https://github.com/alexchen", label: "GitHub" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/alexchen", label: "LinkedIn" },
      { platform: "X", url: "https://x.com/alexchen", label: "X / Twitter" },
    ],
  },
  {
    name: "Joseph Brennan",
    role: "Design Director",
    bio: "From graphic design to interaction systems — Maya brings a rare blend of visual craft and technical fluency to every project.",
    portrait: null,
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/mayarodriguez", label: "LinkedIn" },
    ],
  },
  {
    name: "Danny Tran",
    role: "Platform Engineering Lead",
    bio: "Specialist in cross-platform architecture — from React Native to embedded IoT. Champion of developer experience.",
    portrait: null,
    socials: [
      { platform: "GitHub", url: "https://github.com/samokafor", label: "GitHub" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/samokafor", label: "LinkedIn" },
    ],
  },
] as const
