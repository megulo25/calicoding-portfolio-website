import Link from "next/link"
import type { ReactNode } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { HOME_FEATURED_SLUGS, PROJECTS } from "@/data/projects"
import { ProjectCard } from "@/components/ui/project-card"
import { nextAvailableQuarter } from "@/lib/utils/availability"
import { Container } from "@/components/ui/container"
import { ParallaxLayer } from "@/components/ui/parallax-layer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { getProjectStats } from "@/lib/utils/project-stats"

const SERVICES: readonly { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" />
      </svg>
    ),
    title: "Mobile",
    body: "Native and cross-platform apps that feel at home on every device.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
    ),
    title: "Web",
    body: "Performant, accessible web experiences built with modern frameworks.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "TV",
    body: "Big-screen interfaces for streaming, smart TV, and digital signage.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
      </svg>
    ),
    title: "IoT",
    body: "Connected experiences from wearables to industrial control systems.",
  },
]

const FEATURED = HOME_FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(
  (p): p is (typeof PROJECTS)[number] => Boolean(p),
)

const STATS = getProjectStats()

export default function Home() {
  return (
    <>
      {/* Hero — full viewport with 3D scene */}
      <HeroSection />

      {/* Selected work — the first thing below the hero */}
      <SectionWrapper id="selected-work" ariaLabel="Selected Work" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full mb-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Selected Work
            </p>
          </ScrollReveal>
          <ScrollReveal className="col-full mb-12 flex flex-wrap items-end justify-between gap-6" delay={0.1}>
            <h2 className="max-w-2xl">Recent work, across every screen.</h2>
            <Link
              href="/work"
              className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-canvas-dim transition-colors duration-300 hover:text-copper"
              data-cursor="hover"
            >
              All {PROJECTS.length} projects <span aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
          <div className="col-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((project, i) => (
              <ProjectCard key={project.id} project={project} large={i === 0} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Services overview */}
      <SectionWrapper id="services" ariaLabel="Our Services" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full mb-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              What We Do
            </p>
          </ScrollReveal>
          <ScrollReveal className="col-full mb-12 lg:col-span-8" delay={0.1}>
            <h2 className="max-w-2xl">
              Four pillars. One unified craft.
            </h2>
          </ScrollReveal>

          <div className="col-full grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.title} delay={0.1 + i * 0.08}>
                <div className="group h-full rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light p-6 transition-colors duration-300 hover:border-copper/20">
                  <span className="mb-4 block text-copper" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-canvas-dim">
                    {service.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Stats / proof points */}
      <SectionWrapper id="proof" ariaLabel="By the numbers">
        <Container>
          <ParallaxLayer speed={0.1} className="col-full">
            <ScrollReveal>
              <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-canvas/6 sm:grid-cols-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center bg-obsidian-light px-6 py-10 text-center"
                  >
                    <span className="font-headline text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-copper">
                      {stat.value}
                    </span>
                    <span className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-canvas-dim">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </ParallaxLayer>
        </Container>
      </SectionWrapper>

      {/* CTA band */}
      <SectionWrapper id="cta" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full" direction="none">
            <div className="flex flex-col items-center text-center">
              <h2 className="max-w-xl">Ready to build something extraordinary?</h2>
              <p className="mt-4 max-w-md text-canvas-dim">
                Let&apos;s talk about your next project. We&apos;re currently
                accepting new engagements for {nextAvailableQuarter()}.
              </p>
              <a
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-copper px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-obsidian transition-all duration-300 hover:bg-copper-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                data-cursor="hover"
              >
                Start a Project
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  )
}
