"use client"

import { useSyncExternalStore } from "react"

// =============================================================================
// ThemeToggle — switches between Light (the default for every visitor) and
// Dark. Choosing Dark is saved in localStorage and set as <html data-theme>;
// the inline THEME_SCRIPT re-applies it before first paint on later visits so
// there is no flash of the light theme.
// =============================================================================

type Theme = "light" | "dark"

const STORAGE_KEY = "theme"
const EVENT = "themechange"

/** Runs in <head> before the page renders. Keep it tiny and dependency-free. */
export const THEME_SCRIPT = `try{if(localStorage.getItem("${STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light"
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  try {
    if (theme === "dark") localStorage.setItem(STORAGE_KEY, "dark")
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked (private mode etc.) — the choice still applies to this page view.
  }
  if (theme === "dark") root.dataset.theme = "dark"
  else delete root.dataset.theme
  window.dispatchEvent(new Event(EVENT))
}

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  className: "h-[18px] w-[18px]",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

export function ThemeToggle() {
  // Server render (and first client render) assume the light default.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme)
  const dark = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => applyTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      title={dark ? "Light theme" : "Dark theme"}
      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {/* Shows the theme you'll switch to. */}
      {dark ? (
        <svg {...ICON_PROPS}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
        </svg>
      ) : (
        <svg {...ICON_PROPS}>
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  )
}
