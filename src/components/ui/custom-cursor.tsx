"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CursorVariant = "default" | "hover" | "text" | "hidden"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Selectors that trigger the "hover" cursor variant */
const HOVER_SELECTORS = "a, button, [role='button'], [data-cursor='hover']"

/** Selectors that trigger the "text" cursor variant */
const TEXT_SELECTORS = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, [data-cursor='text']"

/** Spring config for smooth cursor following */
const SPRING_CONFIG = { damping: 30, stiffness: 400, mass: 0.5 }

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * CustomCursor — dot + ring cursor that responds to element hover states.
 *
 * Variants:
 * - `default`: Small dot (6px) + outer ring (36px)
 * - `hover`: Ring expands (56px), dot shrinks, both turn copper
 * - `text`: Ring collapses to a thin vertical bar (text cursor)
 * - `hidden`: Both elements fade out (e.g., when cursor leaves viewport)
 *
 * Touch devices: Hidden entirely via CSS `@media (pointer: coarse)`.
 */
export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default")
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Smoothed values for the ring (trails behind the dot slightly)
  const ringX = useSpring(cursorX, SPRING_CONFIG)
  const ringY = useSpring(cursorY, SPRING_CONFIG)

  // Ref to avoid stale closures in the RAF loop
  const rafRef = useRef<number>(0)
  const mousePos = useRef({ x: 0, y: 0 })

  // ---- Mouse move handler (high perf — uses RAF) ----
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (!isVisible) setIsVisible(true)

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(mousePos.current.x)
        cursorY.set(mousePos.current.y)
      })
    },
    [cursorX, cursorY, isVisible],
  )

  // ---- Element hover detection via event delegation ----
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    if (target.closest(HOVER_SELECTORS)) {
      setVariant("hover")
    } else if (target.closest(TEXT_SELECTORS)) {
      setVariant("text")
    } else {
      setVariant("default")
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    setVariant("default")
  }, [])

  const handleMouseEnterViewport = useCallback(() => {
    setIsVisible(true)
  }, [])

  // ---- Listeners ----
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnterViewport)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnterViewport)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnterViewport])

  // ---- Variant-dependent sizes ----
  const dotSize = variant === "hover" ? 4 : variant === "text" ? 2 : 6
  const ringSize = variant === "hover" ? 56 : variant === "text" ? 2 : 36
  const ringHeight = variant === "text" ? 24 : ringSize
  const dotColor =
    variant === "hover"
      ? "var(--color-copper)"
      : "var(--color-canvas)"
  const ringBorder =
    variant === "hover"
      ? "var(--color-copper)"
      : "rgba(242, 240, 233, 0.25)"

  return (
    // Hidden on touch devices
    <div className="pointer-events-none fixed inset-0 z-[var(--z-cursor)] hidden md:block coarse-pointer:hidden">
      {/* Dot — follows mouse exactly */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.25s, height 0.25s, background-color 0.25s, opacity 0.2s",
        }}
        aria-hidden="true"
      />

      {/* Ring — trails behind with spring physics */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringHeight,
          borderColor: ringBorder,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? (variant === "text" ? 0.6 : 0.5) : 0,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.2s",
        }}
        aria-hidden="true"
      />
    </div>
  )
}
