"use client"

/**
 * GridOverlay — a fixed, non-interactive overlay that visualizes the
 * 12-column Architect's Grid and 8px baseline rhythm.
 *
 * Visibility is controlled purely via CSS:
 *   - Hidden by default (`opacity: 0; pointer-events: none`)
 *   - Shown when `[data-dev-mode="true"]` is set on `<html>`
 *
 * This component is always mounted in the DOM for instant toggling
 * without React re-renders.
 */
export function GridOverlay() {
  return (
    <div
      className="grid-overlay pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300 [html[data-dev-mode='true']_&]:opacity-100"
      aria-hidden="true"
    >
      {/* Baseline rhythm guide (8px horizontal lines) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 7px, rgba(184, 115, 51, 0.04) 7px, rgba(184, 115, 51, 0.04) 8px)",
        }}
      />

      {/* 12-column grid */}
      <div className="grid-architect mx-auto h-full max-w-[1440px]">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="relative h-full border-x border-copper/[0.07] bg-copper/[0.03]"
          >
            {/* Column number label */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[10px] tabular-nums text-copper/30">
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
