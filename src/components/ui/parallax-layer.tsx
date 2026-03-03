"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ParallaxLayerProps {
  children: ReactNode
  /** Vertical parallax intensity. Positive = scrolls slower (further away).
   *  Negative = scrolls faster (closer). Default `0.2`. */
  speed?: number
  /** Extra className on the wrapper. */
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ParallaxLayer — applies a vertical parallax offset to children based on
 * the element's scroll position relative to the viewport.
 *
 * `speed` controls the intensity:
 *   - `0` = no effect
 *   - `0.2` = subtle background-like depth
 *   - `-0.1` = foreground pop-out
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Map full scroll-through range [0,1] → vertical shift
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      {...(className ? { className } : {})}
    >
      {children}
    </motion.div>
  )
}
