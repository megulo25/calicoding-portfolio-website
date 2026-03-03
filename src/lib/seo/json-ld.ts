/**
 * JSON-LD structured data generators for SEO.
 */

import { COMPANY, SOCIAL_LINKS } from "@/data/company"

/**
 * Organization schema — appears on all pages via root layout.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    name: COMPANY.name,
    url: COMPANY.url,
    logo: `${COMPANY.url}/images/logo.png`,
    description: COMPANY.description,
    sameAs: SOCIAL_LINKS.map((link) => link.url),
    contactPoint: {
      "@type": "ContactPoint" as const,
      email: COMPANY.email,
      contactType: "customer service",
    },
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
