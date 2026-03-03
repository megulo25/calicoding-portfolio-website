import type { Metadata } from "next"
import Link from "next/link"
import { WorkGallery } from "@/components/sections/work-gallery"
import { Container } from "@/components/ui/container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: "Work — Foundry Tech",
  description:
    "Selected projects spanning Mobile, Web, TV, and IoT — engineered at the intersection of design and technology.",
}

/**
 * /work — Portfolio project gallery with category filtering.
 */
export default function WorkPage() {
  return (
    <>
      {/* Hero banner */}
      <SectionWrapper id="work-hero" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full">
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Selected Projects
            </p>
            <h1 className="max-w-3xl font-bold">
              Work that speaks for itself.
            </h1>
            <p className="mt-6 max-w-xl text-canvas-dim">
              A curated selection of projects across Mobile, Web, TV, and IoT
              — each one a testament to precision engineering and intentional
              design.
            </p>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Filterable project grid */}
      <SectionWrapper id="projects" className="pb-24 md:pb-32">
        <Container>
          <div className="col-full">
            <WorkGallery />
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA band */}
      <SectionWrapper id="work-cta" className="pb-24 md:pb-32">
        <Container>
          <ScrollReveal className="col-full" direction="none">
            <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-canvas/6 bg-obsidian-light px-8 py-16 text-center md:px-16 md:py-20">
              <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                Have a Project in Mind?
              </p>
              <h2 className="max-w-xl">
                Let&apos;s create something worth shipping.
              </h2>
              <p className="mt-4 max-w-md text-canvas-dim">
                Every great product starts with a conversation. Tell us about
                your vision and we&apos;ll show you how we can bring it to
                life.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-copper px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-obsidian transition-all duration-300 hover:bg-copper-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                data-cursor="hover"
              >
                Start a Project
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  )
}
