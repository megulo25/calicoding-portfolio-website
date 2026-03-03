import type { Metadata } from "next"
import { Playfair_Display, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld"
import "./globals.css"
import { Providers } from "./providers"

/**
 * Headline font — high-contrast extended serif.
 * Closest freely available match to PP Editorial New.
 */
const playfair = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

/**
 * Body font — sharp grotesk sans-serif.
 * Clean, geometric, pairs well with a decorative serif.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

/**
 * Monospace font — technical data, code, labels.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
})

// ---------------------------------------------------------------------------
// Global Metadata
// ---------------------------------------------------------------------------

const BASE_URL = "https://foundrytech.dev"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Foundry Tech — We Build What's Next",
    template: "%s | Foundry Tech",
  },
  description:
    "Foundry Tech is a digital product studio specializing in Mobile, Web, TV, and IoT experiences. Precision engineering meets intentional design.",
  keywords: [
    "Foundry Tech",
    "digital product studio",
    "mobile development",
    "web development",
    "TV app development",
    "IoT",
    "React",
    "Next.js",
    "React Native",
  ],
  authors: [{ name: "Foundry Tech", url: BASE_URL }],
  creator: "Foundry Tech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Foundry Tech",
    title: "Foundry Tech — We Build What's Next",
    description:
      "Digital product studio specializing in Mobile, Web, TV, and IoT experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundry Tech — We Build What's Next",
    description:
      "Digital product studio specializing in Mobile, Web, TV, and IoT experiences.",
    creator: "@foundrytech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
