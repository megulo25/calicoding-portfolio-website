"use client"

import type { ReactNode } from "react"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { SkipLink } from "@/components/ui/skip-link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLenis } from "@/hooks/use-lenis"

interface ProvidersProps {
  children: ReactNode
}

/**
 * Providers — client component boundary for all context providers
 * and global UI overlays.
 *
 * Imported by the root layout (Server Component) to keep the
 * "use client" boundary as narrow as possible.
 */
export function Providers({ children }: ProvidersProps) {
  // Initialize smooth scroll
  useLenis()

  return (
    <>
      <SkipLink />
      <CustomCursor />
      <Header />
      <main id="main-content" className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
