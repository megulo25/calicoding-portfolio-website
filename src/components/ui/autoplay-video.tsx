"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { withBasePath } from "@/lib/utils"
import type { Reel } from "@/types"

// =============================================================================
// AutoplayVideo — muted, looping clip that only loads and plays while on
// screen. Shows the poster alone (with a play button) when the viewer prefers
// reduced motion or has Save-Data on. Always has a visible pause/play control
// (WCAG 2.2.2: moving content longer than 5 s must be pausable).
// =============================================================================

interface AutoplayVideoProps {
  reel: Reel
  /** Accessible description of the clip */
  label: string
  /** Classes for the <video> element (sizing / object-fit) */
  className?: string
  /**
   * Preview mode for clips inside links (no control button allowed there):
   * plays for at most 5 s per view, replays on hover.
   */
  hideControl?: boolean
}

/** WCAG 2.2.2 — auto-playing motion without a control must stop within 5 s. */
const PREVIEW_LIMIT_S = 5

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

/** True when the viewer asked for reduced motion or less data. */
function prefersStill(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia(REDUCED_MOTION).matches || Boolean(conn?.saveData)
}

export function AutoplayVideo({ reel, label, className = "", hideControl = false }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  // null = follow the viewer's motion preference; true/false = user choice.
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  // Server render assumes "still" so nothing autoplays before hydration.
  const still = useSyncExternalStore(subscribeMotion, prefersStill, () => true)
  const [previewDone, setPreviewDone] = useState(false)
  const playedFrom = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting)
        setInView(visible)
        if (visible) setLoaded(true)
        // Re-arm the preview each time the clip scrolls back into view.
        else setPreviewDone(false)
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const loop = reel.loop ?? true
  const paused = userPaused ?? still
  const shouldPlay = loaded && inView && !paused && !(hideControl && previewDone)

  useEffect(() => {
    const el = ref.current
    if (!el || !loaded) return
    if (shouldPlay) {
      playedFrom.current = el.currentTime
      el.play().catch(() => undefined)
    } else el.pause()
  }, [shouldPlay, loaded])

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={hideControl && !still ? () => setPreviewDone(false) : undefined}
      onMouseLeave={hideControl && !still ? () => setPreviewDone(true) : undefined}
    >
      <video
        ref={ref}
        poster={withBasePath(reel.poster)}
        aria-label={label}
        muted
        loop={loop}
        playsInline
        preload="none"
        className={className}
        // A play-once clip parks on its last frame; the button then replays it.
        onEnded={loop ? undefined : () => setUserPaused(true)}
        onTimeUpdate={
          hideControl
            ? (e) => {
                const t = e.currentTarget.currentTime
                const elapsed = t >= playedFrom.current ? t - playedFrom.current : t + e.currentTarget.duration - playedFrom.current
                if (elapsed >= PREVIEW_LIMIT_S) setPreviewDone(true)
              }
            : undefined
        }
      >
        {loaded && reel.mobileSrc && (
          <source src={withBasePath(reel.mobileSrc)} type="video/mp4" media="(max-width: 640px)" />
        )}
        {loaded && <source src={withBasePath(reel.src)} type="video/mp4" />}
      </video>
      {!hideControl && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setUserPaused(!paused)
          }}
          aria-label={paused ? `Play: ${label}` : `Pause: ${label}`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg/70 text-ink backdrop-blur-sm transition-colors hover:bg-accent hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
