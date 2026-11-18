import type { Metadata } from "next"
import { COMPANY, SOCIAL_LINKS } from "@/data/company"
import { ContactForm } from "@/components/sections/contact-form"
import { Container } from "@/components/ui/container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { nextAvailableQuarter } from "@/lib/utils/availability"

export const metadata: Metadata = {
  title: `Contact — ${COMPANY.name}`,
  description:
    `Get in touch with ${COMPANY.name} — let's discuss your next Mobile, Web, TV, or IoT project.`,
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CONTACT_INFO = [
  {
    heading: "Email",
    content: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    heading: "Based In",
    content: COMPANY.location,
  },
  {
    heading: "Availability",
    content: `Currently accepting new projects for ${nextAvailableQuarter()}.`,
  },
] as const

const FAQ = [
  {
    q: "What's your typical project timeline?",
    a: "Most projects run 8–16 weeks from kickoff to launch, depending on scope and platform complexity.",
  },
  {
    q: "Do you work with startups?",
    a: "Absolutely. We've partnered with early-stage startups and established enterprises alike. The common thread is ambition.",
  },
  {
    q: "What's your pricing model?",
    a: "We offer fixed-price project scoping and monthly retainers. We'll recommend the best fit during our initial discussion.",
  },
] as const

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

/**
 * /contact — Contact form with validation, info sidebar, and FAQ.
 */
export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper id="contact-hero" className="py-24 md:py-32">
        <Container>
          <ScrollReveal className="col-full lg:col-span-7">
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Contact
            </p>
            <h1 className="max-w-2xl font-bold">
              Let&apos;s build something extraordinary.
            </h1>
            <p className="mt-6 max-w-xl text-canvas-dim">
              Whether you have a detailed spec or just a spark of an idea,
              we&apos;d love to hear from you. Drop us a line and
              we&apos;ll get back within 24 hours.
            </p>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Contact form + info layout */}
      <SectionWrapper id="contact-form" className="pb-24 md:pb-32">
        <Container>
          {/* Form column */}
          <ScrollReveal className="col-full lg:col-span-7" delay={0.1}>
            <ContactForm />
          </ScrollReveal>

          {/* Info column */}
          <ScrollReveal
            className="col-full mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0"
            delay={0.2}
            direction="right"
          >
            <div className="flex flex-col gap-8">
              {CONTACT_INFO.map((item) => (
                <div key={item.heading}>
                  <h3 className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim">
                    {item.heading}
                  </h3>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      className="text-canvas transition-colors duration-300 hover:text-copper"
                      data-cursor="hover"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-canvas">{item.content}</p>
                  )}
                </div>
              ))}

              {/* Social links */}
              <div>
                <h3 className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim">
                  Connect
                </h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-canvas-dim transition-colors duration-300 hover:text-copper"
                      data-cursor="hover"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper id="faq" ariaLabel="Frequently Asked Questions" className="pb-24 md:pb-32">
        <Container>
          <ScrollReveal className="col-full mb-12 lg:col-span-4">
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              FAQ
            </p>
            <h2>Common Questions</h2>
          </ScrollReveal>
          <div className="col-full flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
            {FAQ.map((item, i) => (
              <ScrollReveal key={item.q} delay={0.1 + i * 0.08}>
                <div className="rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light p-6">
                  <h3 className="text-base font-semibold">{item.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-canvas-dim">
                    {item.a}
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
