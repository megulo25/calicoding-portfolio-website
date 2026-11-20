"use client"

import { useState } from "react"
import { PROJECTS } from "@/data/projects"
import { CategoryFilter, OriginFilter, type FilterValue, type OriginFilterValue } from "@/components/ui/category-filter"
import { ProjectTile } from "@/components/ui/project-tile"

/**
 * WorkGallery — every project in the shared tile system, filterable by origin
 * (company / independent) and platform.
 */
export function WorkGallery() {
  const [platform, setPlatform] = useState<FilterValue>("All")
  const [origin, setOrigin] = useState<OriginFilterValue>("All Work")

  const filtered = PROJECTS.filter(
    (p) => (platform === "All" || p.platforms.includes(platform)) && (origin === "All Work" || p.origin === origin),
  )

  return (
    <>
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <OriginFilter active={origin} onSelect={setOrigin} />
        <CategoryFilter active={platform} onSelect={setPlatform} />
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectTile key={project.slug} project={project} eager={i < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-muted">Nothing here yet for that combination.</p>
      )}
    </>
  )
}
