"use client"

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { DevModeState } from "@/types"

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

const STORAGE_KEY = "foundry-dev-mode"

export const DevModeContext = createContext<DevModeState | null>(null)

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

interface DevModeProviderProps {
  children: ReactNode
}

/**
 * DevModeProvider — manages the Dev-Mode toggle state.
 *
 * - Persists preference to `localStorage`.
 * - Syncs `data-dev-mode` attribute on `<html>` so CSS can target
 *   `[data-dev-mode="true"]` for grid overlay, bounding boxes, etc.
 * - Registers `Ctrl+Shift+D` (or `Cmd+Shift+D` on macOS) keyboard shortcut.
 */
export function DevModeProvider({ children }: DevModeProviderProps) {
  const [isDevMode, setIsDevMode] = useState(() => {
    // Lazy initializer — runs once during state creation, not in an effect.
    // Safe because this only executes on the client ("use client" boundary).
    if (typeof window === "undefined") return false
    try {
      return localStorage.getItem(STORAGE_KEY) === "true"
    } catch {
      return false
    }
  })

  // Sync data attribute on <html> whenever state changes
  useEffect(() => {
    document.documentElement.dataset.devMode = String(isDevMode)
  }, [isDevMode])

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isDevMode))
    } catch {
      // localStorage unavailable — silently ignore
    }
  }, [isDevMode])

  const toggleDevMode = useCallback(() => {
    setIsDevMode((prev) => !prev)
  }, [])

  // Keyboard shortcut: Ctrl+Shift+D / Cmd+Shift+D
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "D" && e.shiftKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleDevMode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleDevMode])

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  )
}
