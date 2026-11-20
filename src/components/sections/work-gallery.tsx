"use client"

import { useState } from "react"
import { AnimatePresence, LayoutGroup } from "framer-motion"
import { PROJECTS } from "@/data/projects"
import {
  CategoryFilter,
  OriginFilter,
  type FilterValue,
  type OriginFilterValue,
} from "@/components/ui/category-filter"
import { ProjectCard } from "@/components/ui/project-card"

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * WorkGallery — client-side filterable project grid.
 *
 * Renders origin + platform filter bars and an animated grid of ProjectCards.
 * Uses Framer Motion `layout` + `AnimatePresence` for smooth filter
 * transitions.
 */
export function WorkGallery() {
  const [active, setActive] = useState<FilterValue>("All")
  const [origin, setOrigin] = useState<OriginFilterValue>("All Work")

  const filtered = PROJECTS.filter(
    (p) =>
      (active === "All" || p.platforms.includes(active)) &&
      (origin === "All Work" || p.origin === origin),
  )

  return (
    <LayoutGroup>
      {/* Filter bar */}
      <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <OriginFilter active={origin} onSelect={setOrigin} />
        <CategoryFilter active={active} onSelect={setActive} />
      </div>

      {/* Project grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="mt-12 text-center font-mono text-[0.75rem] uppercase tracking-[0.2em] text-canvas-dim/40">
          No projects in this category yet.
        </p>
      )}
    </LayoutGroup>
  )
}
