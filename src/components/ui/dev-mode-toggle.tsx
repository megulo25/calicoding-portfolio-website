"use client"

import { useDevMode } from "@/hooks/use-dev-mode"

/**
 * DevModeToggle — compact toggle switch for Dev-Mode.
 *
 * Renders a pill-shaped toggle with an animated thumb that
 * glows safety-orange when active. Includes keyboard (Enter/Space)
 * and screen-reader support.
 */
export function DevModeToggle() {
  const { isDevMode, toggleDevMode } = useDevMode()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDevMode}
      aria-label="Toggle Dev-Mode grid overlay"
      onClick={toggleDevMode}
      className="dev-toggle group relative flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-canvas/10 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
      style={{
        backgroundColor: isDevMode
          ? "var(--color-safety-orange)"
          : "var(--color-obsidian-lighter)",
      }}
    >
      {/* Thumb */}
      <span
        className="pointer-events-none block size-3.5 rounded-full bg-canvas shadow-sm transition-transform duration-300 ease-out"
        style={{
          transform: isDevMode ? "translateX(17px)" : "translateX(3px)",
        }}
        aria-hidden="true"
      />
      {/* Tooltip */}
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-obsidian-lighter px-2 py-0.5 font-mono text-[0.625rem] text-canvas-dim opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {isDevMode ? "Dev ON" : "Dev OFF"}
      </span>
    </button>
  )
}
