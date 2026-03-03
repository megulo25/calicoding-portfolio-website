"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
} as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PageTransitionProps {
  children: ReactNode
  /** Optional CSS class on the motion wrapper */
  className?: string
}

/**
 * PageTransition — fade + slide wrapper for route content.
 *
 * Wrap page content in this component to get an entrance/exit
 * animation powered by Framer Motion. Works with `template.tsx`
 * so Next.js re-mounts on every route change.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}
