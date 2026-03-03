import { HeroSection } from "@/components/sections/hero-section"
import { Container } from "@/components/ui/container"
import { ParallaxLayer } from "@/components/ui/parallax-layer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const SERVICES = [
  {
    icon: "📱",
    title: "Mobile",
    body: "Native and cross-platform apps that feel at home on every device.",
  },
  {
    icon: "🌐",
    title: "Web",
    body: "Performant, accessible web experiences built with modern frameworks.",
  },
  {
    icon: "📺",
    title: "TV",
    body: "Big-screen interfaces for streaming, smart TV, and digital signage.",
  },
  {
    icon: "⚙️",
    title: "IoT",
    body: "Connected experiences from wearables to industrial control systems.",
  },
] as const

const STATS = [
  { value: "50+", label: "Projects Shipped" },
  { value: "4", label: "Platforms Covered" },
  { value: "12", label: "Years of Craft" },
  { value: "99%", label: "Client Retention" },
] as const

export default function Home() {
  return (
    <>
      {/* Hero — full viewport with 3D scene */}
      <HeroSection />

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
                  <span className="mb-4 block text-2xl" aria-hidden="true">
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
              <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-canvas/6 sm:grid-cols-2 lg:grid-cols-4">
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
                accepting new engagements for Q3 2026.
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
