/**
 * JSON-LD structured data generators for SEO.
 */

const BASE_URL = "https://foundrytech.dev"

/**
 * Organization schema — appears on all pages via root layout.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    name: "Foundry Tech",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      "Foundry Tech is a digital product studio specializing in Mobile, Web, TV, and IoT experiences.",
    sameAs: [
      "https://github.com/foundrytech",
      "https://linkedin.com/company/foundrytech",
      "https://x.com/foundrytech",
    ],
    contactPoint: {
      "@type": "ContactPoint" as const,
      email: "hello@foundrytech.dev",
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
    name: "Foundry Tech",
    url: BASE_URL,
  }
}
