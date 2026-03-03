"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { NavItem } from "@/types"

interface NavLinkProps extends NavItem {
  /** Optional callback when the link is clicked (e.g., close mobile menu) */
  onClick?: () => void
}

/**
 * NavLink — navigation link with active-route detection.
 *
 * Active state is indicated by a copper underline and brighter text.
 * Hover state slides a copper underline from left to right.
 */
export function NavLink({ label, href, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      {...(onClick ? { onClick } : {})}
      className="nav-link group relative font-mono text-[0.8125rem] uppercase tracking-[0.15em] transition-colors duration-300"
      data-active={isActive || undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={
          isActive
            ? "text-copper"
            : "text-canvas-dim group-hover:text-canvas"
        }
      >
        {label}
      </span>
      {/* Underline indicator */}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-copper transition-all duration-300 ease-out ${
          isActive
            ? "w-full"
            : "w-0 group-hover:w-full"
        }`}
        aria-hidden="true"
      />
    </Link>
  )
}
