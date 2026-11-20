import Link from "next/link"
import { ProjectStage } from "@/components/ui/project-stage"
import type { Project } from "@/types"

/** Short labels for the platform chips. */
export const PLATFORM_LABEL: Record<Project["platforms"][number], string> = {
  Mobile: "Mobile",
  Web: "Web",
  TV: "TV",
  IoT: "Hardware / IoT",
}

/**
 * ProjectTile — the one tile used for every project in a grid: stage with the
 * project's media, then a caption with title, hook and labels.
 */
export function ProjectTile({ project, eager = false }: { project: Project; eager?: boolean }) {
  const company = project.origin === "Professional"

  return (
    <article className="reveal group">
      <Link href={`/work/${project.slug}`} className="block">
        <ProjectStage project={project} eager={eager} className="rounded-[var(--radius-lg)]" />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-1 text-[0.9375rem] leading-snug text-ink-muted">{project.tagline}</p>
          </div>
          <span aria-hidden="true" className="mt-1 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
            →
          </span>
        </div>
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
          <span className={company ? "text-ink-muted" : ""}>{company ? project.client : "Independent"}</span>
          <span aria-hidden="true">·</span>
          <span>{project.platforms.map((p) => PLATFORM_LABEL[p]).join(" · ")}</span>
          <span aria-hidden="true">·</span>
          <span>{project.period ?? project.year}</span>
        </p>
      </Link>
    </article>
  )
}
