import type { Metadata } from "next"
import { PROJECTS } from "@/data/projects"
import { WorkGallery } from "@/components/sections/work-gallery"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Apps shipped for NBC Sports Next, Credit Acceptance and Solar Turbines, plus independent iOS, Android, TV, web and hardware projects.",
}

const COMPANY_COUNT = PROJECTS.filter((p) => p.origin === "Professional").length

/** /work — every project, filterable. */
export default function WorkPage() {
  return (
    <div className="shell pb-8 pt-12 md:pt-20">
      <header className="mb-12 max-w-3xl md:mb-16">
        <p className="eyebrow">Work</p>
        <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
          {PROJECTS.length} projects, <span className="serif-accent">every</span> screen.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted md:text-xl">
          {COMPANY_COUNT} apps shipped for companies, the rest built end to end on my own — across iOS, Android, Apple
          TV, the web and hardware.
        </p>
      </header>
      <WorkGallery />
    </div>
  )
}
