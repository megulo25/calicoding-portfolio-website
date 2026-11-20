"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  BrowserFrame,
  PhoneFrame,
  RenderFrame,
  TabletFrame,
  TvFrame,
  WatchFrame,
} from "@/components/ui/device-frame"
import { IMAGE_ALT } from "@/data/image-alt"
import { responsiveImage } from "@/lib/utils/images"

// =============================================================================
// MediaGallery — framed screenshots that open in a full-screen lightbox.
//
// Phones: swipeable scroll-snap carousel on small screens, grid from `sm` up.
// Landscape frames: single column on phones, two columns (first item full
// width) from `sm` up. The lightbox supports arrow keys, swipe and Escape.
// =============================================================================

export type GalleryFrame = "phone" | "browser" | "tablet" | "tv" | "watch" | "render"

interface MediaGalleryProps {
  images: string[]
  frame: GalleryFrame
  /** Used to build alt text: "<title> screen N" */
  title: string
  /** Shown in the browser frame's address bar */
  url?: string | undefined
  /** Make the first landscape item span the full row when the count is odd (default true) */
  leadWide?: boolean
}

const GRID: Record<GalleryFrame, string> = {
  phone:
    "max-sm:-mx-[clamp(1rem,4vw,4rem)] max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-[clamp(1rem,4vw,4rem)] max-sm:pb-4 sm:grid sm:grid-cols-3 lg:grid-cols-6",
  watch: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
  tv: "grid sm:grid-cols-2",
  tablet: "grid sm:grid-cols-2",
  browser: "grid sm:grid-cols-2",
  render: "grid sm:grid-cols-2",
}

const ITEM: Record<GalleryFrame, string> = {
  phone: "max-sm:w-[68vw] max-sm:shrink-0 max-sm:snap-center",
  watch: "",
  tv: "",
  tablet: "",
  browser: "",
  render: "",
}

function Frame({ frame, src, alt, url }: { frame: GalleryFrame; src: string; alt: string; url?: string | undefined }) {
  switch (frame) {
    case "phone":
      return <PhoneFrame src={src} alt={alt} />
    case "watch":
      return <WatchFrame src={src} alt={alt} />
    case "tv":
      return <TvFrame src={src} alt={alt} />
    case "tablet":
      return <TabletFrame src={src} alt={alt} />
    case "render":
      return <RenderFrame src={src} alt={alt} />
    default:
      return <BrowserFrame src={src} alt={alt} url={url} />
  }
}

export function MediaGallery({ images, frame, title, url, leadWide = true }: MediaGalleryProps) {
  const [open, setOpen] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const landscape = frame === "tv" || frame === "browser" || frame === "tablet" || frame === "render"
  const altFor = (i: number) => IMAGE_ALT[images[i] ?? ""] ?? `${title} screen ${i + 1}`

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open !== null && !dialog.open) dialog.showModal()
    if (open === null && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, step])

  const current = open === null ? null : images[open]

  return (
    <>
      <ul className={`gap-6 ${GRID[frame]}`}>
        {images.map((src, i) => (
          <li
            key={src}
            className={`${ITEM[frame]} ${landscape && leadWide && i === 0 && images.length > 1 && images.length % 2 === 1 ? "sm:col-span-2" : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge: ${altFor(i)}`}
              className="block w-full cursor-zoom-in rounded-[var(--radius-md)] text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              data-cursor="hover"
            >
              <Frame frame={frame} src={src} alt="" url={url} />
            </button>
          </li>
        ))}
      </ul>
      {frame === "phone" && images.length > 1 && (
        <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim/60 sm:hidden">
          Swipe for more · Tap to enlarge
        </p>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null)
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(e) => {
          const start = touchX.current
          const end = e.changedTouches[0]?.clientX
          touchX.current = null
          if (start === null || end === undefined) return
          if (Math.abs(end - start) > 50) step(end < start ? 1 : -1)
        }}
        aria-label={`${title} gallery`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-obsidian/95 p-0 backdrop:bg-obsidian/80"
      >
        {current && open !== null && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null)
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...responsiveImage(current, "100vw")}
              alt={altFor(open)}
              className={`max-h-[82dvh] w-auto max-w-full object-contain shadow-2xl ${frame === "phone" ? "rounded-[2rem]" : "rounded-[var(--radius-md)]"}`}
            />
            <div className="flex items-center gap-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim">
              {images.length > 1 && (
                <button type="button" onClick={() => step(-1)} className="px-3 py-2 hover:text-copper" aria-label="Previous image">
                  ← Prev
                </button>
              )}
              <span aria-live="polite">
                {open + 1} / {images.length}
              </span>
              {images.length > 1 && (
                <button type="button" onClick={() => step(1)} className="px-3 py-2 hover:text-copper" aria-label="Next image">
                  Next →
                </button>
              )}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(null)}
          aria-label="Close gallery"
          className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-obsidian-light text-canvas hover:bg-copper hover:text-obsidian focus-visible:outline-2 focus-visible:outline-copper"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </dialog>
    </>
  )
}
