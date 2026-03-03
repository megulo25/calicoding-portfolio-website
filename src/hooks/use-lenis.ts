"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * useLenis — initializes Lenis smooth scroll on mount.
 *
 * - Creates a single Lenis instance attached to the default scroller.
 * - Drives the scroll loop via `requestAnimationFrame`.
 * - Cleans up on unmount.
 *
 * Call this hook once from the Providers component.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
