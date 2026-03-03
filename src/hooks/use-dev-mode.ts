"use client"

import { useContext } from "react"
import { DevModeContext } from "@/lib/context/dev-mode-context"
import type { DevModeState } from "@/types"

/**
 * useDevMode — convenience hook for consuming the Dev-Mode context.
 *
 * Throws a descriptive error if used outside of `<DevModeProvider>`.
 *
 * @example
 * ```tsx
 * const { isDevMode, toggleDevMode } = useDevMode()
 * ```
 */
export function useDevMode(): DevModeState {
  const context = useContext(DevModeContext)
  if (!context) {
    throw new Error(
      "useDevMode must be used within a <DevModeProvider>. " +
      "Wrap your app with <DevModeProvider> in layout.tsx."
    )
  }
  return context
}
