import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: "About — Foundry Tech",
  description:
    "The team, philosophy, and process behind Foundry Tech — forging digital experiences across every screen.",
}

/**
 * /about — Company story, team, philosophy, and process.
 *
 * Phase 14 will flesh this out with full content sections.
 */
export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper id="about-hero" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full lg:col-span-8">
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              About Us
            </p>
            <h1 className="max-w-3xl font-bold">
              Forged in precision. Built to last.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-canvas-dim">
              Foundry Tech is a digital product studio specializing in
              Mobile, Web, TV, and IoT experiences. We combine rigorous
              engineering with intentional design to build software that
              performs — and endures.
            </p>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Philosophy */}
      <SectionWrapper id="philosophy" ariaLabel="Our Philosophy">
        <Container>
          <ScrollReveal className="col-full mb-12 lg:col-span-4">
            <h2>Our Philosophy</h2>
          </ScrollReveal>
          <div className="col-full grid gap-8 md:grid-cols-3 lg:col-span-8">
            {(
              [
                {
                  title: "Precision First",
                  body: "Every pixel, every interaction, every line of code is deliberate. We don't ship rough edges.",
                },
                {
                  title: "Cross-Platform Fluency",
                  body: "From 4-inch screens to 85-inch displays, from wearables to industrial IoT — we speak every platform's language.",
                },
                {
                  title: "Lasting Architecture",
                  body: "We build systems, not throwaway prototypes. Our code is designed to scale, evolve, and endure.",
                },
              ] as const
            ).map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 + i * 0.1}>
                <div
                  className="h-full rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light p-6"
                >
                  <h3 className="mb-3 text-base font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-canvas-dim">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper id="process" ariaLabel="Our Process" className="pb-24 md:pb-32">
        <Container>
          <ScrollReveal className="col-full mb-12">
            <h2>How We Work</h2>
          </ScrollReveal>
          <div className="col-full grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(
              [
                { step: "01", title: "Discover", body: "Deep dive into goals, users, and constraints." },
                { step: "02", title: "Design", body: "Systems-driven design from wireframe to prototype." },
                { step: "03", title: "Develop", body: "Clean architecture, rigorous code, iterative builds." },
                { step: "04", title: "Deploy", body: "Launch, monitor, optimize, and support." },
              ] as const
            ).map((item, i) => (
              <ScrollReveal key={item.step} delay={0.1 + i * 0.1} direction="left">
                <div className="group">
                  <span className="font-mono text-[2rem] font-bold text-copper/30 transition-colors duration-300 group-hover:text-copper">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-canvas-dim">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
