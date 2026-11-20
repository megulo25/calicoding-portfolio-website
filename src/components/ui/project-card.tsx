"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Project } from "@/types"
import { PLATFORM_GRADIENTS } from "@/lib/constants"
import { BrowserFrame, PhoneFrame, RenderFrame, TabletFrame, TvFrame } from "@/components/ui/device-frame"

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

/** Tech chips shown on a card before collapsing into "+N more". */
const MAX_CARD_TECH = 4

// ---------------------------------------------------------------------------
// Showcase — framed screenshots instead of a cropped thumbnail
// ---------------------------------------------------------------------------

function CardShowcase({ project, large }: { project: Project; large: boolean }) {
  if (!project.thumbnail) return null
  const reelProps = { reel: project.reel, hideReelControl: true }

  if (project.showcase === "browser") {
    return (
      <div className={`absolute inset-x-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 ${large ? "inset-y-0 flex items-center sm:inset-x-10" : "top-14"}`}>
        <BrowserFrame src={project.thumbnail} alt={project.title} url={project.links.liveUrl} sizes="(max-width: 640px) 90vw, 560px" {...reelProps} />
      </div>
    )
  }

  if (project.showcase === "render") {
    return (
      <div className={`absolute inset-x-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 ${large ? "inset-y-0 flex items-center sm:inset-x-10" : "top-14"}`}>
        <RenderFrame src={project.thumbnail} alt={project.title} sizes={large ? "(max-width: 640px) 90vw, 900px" : "(max-width: 640px) 90vw, 440px"} {...reelProps} />
      </div>
    )
  }

  if (project.showcase === "tv") {
    return (
      <div className={`absolute inset-x-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 ${large ? "inset-y-0 flex items-center sm:inset-x-10" : "top-14"}`}>
        <TvFrame src={project.thumbnail} alt={project.title} sizes={large ? "(max-width: 640px) 90vw, 900px" : "(max-width: 640px) 90vw, 440px"} {...reelProps} />
      </div>
    )
  }

  if (project.showcase === "tablet") {
    return (
      <div className="absolute inset-x-6 top-14 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
        <TabletFrame src={project.thumbnail} alt={project.title} />
      </div>
    )
  }

  // Phone: featured cards fan out up to three screens; others show one.
  const extra = large
    ? (project.gallery ?? []).filter((src) => src !== project.thumbnail).slice(0, 2)
    : []

  return (
    <div
      className={`absolute inset-x-0 bottom-0 flex justify-center gap-4 ${large ? "top-0 items-center py-12" : "top-14 items-start"}`}
    >
      {extra[0] && (
        <PhoneFrame
          src={extra[0]}
          alt=""
          className="hidden w-[24%] translate-y-8 -rotate-6 opacity-80 transition-transform duration-500 group-hover:translate-y-5 sm:block"
        />
      )}
      <PhoneFrame
        src={project.thumbnail}
        alt={project.title}
        sizes="(max-width: 640px) 40vw, 240px"
        {...reelProps}
        className={`${large ? "w-[42%] sm:w-[30%]" : "w-[38%]"} z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3`}
      />
      {extra[1] && (
        <PhoneFrame
          src={extra[1]}
          alt=""
          className="hidden w-[24%] translate-y-8 rotate-6 opacity-80 transition-transform duration-500 group-hover:translate-y-5 sm:block"
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ProjectCardProps {
  project: Project
  /** Override the project's own `featured` flag for this placement */
  large?: boolean
}

/**
 * ProjectCard — displays a single portfolio project with gradient thumbnail
 * placeholder, category badge, title, description, and tech stack.
 */
export function ProjectCard({ project, large = project.featured }: ProjectCardProps) {
  const primaryPlatform = project.platforms[0] ?? "Web"

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light transition-colors duration-300 hover:border-copper/20 ${large ? "sm:col-span-2 sm:row-span-2" : ""
        }`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex flex-1 flex-col"
        data-cursor="hover"
      >
        {/* Thumbnail */}
        <div
          className={`relative w-full overflow-hidden bg-gradient-to-br ${large ? "min-h-[20rem] flex-1 sm:min-h-[28rem]" : "aspect-[4/3]"} ${PLATFORM_GRADIENTS[primaryPlatform]}`}
        >
          <CardShowcase project={project} large={large} />
          {/* Platform badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {project.platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-copper/30 bg-obsidian/80 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-copper backdrop-blur-sm"
              >
                {platform}
              </span>
            ))}
          </div>

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
        <div className={`flex flex-col p-5 ${large ? "" : "flex-1"}`}>
          {project.origin === "Professional" && project.client && (
            <p className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim/70">
              {project.client}
            </p>
          )}
          <h3 className="text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-copper">
            {project.title}
          </h3>
          {project.status && (
            <div className="mt-1.5 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-copper/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
              {project.status}
            </div>
          )}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-canvas-dim">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, MAX_CARD_TECH).map((tech) => (
              <span
                key={tech}
                className="rounded-[var(--radius-sm)] bg-obsidian-lighter px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-canvas-dim/60"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > MAX_CARD_TECH && (
              <span className="rounded-[var(--radius-sm)] px-1 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-canvas-dim/40">
                +{project.techStack.length - MAX_CARD_TECH} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
