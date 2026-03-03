"use client"

import { useCallback, useEffect, useState } from "react"
import type { NavItem } from "@/types"
import { Logo } from "@/components/ui/logo"
import { NavLink } from "@/components/ui/nav-link"
import { DevModeToggle } from "@/components/ui/dev-mode-toggle"
import { MenuToggle } from "@/components/ui/menu-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"

// ---------------------------------------------------------------------------
// Navigation items
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/** Scroll distance (px) before the header background becomes opaque. */
const SCROLL_THRESHOLD = 40

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

/**
 * Header — fixed site header with scroll-aware background.
 *
 * Structure:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Logo            Work   About   Contact         [Dev ⚙]    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * - Transparent at top of page → semi-opaque obsidian + blur after scroll.
 * - Desktop nav links with active-route copper underline.
 * - Dev-Mode toggle switch (far right).
 * - z-index: nav (100) to sit above content but below modals.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window === "undefined") return false
    return window.scrollY > SCROLL_THRESHOLD
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <header
      className="fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-500"
      style={{
        backgroundColor: isScrolled
          ? "rgba(10, 10, 10, 0.92)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Subtle bottom border when scrolled */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-canvas/6 transition-opacity duration-500"
        style={{ opacity: isScrolled ? 1 : 0 }}
        aria-hidden="true"
      />

      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-[clamp(1rem,4vw,4rem)]"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation — hidden on mobile (Phase 8 adds mobile nav) */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <DevModeToggle />
          <MenuToggle
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}
