import { PROJECTS } from "@/data/projects"
import { COMPANY } from "@/data/company"

// =============================================================================
// Project Stats — Derived metrics from project data + company config
//
// Stats that can be computed (project count, platform count) are derived
// dynamically. Non-computable metrics (years of craft, client retention) are
// pulled from the centralized company config.
// =============================================================================

export interface Stat {
  value: string
  label: string
}

/**
 * Returns the full set of proof-point stats for the home page.
 */
export function getProjectStats(): Stat[] {
  const projectCount = PROJECTS.length
  const platformCount = new Set(PROJECTS.flatMap((p) => p.platforms)).size
  const currentYear = new Date().getFullYear()
  const yearsOfCraft = currentYear - COMPANY.foundedYear

  return [
    { value: `${projectCount}+`, label: "Projects Shipped" },
    { value: `${platformCount}`, label: "Platforms Covered" },
    { value: `${yearsOfCraft}`, label: "Years of Craft" },
    { value: COMPANY.clientRetention, label: "Client Retention" },
  ]
}

/**
 * Returns a subset of stats suitable for the About page hero.
 */
export function getAboutStats(): Stat[] {
  const projectCount = PROJECTS.length
  const platformCount = new Set(PROJECTS.flatMap((p) => p.platforms)).size
  const currentYear = new Date().getFullYear()
  const yearsOfCraft = currentYear - COMPANY.foundedYear

  return [
    { value: `${yearsOfCraft}+`, label: "Years of Experience" },
    { value: `${projectCount}+`, label: "Projects Delivered" },
    { value: `${platformCount}`, label: "Platform Specialties" },
  ]
}
