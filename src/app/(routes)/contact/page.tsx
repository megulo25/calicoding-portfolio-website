import type { Metadata } from "next"
import { COMPANY, SOCIAL_LINKS } from "@/data/company"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${COMPANY.name} about roles, contract work, or a codebase review.`,
}

const REASONS = [
  { title: "Roles", body: "Senior software engineering — mobile, web and TV — especially on teams going AI-native." },
  { title: "Contract work", body: "New apps, Flutter or native → Expo migrations, TV apps, and performance rescues." },
  { title: "A second opinion", body: "Architecture, release pipeline or crash-rate review for an existing mobile or web app." },
] as const

/** /contact — direct ways to reach me. No form: email goes straight to my inbox. */
export default function ContactPage() {
  return (
    <section className="shell pt-12 md:pt-20">
      <p className="enter eyebrow">Contact</p>
      <h1 className="enter mt-4 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]" style={{ ["--delay" as string]: "60ms" }}>
        Let&apos;s build something people <span className="serif-accent">rely&nbsp;on</span>.
      </h1>
      <p className="enter mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl" style={{ ["--delay" as string]: "120ms" }}>
        The fastest way to reach me is email. I usually reply within a day or two. I&apos;m based in {COMPANY.location}{" "}
        and work remotely.
      </p>

      <div className="enter mt-10 flex flex-wrap gap-3" style={{ ["--delay" as string]: "180ms" }}>
        <a href={`mailto:${COMPANY.email}`} className="btn btn-primary">
          {COMPANY.email}
        </a>
        {SOCIAL_LINKS.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            {l.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-3">
        {REASONS.map((r) => (
          <div key={r.title} className="bg-bg p-6 md:p-8">
            <h2 className="text-xl">{r.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
