import type { Platform } from "@/types"

// =============================================================================
// Shared Constants
// =============================================================================

/**
 * Per-platform gradient classes for placeholder thumbnails / hero images.
 * Used by ProjectCard and the project detail page.
 */
export const PLATFORM_GRADIENTS: Record<Platform, string> = {
  Mobile: "from-copper/20 via-safety-orange/10 to-obsidian-light",
  Web: "from-copper/15 via-copper-dark/10 to-obsidian-light",
  TV: "from-safety-orange/15 via-copper/10 to-obsidian-light",
  IoT: "from-copper-dark/20 via-safety-orange/8 to-obsidian-light",
}
