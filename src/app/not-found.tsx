import Link from "next/link"
import type { Metadata } from "next"
import { COMPANY } from "@/data/company"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: `404 — Page Not Found | ${COMPANY.name}`,
  description: "The page you're looking for doesn't exist or has been moved.",
}

/**
 * Custom 404 — Not Found page.
 *
 * Uses the design system's industrial aesthetic with a clear
 * call-to-action to navigate back.
 */
export default function NotFound() {
  return (
    <SectionWrapper className="flex min-h-[60dvh] items-center py-24 md:py-32">
      <Container>
        <div className="col-full flex flex-col items-center text-center">
          {/* 404 display number */}
          <span className="font-headline text-[clamp(6rem,20vw,12rem)] font-bold leading-none text-copper/20">
            404
          </span>

          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-canvas-dim">
            The page you&apos;re looking for doesn&apos;t exist, has been
            moved, or is temporarily unavailable.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-copper px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-obsidian transition-all duration-300 hover:bg-copper-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              data-cursor="hover"
            >
              <span aria-hidden="true">←</span>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-canvas/20 px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-canvas transition-all duration-300 hover:border-copper hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              data-cursor="hover"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
