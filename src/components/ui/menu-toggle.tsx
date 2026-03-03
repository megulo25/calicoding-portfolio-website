"use client"

/**
 * MenuToggle — animated hamburger ↔ close icon button.
 *
 * Three horizontal bars morph into an X when `isOpen` is true.
 * All animation is CSS-only (transform + opacity transitions).
 * Visible only below `md` breakpoint.
 */
interface MenuToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onToggle}
      className="relative flex size-10 items-center justify-center md:hidden"
    >
      {/* Top bar */}
      <span
        className="absolute h-px w-5 bg-canvas transition-all duration-300 ease-out"
        style={{
          transform: isOpen
            ? "translateY(0) rotate(45deg)"
            : "translateY(-6px) rotate(0)",
        }}
        aria-hidden="true"
      />
      {/* Middle bar */}
      <span
        className="absolute h-px w-5 bg-canvas transition-all duration-300 ease-out"
        style={{ opacity: isOpen ? 0 : 1 }}
        aria-hidden="true"
      />
      {/* Bottom bar */}
      <span
        className="absolute h-px w-5 bg-canvas transition-all duration-300 ease-out"
        style={{
          transform: isOpen
            ? "translateY(0) rotate(-45deg)"
            : "translateY(6px) rotate(0)",
        }}
        aria-hidden="true"
      />
    </button>
  )
}
