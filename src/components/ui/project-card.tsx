"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Project } from "@/types"

// ---------------------------------------------------------------------------
// Gradient map — deterministic per-category colour for placeholder thumbnails
// ---------------------------------------------------------------------------

const CATEGORY_GRADIENTS: Record<Project["category"], string> = {
  Mobile: "from-copper/20 via-safety-orange/10 to-obsidian-light",
  Web: "from-copper/15 via-copper-dark/10 to-obsidian-light",
  TV: "from-safety-orange/15 via-copper/10 to-obsidian-light",
  IoT: "from-copper-dark/20 via-safety-orange/8 to-obsidian-light",
}

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3 },
  },
} as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ProjectCardProps {
  project: Project
}

/**
 * ProjectCard — displays a single portfolio project with gradient thumbnail
 * placeholder, category badge, title, description, and tech stack.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light transition-colors duration-300 hover:border-copper/20 ${project.featured ? "sm:col-span-2 sm:row-span-2" : ""
        }`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex flex-1 flex-col"
        data-cursor="hover"
      >
        {/* Thumbnail placeholder */}
        <div
          className={`relative aspect-[4/3] w-full bg-gradient-to-br ${CATEGORY_GRADIENTS[project.category]}`}
        >
          {/* Category badge */}
          <span className="absolute left-4 top-4 rounded-full border border-copper/30 bg-obsidian/80 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-copper backdrop-blur-sm">
            {project.category}
          </span>

          {/* Year badge */}
          <span className="absolute right-4 top-4 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-canvas-dim/50">
            {project.year}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-all duration-300 group-hover:bg-obsidian/50">
            <span className="translate-y-2 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-canvas opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              View Project →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-copper">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-canvas-dim">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-[var(--radius-sm)] bg-obsidian-lighter px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-canvas-dim/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
