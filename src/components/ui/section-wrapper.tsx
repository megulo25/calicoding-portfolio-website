import type { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  ariaLabel?: string
  className?: string
}

/** SectionWrapper — a semantic `<section>` with consistent vertical rhythm. */
export function SectionWrapper({ children, id, ariaLabel, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={`py-16 md:py-24 ${className}`.trim()}>
      {children}
    </section>
  )
}
