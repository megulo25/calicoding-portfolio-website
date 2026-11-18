import Link from "next/link"
import { COMPANY } from "@/data/company"

/**
 * Logo — brand wordmark (first word bold, the rest small caps).
 *
 * Uses the headline (serif) font with tight tracking for an
 * industrial-luxe feel. The "FOUNDRY" text is displayed in
 * all-caps with "TECH" in a lighter weight beneath / beside it.
 */
export function Logo() {
  const [first, ...rest] = COMPANY.name.split(" ")

  return (
    <Link
      href="/"
      aria-label={`${COMPANY.name} — Home`}
      className="group flex items-baseline gap-2"
    >
      <span className="font-headline text-[1.35rem] font-bold uppercase tracking-[0.08em] text-canvas transition-colors duration-300 group-hover:text-copper">
        {first}
      </span>
      {rest.length > 0 && (
        <span className="font-mono text-[0.6875rem] font-light uppercase tracking-[0.2em] text-canvas-dim transition-colors duration-300 group-hover:text-copper-light">
          {rest.join(" ")}
        </span>
      )}
    </Link>
  )
}
