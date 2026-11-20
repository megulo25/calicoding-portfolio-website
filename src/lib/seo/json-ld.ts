/**
 * JSON-LD structured data generators for SEO.
 */

import { COMPANY, SOCIAL_LINKS } from "@/data/company"
import type { Project } from "@/types"

/**
 * Person schema — appears on all pages via root layout.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Person" as const,
    name: COMPANY.name,
    url: COMPANY.url,
    jobTitle: COMPANY.tagline,
    description: COMPANY.description,
    image: `${COMPANY.url.replace(/\/$/, "")}/images/team/megulo.jpg`,
    address: { "@type": "PostalAddress" as const, addressLocality: COMPANY.location },
    sameAs: SOCIAL_LINKS.map((link) => link.url),
  }
}

/**
 * WebSite schema — search action for site search.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    name: COMPANY.name,
    url: COMPANY.url,
  }
}

/**
 * CreativeWork schema for a portfolio case study.
 */
export function projectJsonLd(project: Project) {
  const base = COMPANY.url.replace(/\/$/, "")
  const sameAs = [
    project.links.liveUrl,
    project.links.iosAppStore,
    project.links.googlePlay,
    project.links.amazonAppStore,
    project.links.rokuChannelStore,
  ].filter((url): url is string => Boolean(url))

  return {
    "@context": "https://schema.org" as const,
    "@type": "CreativeWork" as const,
    name: project.title,
    description: project.description,
    url: `${base}/work/${project.slug}`,
    dateCreated: String(project.year),
    keywords: [...project.platforms, ...project.techStack].join(", "),
    creator: { "@type": "Organization" as const, name: COMPANY.name, url: COMPANY.url },
    ...(project.thumbnail && { image: `${base}${project.thumbnail}` }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}
