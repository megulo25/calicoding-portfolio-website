"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { COMPANY } from "@/data/company"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { NavItem } from "@/types"

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/**
 * Header — sticky, translucent bar. Three links fit on every screen size, so
 * there is no hamburger menu to open.
 */
export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-[var(--z-nav)] border-b border-line bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <nav aria-label="Main navigation" className="shell flex h-14 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${COMPANY.name} — home`}>
          <span className="text-[0.9375rem] font-semibold tracking-tight">{COMPANY.name}</span>
          <span className="hidden text-sm text-ink-faint transition-colors group-hover:text-ink-muted lg:inline">
            {COMPANY.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      active ? "bg-surface-2 text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
