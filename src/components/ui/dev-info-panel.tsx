"use client"

import { usePathname } from "next/navigation"
import { useDevMode } from "@/hooks/use-dev-mode"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const BREAKPOINTS = [
  { label: "sm", min: 640 },
  { label: "md", min: 768 },
  { label: "lg", min: 1024 },
  { label: "xl", min: 1280 },
  { label: "2xl", min: 1536 },
] as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * DevInfoPanel — a persistent info bar at the bottom of the viewport
 * (visible only in Dev-Mode) showing:
 *   - Current breakpoint
 *   - Viewport dimensions
 *   - Current route path
 *   - Grid column count
 *
 * Visibility is controlled via `data-dev-mode` on `<html>`.
 */
export function DevInfoPanel() {
  const { isDevMode } = useDevMode()
  const pathname = usePathname()

  if (!isDevMode) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-copper/20 bg-obsidian/95 px-4 py-2 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-canvas-dim">
        {/* Breakpoint indicator */}
        <div className="flex items-center gap-3">
          <span className="text-copper">Breakpoint:</span>
          {BREAKPOINTS.map((bp) => (
            <span
              key={bp.label}
              className={`hidden rounded bg-obsidian-lighter px-1.5 py-0.5 ${getBreakpointVisibilityClass(bp.label)}`}
            >
              {bp.label} ({bp.min}+)
            </span>
          ))}
          <span className="rounded bg-obsidian-lighter px-1.5 py-0.5 sm:hidden">
            xs (&lt;640)
          </span>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2">
          <span className="text-copper">Route:</span>
          <span>{pathname}</span>
        </div>

        {/* Grid columns */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-copper">Grid:</span>
          <span className="lg:hidden">8 cols</span>
          <span className="hidden lg:inline">12 cols</span>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="hidden items-center gap-1 lg:flex">
          <kbd className="rounded bg-obsidian-lighter px-1.5 py-0.5 text-[0.5625rem]">
            ⌘
          </kbd>
          <kbd className="rounded bg-obsidian-lighter px-1.5 py-0.5 text-[0.5625rem]">
            ⇧
          </kbd>
          <kbd className="rounded bg-obsidian-lighter px-1.5 py-0.5 text-[0.5625rem]">
            D
          </kbd>
          <span className="ml-1 text-canvas-dim/50">to toggle</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns a Tailwind class that hides/shows the element based on breakpoint.
 * Each breakpoint label is shown only at that exact breakpoint range.
 */
function getBreakpointVisibilityClass(label: string): string {
  switch (label) {
    case "sm":
      return "sm:inline md:hidden"
    case "md":
      return "md:inline lg:hidden"
    case "lg":
      return "lg:inline xl:hidden"
    case "xl":
      return "xl:inline 2xl:hidden"
    case "2xl":
      return "2xl:inline"
    default:
      return ""
  }
}
