/**
 * Root loading fallback — shown during route transitions when
 * React suspense boundaries are active.
 *
 * Displays a minimal branded spinner centered in the viewport.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner ring */}
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-canvas/10 border-t-copper"
          role="status"
          aria-label="Loading"
        />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim/50">
          Loading…
        </span>
      </div>
    </div>
  )
}
