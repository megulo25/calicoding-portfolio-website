"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Direction = "up" | "down" | "left" | "right" | "none"

interface ScrollRevealProps {
  children: ReactNode
  /** Direction the element slides in from. Default `"up"`. */
  direction?: Direction
  /** Travel distance in px. Default `32`. */
  distance?: number
  /** Animation duration in seconds. Default `0.7`. */
  duration?: number
  /** Stagger delay in seconds (useful for lists). Default `0`. */
  delay?: number
  /** IntersectionObserver `amount` threshold. Default `0.2`. */
  threshold?: number
  /** Animate only once? Default `true`. */
  once?: boolean
  /** Extra className on the wrapper. */
  className?: string
}

// ---------------------------------------------------------------------------
// Offset helpers
// ---------------------------------------------------------------------------

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance }
    case "down":
      return { x: 0, y: -distance }
    case "left":
      return { x: distance, y: 0 }
    case "right":
      return { x: -distance, y: 0 }
    case "none":
      return { x: 0, y: 0 }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ScrollReveal — fade-and-slide entrance triggered when the element
 * scrolls into view. Wraps children in a `motion.div`.
 */
export function ScrollReveal({
  children,
  direction = "up",
  distance = 32,
  duration = 0.7,
  delay = 0,
  threshold = 0.2,
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })

  const offset = getOffset(direction, distance)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      {...(className ? { className } : {})}
    >
      {children}
    </motion.div>
  )
}
