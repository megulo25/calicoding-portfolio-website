import type { ReactNode } from "react"

interface ContainerProps {
  /** Content to render inside the grid */
  children: ReactNode
  /** Additional CSS classes to merge */
  className?: string
  /** HTML element to render as (default: "div") */
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav"
}

/**
 * Container — applies the 12-column Architect's Grid with a max-width constraint.
 *
 * Responsive behavior:
 *   - Mobile (< 768px): 4 columns
 *   - Tablet (768–1023): 8 columns
 *   - Desktop (≥ 1024px): 12 columns
 *
 * Children can use grid-column utilities (.col-full, .col-wide, .col-offset,
 * .col-narrow, .col-sidebar, .col-left, .col-right) to place themselves
 * within the grid.
 */
export function Container({
  children,
  className = "",
  as: Element = "div",
}: ContainerProps) {
  return (
    <Element
      className={`grid-architect mx-auto max-w-[1440px] ${className}`.trim()}
    >
      {children}
    </Element>
  )
}
