/**
 * SkipLink — accessible "Skip to main content" link.
 *
 * Hidden by default, becomes visible on focus (keyboard navigation).
 * Jumps focus to main content area, bypassing header navigation.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[10000] -translate-y-[calc(100%+2rem)] rounded-[var(--radius-md)] bg-copper px-6 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-obsidian transition-transform duration-200 focus:translate-y-0"
    >
      Skip to main content
    </a>
  )
}
