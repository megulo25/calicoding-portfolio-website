import type { Metadata } from "next"
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
    </>
  )
}
