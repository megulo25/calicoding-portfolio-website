"use client"

import type { ReactNode } from "react"
import { PageTransition } from "@/components/ui/page-transition"

/**
 * Root template — re-mounts on every route change.
 *
 * Next.js `template.tsx` creates a new component instance per
 * navigation, which gives Framer Motion a fresh mount to
 * animate from `initial` → `enter`.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
