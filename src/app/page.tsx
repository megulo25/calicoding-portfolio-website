import Link from "next/link"
import { COMPANY, SOCIAL_LINKS } from "@/data/company"
import { EXPERIENCE } from "@/data/experience"
import { HOME_FEATURED_SLUGS, PROJECTS } from "@/data/projects"
import { FeatureRow } from "@/components/sections/feature-row"
import { PhoneFrame } from "@/components/ui/device-frame"
import { ProjectStage } from "@/components/ui/project-stage"
import { ProjectTile } from "@/components/ui/project-tile"
import type { Project } from "@/types"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)
const isProject = (p: Project | undefined): p is Project => Boolean(p)

const COMPANY_WORK = HOME_FEATURED_SLUGS.map(bySlug).filter(isProject)
const INDEPENDENT = PROJECTS.filter((p) => p.origin === "Personal")
const [LEAD_INDEPENDENT, ...REST_INDEPENDENT] = [
  ...INDEPENDENT.filter((p) => p.featured),
  ...INDEPENDENT.filter((p) => !p.featured),
]

const CURRENT = EXPERIENCE.find((e) => e.current)
const LINKEDIN = SOCIAL_LINKS.find((l) => l.platform === "LinkedIn")

/** Headline proof — every number is sourced from a case study or the stores. */
const PROOF = [
  { value: "8 yrs", label: "shipping production apps" },
  { value: "100K+", label: "monthly users on GolfPass" },
  { value: "4.8★", label: "GolfPass on the App Store" },
  { value: "5", label: "platforms: iOS, Android, TV, web, IoT" },
] as const

