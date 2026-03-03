import Link from "next/link"

/**
 * Logo — Foundry Tech wordmark.
 *
 * Uses the headline (serif) font with tight tracking for an
 * industrial-luxe feel. The "FOUNDRY" text is displayed in
 * all-caps with "TECH" in a lighter weight beneath / beside it.
 */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Foundry Tech — Home"
      className="group flex items-baseline gap-2"
    >
      <span className="font-headline text-[1.35rem] font-bold uppercase tracking-[0.08em] text-canvas transition-colors duration-300 group-hover:text-copper">
        Foundry
      </span>
      <span className="font-mono text-[0.6875rem] font-light uppercase tracking-[0.2em] text-canvas-dim transition-colors duration-300 group-hover:text-copper-light">
        Tech
      </span>
    </Link>
  )
}
