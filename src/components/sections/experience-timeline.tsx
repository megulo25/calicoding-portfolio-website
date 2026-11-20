import Link from "next/link"
import { EXPERIENCE } from "@/data/experience"
import { PROJECTS } from "@/data/projects"
import { withBasePath } from "@/lib/utils"
import type { Experience } from "@/types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function period(exp: Experience) {
  return exp.start === exp.end ? exp.start : `${exp.start} — ${exp.end}`
}

function CompanyMark({ exp }: { exp: Experience }) {
  if (exp.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBasePath(exp.logo)}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-11 w-11 shrink-0 rounded-[0.65rem] border border-ink/10 object-cover"
      />
    )
  }
  const initials = exp.company
    .split(/[\s,]+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.65rem] border border-ink/10 bg-gradient-to-br from-accent/20 via-accent/10 to-surface font-headline text-sm font-bold text-accent"
    >
      {initials}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ExperienceTimeline — vertical career timeline, most recent role first.
 * Roles with public work link to their case studies.
 */
export function ExperienceTimeline() {
  return (
    <ol className="relative flex flex-col gap-6 border-l border-ink/10 pl-6 md:gap-8 md:pl-10">
      {EXPERIENCE.map((exp) => {
        const caseStudies = (exp.projectSlugs ?? [])
          .map((slug) => PROJECTS.find((p) => p.slug === slug))
          .filter((p): p is (typeof PROJECTS)[number] => Boolean(p))

        return (
          <li key={exp.id} className="relative">
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className={`absolute -left-[calc(1.5rem+5px)] top-7 h-2.5 w-2.5 rounded-full md:-left-[calc(2.5rem+5px)] ${exp.current
                ? "bg-accent shadow-[0_0_0_4px_rgba(184,115,51,0.2)]"
                : "border border-ink/30 bg-bg"
                }`}
            />

              <article
                className={`rounded-[var(--radius-md)] border bg-surface p-6 md:p-8 ${exp.current ? "border-accent/30" : "border-ink/6"
                  }`}
              >
                <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <CompanyMark exp={exp} />
                    <div>
                      <h3 className="text-lg font-semibold leading-tight">{exp.company}</h3>
                      <p className="mt-1 text-sm text-ink">
                        {exp.title}
                        {exp.titleNote && (
                          <span className="text-ink-muted"> · {exp.titleNote}</span>
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-ink-muted/70">
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                    {exp.current && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent-ink">
                        Now
                      </span>
                    )}
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-accent">
                      {period(exp)}
                    </span>
                  </div>
                </header>

                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted">{exp.summary}</p>

                {exp.highlights.length > 0 && (
                  <ul className="mt-4 flex max-w-3xl flex-col gap-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[var(--radius-sm)] bg-surface-2 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-muted/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {caseStudies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-ink/6 pt-4">
                    {caseStudies.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/work/${p.slug}`}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-accent transition-colors duration-200 hover:text-accent"
                       
                      >
                        {p.title} case study →
                      </Link>
                    ))}
                  </div>
                )}
              </article>
          </li>
        )
      })}
    </ol>
  )
}
