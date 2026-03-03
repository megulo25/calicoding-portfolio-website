import type { ReactNode } from "react"

interface SectionWrapperProps {
  /** Content to render inside the section */
  children: ReactNode
  /** Section ID for scroll-target navigation (e.g., "work", "about") */
  id?: string
  /** Accessible label describing the section's purpose */
  ariaLabel?: string
  /** Additional CSS classes to merge */
  className?: string
}

/**
 * SectionWrapper — a semantic `<section>` with consistent vertical padding
 * and optional scroll-target ID.
 *
 * Default padding: py-16 (mobile) → py-24 (md) → py-32 (lg)
 */
export function SectionWrapper({
  children,
  id,
  ariaLabel,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-16 md:py-24 lg:py-32 ${className}`.trim()}
    >
      {children}
    </section>
  )
}
