import type { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: "div" | "section" | "article" | "header" | "footer" | "nav"
}

/** Container — page gutter and max width (see `.shell` in globals.css). */
export function Container({ children, className = "", as: Element = "div" }: ContainerProps) {
  return <Element className={`shell ${className}`.trim()}>{children}</Element>
}
