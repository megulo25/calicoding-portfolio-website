import type { Metadata } from "next"
import { COMPANY, SOCIAL_LINKS } from "@/data/company"
import { TEAM } from "@/data/team"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { responsiveImage } from "@/lib/utils/images"

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer with 8 years of shipping — from deep learning research to apps for NBC Sports Next, Credit Acceptance and Solar Turbines, and now AI-native, agent-driven development.",
}

const ME = TEAM[0]

const TOOLKIT = [
  {
    group: "Mobile & cross-platform",
    items: ["React Native", "Expo & EAS", "TypeScript", "React Query", "Zustand / Redux Toolkit", "Reanimated", "React Native Web"],
  },
  {
    group: "Native & big screen",
    items: ["Swift / SwiftUI", "tvOS", "watchOS", "Kotlin", "Fire TV & Roku"],
  },
  {
    group: "AI-native engineering",
    items: ["Agentic workflows", "Multi-agent orchestration", "Spec & context engineering", "Human-in-the-loop review", "Eval-driven guardrails"],
  },
  {
    group: "Quality & delivery",
    items: ["Maestro E2E", "Jest", "Fastlane", "GitHub Actions", "Sentry", "OTA updates"],
  },
  {
    group: "Backend & cloud",
    items: ["Node.js / Bun", "Python / Django", "GraphQL & REST", "AWS Amplify", "PostgreSQL", "Firebase"],
  },
  {
    group: "Hardware & IoT",
    items: ["Raspberry Pi", "Arduino", "Computer vision", "Fusion 360", "3D printing"],
  },
] as const

const EDUCATION = [
  { school: "University of California, San Diego", detail: "B.S. Structural Engineering", years: "2015 — 2018" },
  { school: "UC San Diego Extension", detail: "Data Science and Visualization", years: "" },
] as const

export default function AboutPage() {
  const portrait = ME?.portrait ? responsiveImage(ME.portrait, "(max-width: 1024px) 60vw, 380px") : null

  return (
    <>
      {/* Intro ------------------------------------------------------------ */}
      <section className="shell grid gap-12 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="enter eyebrow">About</p>
          <h1 className="enter mt-4 text-[clamp(2.5rem,6vw,4.5rem)]" style={{ ["--delay" as string]: "60ms" }}>
            Hi, I&apos;m Megulo. I make apps <span className="serif-accent">feel</span> effortless.
          </h1>
          <div className="enter mt-8 space-y-5 text-lg leading-relaxed text-ink-muted" style={{ ["--delay" as string]: "120ms" }}>
            <p>
              I&apos;m a software engineer in {COMPANY.location} with eight years of shipping software. I started
              out in deep learning research — crack detection for civil structures at the Qualcomm Institute and
              explainable vision models at the San Diego Supercomputer Center — then built the Python services behind
              them.
            </p>
            <p>
              Since 2020 I&apos;ve focused on mobile. I rebuilt <strong className="font-medium text-ink">Solar Turbines&apos;</strong>{" "}
              InSight Platform for 1,200 field technicians, then spent nearly three years as the primary mobile engineer for{" "}
              <strong className="font-medium text-ink">GolfPass</strong> at NBC Sports Next, across iOS, Android, Apple TV,
              Fire TV and Roku.
            </p>
            <p>
              Today I&apos;m at <strong className="font-medium text-ink">Credit Acceptance</strong>, hired as the team&apos;s
              React Native expert to lead an AI-native rewrite of its mobile app and customer portal from Flutter to Expo.
              I orchestrate a team of AI coding agents, and I own the architecture, the guardrails and the judgment calls.
            </p>
            <p>
              Outside work I ship my own apps — used by a community association and a neighborhood market — and build
              hardware with a 3D printer and a Raspberry Pi.
            </p>
          </div>
          <div className="enter mt-8 flex flex-wrap gap-3" style={{ ["--delay" as string]: "180ms" }}>
            <a href={`mailto:${COMPANY.email}`} className="btn btn-primary">
              Email me
            </a>
            {SOCIAL_LINKS.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        {portrait && (
          <div className="enter lg:col-span-5" style={{ ["--delay" as string]: "120ms" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...portrait}
              alt={`Portrait of ${COMPANY.name}`}
              loading="eager"
              className="aspect-[4/5] w-full max-w-md rounded-[var(--radius-xl)] object-cover lg:ml-auto"
            />
          </div>
        )}
      </section>

      {/* Experience ------------------------------------------------------- */}
      <section id="experience" aria-labelledby="experience-title" className="shell scroll-mt-20 pt-24 md:pt-32">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title" className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)]">
          From deep learning research to <span className="serif-accent">AI-native</span> engineering.
        </h2>
        <div className="mt-12 max-w-4xl">
          <ExperienceTimeline />
        </div>
      </section>

      {/* Toolkit ---------------------------------------------------------- */}
      <section aria-labelledby="toolkit-title" className="shell pt-24 md:pt-32">
        <p className="eyebrow">Toolkit</p>
        <h2 id="toolkit-title" className="mt-3 text-[clamp(2rem,4vw,3rem)]">
          What I work with.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {TOOLKIT.map((t) => (
            <div key={t.group} className="bg-bg p-6">
              <h3 className="text-base">{t.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education -------------------------------------------------------- */}
      <section aria-labelledby="education-title" className="shell pt-24 md:pt-32">
        <p className="eyebrow">Education</p>
        <h2 id="education-title" className="sr-only">
          Education
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {EDUCATION.map((e) => (
            <li key={e.school} className="grid gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <span className="font-mono text-sm text-ink-faint sm:col-span-3">{e.years}</span>
              <span className="text-lg font-medium sm:col-span-5">{e.school}</span>
              <span className="text-ink-muted sm:col-span-4">{e.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
