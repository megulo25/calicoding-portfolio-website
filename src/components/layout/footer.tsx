import Link from "next/link"
import { COMPANY, SOCIAL_LINKS } from "@/data/company"

/**
 * Footer — a closing call to action, then contact links and copyright.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-line" role="contentinfo">
      <div className="shell py-16 md:py-24">
        <p className="eyebrow">Let&apos;s talk</p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)]">
          Have an app to build, rebuild, or <span className="serif-accent">rescue</span>?
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-muted">
          I&apos;m happy to talk about roles, contract work, or a second opinion on your mobile or web
          codebase.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${COMPANY.email}`} className="btn btn-primary">
            {COMPANY.email}
          </a>
          {SOCIAL_LINKS.filter((l) => l.platform === "LinkedIn").map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {COMPANY.name} · {COMPANY.location}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/work" className="hover:text-ink">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
            </li>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
