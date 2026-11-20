/**
 * SkipLink — "Skip to main content", visible only when focused by keyboard.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[1000] -translate-y-[calc(100%+2rem)] rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-200 focus:translate-y-0"
    >
      Skip to main content
    </a>
  )
}
