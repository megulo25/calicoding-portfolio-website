import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { COMPANY } from "@/data/company"
import { TEAM } from "@/data/team"
import { Container } from "@/components/ui/container"
import { getAboutStats } from "@/lib/utils/project-stats"
import { ParallaxLayer } from "@/components/ui/parallax-layer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { withBasePath } from "@/lib/utils"

export const metadata: Metadata = {
  title: `About — ${COMPANY.name}`,
  description:
    `The team, philosophy, and process behind ${COMPANY.name} — forging digital experiences across every screen.`,
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PHILOSOPHY = [
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

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "We start by listening — deep diving into your business goals, user needs, technical constraints, and market landscape to build a strategic foundation.",
  },
  {
    step: "02",
    title: "Design",
    body: "Systems-driven design from wireframe to interactive prototype. Every component is built for reuse, every interaction mapped to a user goal.",
  },
  {
    step: "03",
    title: "Develop",
    body: "Clean architecture, rigorous code review, and iterative builds. We ship early, ship often, and never compromise on quality.",
  },
  {
    step: "04",
    title: "Deploy",
    body: "Launch with confidence — robust CI/CD, monitoring, and performance optimization. Then we stay on to support, iterate, and grow.",
  },
] as const

// TEAM data is imported from @/data/team

const CAPABILITIES = [
  { label: "React / Next.js", category: "Web" },
  { label: "React Native", category: "Mobile" },
  { label: "Swift / SwiftUI", category: "Mobile" },
  { label: "Kotlin / Jetpack", category: "Mobile" },
  { label: "Three.js / WebGL", category: "Web" },
  { label: "Node.js", category: "Backend" },
  { label: "TypeScript", category: "Language" },
  { label: "Tizen / webOS", category: "TV" },
  { label: "AWS IoT", category: "IoT" },
  { label: "MQTT / OPC-UA", category: "IoT" },
  { label: "PostgreSQL", category: "Backend" },
  { label: "Figma / Design Systems", category: "Design" },
] as const

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

/**
 * /about — Company story, team, philosophy, and process.
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
              {COMPANY.name} is a digital product studio specializing in
              Mobile, Web, TV, and IoT experiences. We combine rigorous
              engineering with intentional design to build software that
              performs — and endures.
            </p>
          </ScrollReveal>

          {/* Key stats inline */}
          <div className="col-full mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-canvas/6 sm:grid-cols-3 lg:col-span-8">
            {getAboutStats().map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.15 + i * 0.1}>
                <div className="flex flex-col items-center justify-center bg-obsidian-light px-6 py-8 text-center">
                  <span className="font-headline text-[clamp(2rem,4vw,2.75rem)] font-bold text-copper">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-canvas-dim">
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Philosophy */}
      <SectionWrapper id="philosophy" ariaLabel="Our Philosophy">
        <Container>
          <ScrollReveal className="col-full mb-12 lg:col-span-4">
            <h2>Our Philosophy</h2>
          </ScrollReveal>
          <div className="col-full grid gap-8 md:grid-cols-3 lg:col-span-8">
            {PHILOSOPHY.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 + i * 0.1}>
                <div className="h-full rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light p-6">
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

      {/* Team */}
      <SectionWrapper id="team" ariaLabel="Our Team" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full mb-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              The Team
            </p>
          </ScrollReveal>
          <ScrollReveal className="col-full mb-12 lg:col-span-8" delay={0.1}>
            <h2 className="max-w-2xl">
              Small team. Big reach.
            </h2>
            <p className="mt-4 max-w-xl text-canvas-dim">
              We&apos;re a tight-knit crew of engineers, designers, and
              strategists who believe the best work comes from deep
              collaboration and shared ownership.
            </p>
          </ScrollReveal>

          <div className="col-full grid gap-6 md:grid-cols-3">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} delay={0.15 + i * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light transition-colors duration-300 hover:border-copper/20">
                  {/* Portrait or fallback avatar */}
                  {member.portrait ? (
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={withBasePath(member.portrait)}
                        alt={`${member.name} portrait`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-copper/20 via-safety-orange/10 to-obsidian-light">
                      <span className="font-headline text-[clamp(3rem,6vw,5rem)] font-bold text-copper/40">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  )}

                  {/* Text content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-semibold">{member.name}</h3>
                    <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-copper">
                      {member.role}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-canvas-dim">
                      {member.bio}
                    </p>
                    {/* Social links */}
                    {member.socials && member.socials.length > 0 && (
                      <div className="mt-4 flex gap-3 border-t border-canvas/6 pt-4">
                        {member.socials.map((social) => (
                          <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-canvas-dim transition-colors duration-200 hover:text-copper"
                            aria-label={`${member.name} on ${social.label}`}
                          >
                            {social.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Experience */}
      <SectionWrapper id="experience" ariaLabel="Experience">
        <Container>
          <ScrollReveal className="col-full mb-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Experience
            </p>
          </ScrollReveal>
          <ScrollReveal className="col-full mb-12 lg:col-span-8" delay={0.1}>
            <h2 className="max-w-2xl">From deep learning research to AI-native engineering.</h2>
            <p className="mt-4 max-w-xl text-canvas-dim">
              The companies I&apos;ve shipped for — from ML research labs and
              industrial IoT to streaming apps on five platforms, and now an
              agent-driven rewrite of a fintech app and portal.
            </p>
          </ScrollReveal>
          <div className="col-full lg:col-span-10">
            <ExperienceTimeline />
          </div>
        </Container>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper id="process" ariaLabel="Our Process">
        <Container>
          <ScrollReveal className="col-full mb-12">
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Our Process
            </p>
            <h2>How We Work</h2>
          </ScrollReveal>
          <div className="col-full grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, i) => (
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

      {/* Capabilities / Toolkit */}
      <SectionWrapper id="capabilities" ariaLabel="Our Toolkit" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full mb-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Toolkit
            </p>
          </ScrollReveal>
          <ScrollReveal className="col-full mb-12 lg:col-span-8" delay={0.1}>
            <h2 className="max-w-2xl">Technologies we work with</h2>
          </ScrollReveal>
          <ParallaxLayer speed={0.08} className="col-full">
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                {CAPABILITIES.map((cap) => (
                  <span
                    key={cap.label}
                    className="rounded-full border border-canvas/10 bg-obsidian-light px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-canvas-dim transition-colors duration-300 hover:border-copper/30 hover:text-canvas"
                  >
                    {cap.label}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </ParallaxLayer>
        </Container>
      </SectionWrapper>

      {/* CTA band */}
      <SectionWrapper id="about-cta" className="pb-24 md:pb-32">
        <Container>
          <ScrollReveal className="col-full" direction="none">
            <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-canvas/6 bg-obsidian-light px-8 py-16 text-center md:px-16 md:py-20">
              <h2 className="max-w-xl">Want to work with us?</h2>
              <p className="mt-4 max-w-md text-canvas-dim">
                We&apos;re always looking for ambitious projects and
                like-minded collaborators. Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-copper px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-obsidian transition-all duration-300 hover:bg-copper-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                data-cursor="hover"
              >
                Get In Touch
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  )
}
