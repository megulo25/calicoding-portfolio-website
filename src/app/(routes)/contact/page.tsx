import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: "Contact — Foundry Tech",
  description:
    "Get in touch with Foundry Tech — let's discuss your next Mobile, Web, TV, or IoT project.",
}

/**
 * /contact — Contact form and information.
 *
 * Phase 14 will add a functional form + validation.
 */
export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper id="contact-hero" className="py-24 md:py-32">
        <Container>
          <div className="col-full lg:col-span-7">
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
          </div>
        </Container>
      </SectionWrapper>

      {/* Contact form + info layout */}
      <SectionWrapper id="contact-form" className="pb-24 md:pb-32">
        <Container>
          {/* Form column */}
          <div className="col-full lg:col-span-7">
            <form className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 placeholder:text-canvas-dim/30 focus:border-copper"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 placeholder:text-canvas-dim/30 focus:border-copper"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your project…"
                  className="w-full resize-none border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 placeholder:text-canvas-dim/30 focus:border-copper"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] border border-copper bg-transparent px-8 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-copper transition-all duration-300 hover:bg-copper hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              >
                Send Message
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>

          {/* Info column */}
          <div className="col-full mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim">
                  Email
                </h3>
                <a
                  href="mailto:hello@foundrytech.dev"
                  className="text-canvas transition-colors duration-300 hover:text-copper"
                >
                  hello@foundrytech.dev
                </a>
              </div>
              <div>
                <h3 className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim">
                  Based In
                </h3>
                <p className="text-canvas">San Francisco, CA</p>
              </div>
              <div>
                <h3 className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim">
                  Availability
                </h3>
                <p className="text-canvas">
                  Currently accepting new projects for Q3 2026.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
