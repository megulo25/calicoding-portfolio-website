import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { COMPANY } from "@/data/company"
import { personJsonLd, websiteJsonLd } from "@/lib/seo/json-ld"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkipLink } from "@/components/ui/skip-link"
import { THEME_SCRIPT } from "@/components/ui/theme-toggle"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

/** Used only for italic accents in headlines. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
})

// ---------------------------------------------------------------------------
// Global metadata
// ---------------------------------------------------------------------------

const TITLE = `${COMPANY.name} — ${COMPANY.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: TITLE,
    template: `%s — ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    COMPANY.name,
    "software engineer",
    "mobile engineer",
    "React Native",
    "Expo",
    "iOS",
    "Android",
    "tvOS",
    "AI-native engineering",
    "San Diego",
  ],
  authors: [{ name: COMPANY.name, url: COMPANY.url }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.url,
    siteName: COMPANY.name,
    title: TITLE,
    description: COMPANY.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: COMPANY.description,
    creator: COMPANY.twitter,
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

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
}

// ---------------------------------------------------------------------------
// Root layout
// ---------------------------------------------------------------------------

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme is set by THEME_SCRIPT before hydration, so React must not
    // warn about the attribute differing from the server render.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
