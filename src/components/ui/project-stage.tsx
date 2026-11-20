import type { CSSProperties } from "react"
import { BrowserFrame, PhoneFrame, RenderFrame, TabletFrame, TvFrame } from "@/components/ui/device-frame"
import type { Project } from "@/types"

// =============================================================================
// ProjectStage — a project's media on a tinted "stage". Every project, whatever
// its device shape, uses the same stage so tiles line up into one system.
// Devices are always straight-on (no tilting) per Apple's marketing rules.
// =============================================================================

type StageSize = "tile" | "feature" | "hero"

interface ProjectStageProps {
  project: Project
  size?: StageSize
  /** Load the main media eagerly (above the fold) */
  eager?: boolean
  /** Reels in links can't have a control button; they preview for ≤ 5 s */
  interactive?: boolean
  className?: string
}

const ASPECT: Record<StageSize, string> = {
  tile: "aspect-[4/3]",
  feature: "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]",
  hero: "aspect-[4/3] sm:aspect-[16/9]",
}

/** Gallery screens other than the thumbnail, for the side phones. */
function sideScreens(project: Project, count: number) {
  return (project.gallery ?? []).filter((src) => src !== project.thumbnail && !src.endsWith(".png")).slice(0, count)
}

export function ProjectStage({ project, size = "tile", eager = false, interactive = false, className = "" }: ProjectStageProps) {
  const style = { "--tint": project.accent } as CSSProperties
  const reel = project.reel
  const media = {
    src: project.thumbnail,
    alt: project.title,
    eager,
    reel,
    hideReelControl: !interactive,
  }
  const wide = size !== "tile"

  let content
  switch (project.showcase) {
    case "browser":
      content = (
        <div className="absolute inset-x-[7%] top-[12%] sm:inset-x-[9%]">
          <BrowserFrame {...media} url={project.links.liveUrl} sizes={wide ? "(max-width: 1024px) 90vw, 900px" : "(max-width: 640px) 85vw, 420px"} />
        </div>
      )
      break
    case "tv":
      content = (
        <div className="absolute inset-x-[7%] top-1/2 -translate-y-1/2 sm:inset-x-[9%]">
          <TvFrame {...media} sizes={wide ? "(max-width: 1024px) 90vw, 900px" : "(max-width: 640px) 85vw, 420px"} />
        </div>
      )
      break
    case "tablet":
      content = (
        <div className={`absolute top-[12%] ${size === "hero" ? "inset-x-[14%] sm:inset-x-[22%] sm:top-[8%]" : "inset-x-[8%] sm:inset-x-[11%]"}`}>
          <TabletFrame {...media} sizes={wide ? "(max-width: 1024px) 90vw, 800px" : "(max-width: 640px) 85vw, 400px"} />
        </div>
      )
      break
    case "render":
      content = (
        <div className="absolute inset-[7%] flex items-center justify-center">
          <RenderFrame {...media} className="w-full" sizes={wide ? "(max-width: 1024px) 90vw, 900px" : "(max-width: 640px) 85vw, 420px"} />
        </div>
      )
      break
    default: {
      // Phones: one centered screen, flanked by two more on wide stages.
      const sides = wide ? sideScreens(project, 2) : []
      const main = size === "tile" ? "w-[38%]" : "w-[36%] sm:w-[28%] lg:w-[30%]"
      const side = "hidden w-[24%] sm:block lg:w-[25%]"
      content = (
        <div className={`absolute inset-x-0 flex justify-center gap-[4%] ${size === "tile" ? "top-[10%]" : "top-[9%] lg:top-[12%]"}`}>
          {sides[0] && <PhoneFrame src={sides[0]} alt="" sizes="240px" className={`${side} mt-[6%] opacity-95`} />}
          <PhoneFrame {...media} sizes={wide ? "(max-width: 640px) 40vw, 320px" : "(max-width: 640px) 40vw, 220px"} className={`${main} z-10`} />
          {sides[1] && <PhoneFrame src={sides[1]} alt="" sizes="240px" className={`${side} mt-[6%] opacity-95`} />}
        </div>
      )
    }
  }

  return (
    <div className={`stage ${ASPECT[size]} ${className}`} style={style}>
      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.015]">
        {content}
      </div>
    </div>
  )
}