const PRINCIPLES = [
  {
    title: "AI-native by default",
    body: "I run agentic workflows — parallel AI coding agents working from specs I write — with human-in-the-loop review, tests and quality gates on everything they produce. More throughput, same bar.",
  },
  {
    title: "Measured, not guessed",
    body: "Cold-start time, crash-free rate, frame drops, release cadence. I pick the number that matters, move it, and automate the guardrails (Maestro E2E, Fastlane, CI) so it stays moved.",
  },
  {
    title: "One codebase, every screen",
    body: "React Native and Expo across iOS, Android, TV and the web — and native Swift when the platform calls for it. Shared logic, platform-true details.",
  },
] as const

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      {/* Hero ------------------------------------------------------------- */}
      <section className="shell grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-7">
          {CURRENT && (
            <p className="enter inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-muted">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
              </span>
              Now: AI-native Flutter → Expo rewrite at {CURRENT.company}
            </p>
          )}

          <h1 className="enter mt-6 text-[clamp(2.5rem,6vw,4.75rem)]" style={{ ["--delay" as string]: "80ms" }}>
            I build mobile apps people <span className="serif-accent">rely&nbsp;on</span> — for iOS, Android, TV
            and&nbsp;the&nbsp;web.
          </h1>

          <p className="enter mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl" style={{ ["--delay" as string]: "160ms" }}>
            I&apos;m {COMPANY.name}, a software engineer in {COMPANY.location}. I&apos;ve shipped apps for{" "}
            <strong className="font-medium text-ink">NBC Sports Next</strong>,{" "}
            <strong className="font-medium text-ink">Credit Acceptance</strong> and{" "}
            <strong className="font-medium text-ink">Solar Turbines</strong>, plus my own products on the App Store —
            and today I lead AI-native, agent-driven development.
          </p>

          <div className="enter mt-8 flex flex-wrap gap-3" style={{ ["--delay" as string]: "240ms" }}>
            <a href="#work" className="btn btn-primary">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="btn btn-ghost">
              Get in touch
            </a>
            {LINKEDIN && (
              <a href={LINKEDIN.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Real app screens, straight-on — the work is the hero image. */}
        <div className="enter relative lg:col-span-5" style={{ ["--delay" as string]: "200ms" }} aria-hidden="true">
          <div className="stage mx-auto aspect-[5/4] max-w-xl rounded-[var(--radius-xl)] lg:aspect-[4/5]" style={{ ["--tint" as string]: "#5b6cff" }}>
            <div className="absolute inset-x-0 top-[9%] flex justify-center gap-[4%]">
              <PhoneFrame src="/images/golfpass/home.jpg" alt="" eager sizes="200px" className="mt-[10%] w-[27%]" />
              <PhoneFrame src="/images/credit_acceptance/screen-1.jpg" alt="" eager sizes="240px" className="z-10 w-[33%]" />
              <PhoneFrame src="/images/solar_insight/phone.jpg" alt="" eager sizes="200px" fit="contain" className="mt-[10%] w-[27%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip ------------------------------------------------------- */}
      <section aria-label="At a glance" className="shell">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-4">
          {PROOF.map((item) => (
            <div key={item.label} className="bg-bg px-5 py-6">
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight">{item.value}</dd>
              <dd className="mt-1 text-sm text-ink-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Company work ------------------------------------------------------ */}
      <section id="work" aria-labelledby="company-work" className="shell scroll-mt-20 pt-24 md:pt-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
          <div>
            <p className="eyebrow">Company work</p>
            <h2 id="company-work" className="mt-3 text-[clamp(2rem,4vw,3rem)]">
              Shipped at scale, in the stores.
            </h2>
          </div>
          <Link href="/work" className="link-arrow">
            All {PROJECTS.length} projects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="flex flex-col gap-20 md:gap-28">
          {COMPANY_WORK.map((project, i) => (
            <FeatureRow key={project.slug} project={project} flip={i % 2 === 1} eager={i === 0} />
          ))}
        </div>
      </section>

      {/* Independent work -------------------------------------------------- */}
      <section aria-labelledby="independent-work" className="shell pt-28 md:pt-36">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Independent work</p>
          <h2 id="independent-work" className="mt-3 text-[clamp(2rem,4vw,3rem)]">
            Built end to end, on my own.
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Apps live in the stores for real communities and businesses, native Apple TV and Watch apps, and hardware
            I designed, printed and programmed.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {LEAD_INDEPENDENT && (
            <div className="md:col-span-2">
              <ProjectTileWide project={LEAD_INDEPENDENT} />
            </div>
          )}
          {REST_INDEPENDENT.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* How I work -------------------------------------------------------- */}
      <section aria-labelledby="how-i-work" className="shell pt-28 md:pt-36">
        <p className="eyebrow">How I work</p>
        <h2 id="how-i-work" className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)]">
          Senior judgment, <span className="serif-accent">AI-native</span> speed.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="reveal bg-bg p-6 md:p-8">
              <span className="font-mono text-sm text-ink-faint">0{i + 1}</span>
              <h3 className="mt-6 text-xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience (compact) --------------------------------------------- */}
      <section aria-labelledby="experience" className="shell pt-28 md:pt-36">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="experience" className="mt-3 text-[clamp(2rem,4vw,3rem)]">
              Where I&apos;ve worked.
            </h2>
          </div>
          <Link href="/about#experience" className="link-arrow">
            Full history <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {EXPERIENCE.filter((e) => e.company !== "Career Break")
            .slice(0, 5)
            .map((e) => (
              <li key={e.id} className="grid gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                <span className="font-mono text-sm text-ink-faint sm:col-span-3">
                  {e.start} — {e.end}
                </span>
                <span className="text-lg font-medium sm:col-span-4">{e.company}</span>
                <span className="text-ink-muted sm:col-span-5">
                  {e.title}
                  {e.titleNote && <span className="text-ink-faint"> · {e.titleNote}</span>}
                </span>
              </li>
            ))}
        </ol>
      </section>
    </>
  )
}

/** Full-width variant of the tile for the lead independent project. */
function ProjectTileWide({ project }: { project: Project }) {
  return (
    <article className="reveal group">
      <Link href={`/work/${project.slug}`} className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="overflow-hidden rounded-[var(--radius-xl)] lg:col-span-8">
          <ProjectStage project={project} size="hero" />
        </div>
        <div className="lg:col-span-4">
          <p className="font-mono text-xs text-ink-faint">Independent · {project.year}</p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.5vw,2rem)] transition-colors group-hover:text-accent">{project.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-ink-muted">{project.description}</p>
          <span className="link-arrow mt-6">
            Read the case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
