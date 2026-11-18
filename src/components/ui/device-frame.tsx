import { AutoplayVideo } from "@/components/ui/autoplay-video"
import { responsiveImage } from "@/lib/utils/images"
import type { Reel } from "@/types"

// =============================================================================
// Device frames — present screenshots in context instead of cropping them.
// "phone" for portrait mobile screenshots, "browser" for landscape web ones,
// "tv" for 16:9 television (tvOS / Fire TV / Roku) screens, "watch" for
// smartwatch screens, "render" for CAD / 3D renders with no device chrome.
//
// Every frame shows either a responsive image or, when `reel` is set, a muted
// looping clip that uses the image as its poster.
// =============================================================================

interface FrameProps {
  src: string
  alt: string
  className?: string
  /** Load eagerly (above-the-fold hero images) */
  eager?: boolean
  /** Rendered width hint for srcset selection (CSS `sizes` value) */
  sizes?: string
  /** Play this clip inside the frame instead of the still image */
  reel?: Reel | undefined
  /** Hide the reel's pause/play control */
  hideReelControl?: boolean
}

/** The screen contents: a still image or a reel, sized by `className`. */
function ScreenMedia({
  src,
  alt,
  eager = false,
  sizes = "100vw",
  reel,
  hideReelControl = false,
  className,
}: Omit<FrameProps, "className"> & { className: string }) {
  if (reel) {
    return <AutoplayVideo reel={reel} label={alt} className={className} hideControl={hideReelControl} />
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...responsiveImage(src, sizes)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  )
}

/** Portrait screenshot inside a minimal phone bezel (≈ 9:19.5). */
export function PhoneFrame({ className = "", sizes = "(max-width: 640px) 70vw, 320px", ...media }: FrameProps) {
  return (
    <div
      className={`relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border-[6px] border-[#1c1c1c] bg-[#1c1c1c] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(242,240,233,0.08)] ${className}`}
    >
      <ScreenMedia {...media} sizes={sizes} className="h-full w-full rounded-[1.6rem] object-cover object-top" />
    </div>
  )
}

/** Landscape screenshot inside a browser window with a title bar. */
export function BrowserFrame({
  className = "",
  url,
  sizes = "(max-width: 1024px) 100vw, 1024px",
  ...media
}: FrameProps & { url?: string | undefined }) {
  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-md)] border border-canvas/10 bg-obsidian-lighter shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-canvas/6 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-canvas/15" />
        <span className="h-2 w-2 rounded-full bg-canvas/15" />
        <span className="h-2 w-2 rounded-full bg-canvas/15" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-obsidian/60 px-3 py-0.5 font-mono text-[0.625rem] text-canvas-dim/70">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      <ScreenMedia {...media} sizes={sizes} className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  )
}

/** 16:9 TV screenshot inside a slim television bezel with a stand. */
export function TvFrame({ className = "", sizes = "(max-width: 1024px) 100vw, 1024px", ...media }: FrameProps) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[var(--radius-md)] border-[5px] border-[#1c1c1c] bg-[#1c1c1c] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(242,240,233,0.08)]">
        <ScreenMedia
          {...media}
          sizes={sizes}
          className="block aspect-[16/9] w-full rounded-[calc(var(--radius-md)-5px)] object-cover"
        />
      </div>
      <div aria-hidden className="mx-auto h-2 w-[18%] rounded-b-md bg-[#1c1c1c]" />
    </div>
  )
}

/** Apple Watch screenshot (≈ 5:6) inside a rounded watch case. */
export function WatchFrame({ className = "", sizes = "(max-width: 640px) 45vw, 200px", ...media }: FrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[28%/24%] border-[6px] border-[#1c1c1c] bg-black shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(242,240,233,0.08)] ${className}`}
    >
      <ScreenMedia {...media} sizes={sizes} className="block aspect-[416/496] w-full object-cover" />
    </div>
  )
}

/** CAD / 3D render (or product photo) on a rounded card, no device chrome. */
export function RenderFrame({ className = "", sizes = "(max-width: 1024px) 100vw, 1024px", ...media }: FrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-md)] border border-canvas/10 bg-obsidian-lighter shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <ScreenMedia {...media} sizes={sizes} className="block h-auto w-full" />
    </div>
  )
}
