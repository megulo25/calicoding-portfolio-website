import Link from "next/link"
import { EXPERIENCE } from "@/data/experience"
import { ProjectStage } from "@/components/ui/project-stage"
import { StoreBadges } from "@/components/ui/store-badges"
import { withBasePath } from "@/lib/utils"
import type { Project } from "@/types"

/**
 * FeatureRow — a large, two-column showcase for a company project:
 * media stage on one side; company, role, hook, metrics and store badges on
 * the other. Alternates sides down the page.
 */
export function FeatureRow({ project, flip = false, eager = false }: { project: Project; flip?: boolean; eager?: boolean }) {
  const logo = EXPERIENCE.find((e) => e.projectSlugs?.includes(project.slug))?.logo
  const metrics = (project.metrics ?? []).slice(0, 3)

  return (
    <article className="reveal group grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
      <Link
        href={`/work/${project.slug}`}
        className={`block overflow-hidden rounded-[var(--radius-xl)] lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        aria-label={`${project.title} case study`}
        tabIndex={-1}
      >
        <ProjectStage project={project} size="feature" eager={eager} />
      </Link>

      <div className={`flex flex-col justify-center lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3">
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={withBasePath(logo)} alt="" width={40} height={40} className="h-10 w-10 rounded-[10px] border border-line" />
          )}
          <div className="text-sm leading-tight">
            <p className="font-medium">{project.client}</p>
            <p className="text-ink-faint">
              {project.role} · {project.period}
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)]">
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-ink-muted">{project.description}</p>

        {metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-5">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-none tracking-tight">{m.value}</dd>
                <dd className="mt-2 text-xs leading-snug text-ink-faint">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
          <StoreBadges links={project.links} />
          <Link href={`/work/${project.slug}`} className="link-arrow">
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
