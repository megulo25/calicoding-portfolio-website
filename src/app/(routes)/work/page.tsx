import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: "Work — Foundry Tech",
  description:
    "Selected projects spanning Mobile, Web, TV, and IoT — engineered at the intersection of design and technology.",
}

/**
 * /work — Portfolio project gallery.
 *
 * Phase 13 will populate this with the project grid + filtering.
 * For now, the structural skeleton is in place.
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

      {/* Project grid placeholder */}
      <SectionWrapper id="projects" className="pb-24 md:pb-32">
        <Container>
          <div className="col-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.08}>
                <div
                  className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light transition-colors duration-300 hover:border-copper/20"
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-canvas-dim/40">
                      Project {i + 1}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
