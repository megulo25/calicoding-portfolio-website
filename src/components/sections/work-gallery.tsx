"use client"

import { useState } from "react"
import { AnimatePresence, LayoutGroup } from "framer-motion"
import { PROJECTS } from "@/data/projects"
import {
  CategoryFilter,
  type FilterValue,
} from "@/components/ui/category-filter"
import { ProjectCard } from "@/components/ui/project-card"

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * WorkGallery — client-side filterable project grid.
 *
 * Renders a category filter bar and an animated grid of ProjectCards.
 * Uses Framer Motion `layout` + `AnimatePresence` for smooth filter
 * transitions.
 */
export function WorkGallery() {
  const [active, setActive] = useState<FilterValue>("All")

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active)

  return (
    <LayoutGroup>
      {/* Filter bar */}
      <div className="mb-10">
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
