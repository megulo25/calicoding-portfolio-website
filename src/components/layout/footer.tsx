import Link from "next/link"
import { COMPANY, SOCIAL_LINKS } from "@/data/company"
import type { NavItem } from "@/types"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/**
 * Footer — site-wide footer using the Architect's Grid.
 *
 * Layout (desktop):
 * ┌──────────────────────────────────────────────────────────────┐
 * │  ─────────────── thin ruled line ──────────────────────────  │
 * │                                                              │
 * │  FOUNDRY TECH            Navigation        Connect           │
 * │  We Build What's Next.   Work              GitHub            │
 * │                          About             LinkedIn          │
 * │                          Contact           X / Twitter       │
 * │                                                              │
 * │  ─────────────── thin ruled line ──────────────────────────  │
 * │  © 2026 Foundry Tech. All rights reserved.                   │
 * └──────────────────────────────────────────────────────────────┘
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="mt-auto border-t border-canvas/6"
      role="contentinfo"
    >
      {/* Upper section — branding, nav, social */}
      <div className="grid-architect mx-auto max-w-[1440px] py-16 md:py-20">
        {/* Branding block */}
        <div className="col-span-full mb-10 md:col-span-4 md:mb-0 lg:col-span-5">
          <Link
            href="/"
            aria-label={`${COMPANY.name} — Home`}
            className="group mb-4 inline-flex items-baseline gap-2"
          >
            <span className="font-headline text-[1.35rem] font-bold uppercase tracking-[0.08em] text-canvas transition-colors duration-300 group-hover:text-copper">
              Foundry
            </span>
            <span className="font-mono text-[0.6875rem] font-light uppercase tracking-[0.2em] text-canvas-dim transition-colors duration-300 group-hover:text-copper-light">
              Tech
            </span>
          </Link>
          <p className="mt-3 max-w-xs font-mono text-[0.8125rem] leading-relaxed text-canvas-dim">
            We Build What&apos;s Next&nbsp;&mdash; Mobile, Web, TV&nbsp;&amp;&nbsp;IoT.
          </p>
        </div>

        {/* Navigation column */}
        <div className="col-span-2 md:col-span-2 lg:col-span-3">
          <h3 className="mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-canvas-dim">
            Navigation
          </h3>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-canvas/70 transition-colors duration-300 hover:text-copper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Connect column */}
        <div className="col-span-2 md:col-span-2 lg:col-span-4">
          <h3 className="mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-canvas-dim">
            Connect
          </h3>
          <ul className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-canvas/70 transition-colors duration-300 hover:text-copper"
                >
                  {link.label}
                  {/* External link arrow */}
                  <span
                    className="text-[0.625rem] text-canvas-dim transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div className="border-t border-canvas/6">
        <div className="grid-architect mx-auto max-w-[1440px] py-6">
          <p className="col-span-full text-center font-mono text-[0.6875rem] tracking-[0.1em] text-canvas-dim/60 md:text-left">
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
