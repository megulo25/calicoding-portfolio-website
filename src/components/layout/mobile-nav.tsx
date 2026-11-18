"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import type { NavItem } from "@/types"
import { NavLink } from "@/components/ui/nav-link"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
} as const

const menuVariants = {
  closed: { x: "100%" },
  open: {
    x: "0%",
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
} as const

const itemVariants = {
  closed: { opacity: 0, x: 24 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
} as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * MobileNav — full-screen mobile navigation overlay.
 *
 * - Slides in from the right with Framer Motion.
 * - Staggered link entrance animation.
 * - Scroll-locks `<body>` while open.
 * - Auto-closes on route change.
 * - Visible only below `md` breakpoint (≥768px hidden via CSS).
 */
export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // Auto-close on route change
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // Only react to pathname changes, not to isOpen/onClose identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-nav-backdrop"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[calc(var(--z-nav)-1)] bg-obsidian/80 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="mobile-nav-panel"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-[var(--z-nav)] flex w-full max-w-sm flex-col bg-obsidian-light pt-24 md:hidden"
          >
            {/* Copper accent line along left edge */}
            <div
              className="absolute inset-y-0 left-0 w-px bg-copper/30"
              aria-hidden="true"
            />

            <ul className="flex flex-col gap-2 px-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  custom={i}
                >
                  <NavLink
                    {...item}
                    onClick={onClose}
                  />
                </motion.li>
              ))}
            </ul>

          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
