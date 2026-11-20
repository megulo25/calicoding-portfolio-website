import { withBasePath } from "@/lib/utils"
import type { ProjectLinks } from "@/types"

// =============================================================================
// StoreBadges — official, unmodified App Store / Google Play badge artwork.
//
// Apple: ≥ 40 px tall, listed first, black version when shown with others.
// Google Play: same size or larger than other badges. Its PNG ships with
// built-in transparent padding (badge is 564×168 inside 646×250), so the image
// is scaled up and the padding pulled in with negative margins to match
// Apple's 40 px height. The 24 px gap minus that padding leaves ≥ 10 px of
// clear space (¼ of the badge height) between the two.
// =============================================================================

const BADGE_H = 40
const GP_SCALE = 250 / 168
const GP_H = BADGE_H * GP_SCALE
const GP_PAD = (41 / 250) * GP_H

export function StoreBadges({ links, className = "" }: { links: ProjectLinks; className?: string }) {
  if (!links.iosAppStore && !links.googlePlay) return null

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {links.iosAppStore && (
        <a
          href={links.iosAppStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-opacity hover:opacity-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/badges/app-store.svg")}
            alt="Download on the App Store"
            width={120}
            height={BADGE_H}
            style={{ height: BADGE_H, width: "auto" }}
          />
        </a>
      )}
      {links.googlePlay && (
        <a
          href={links.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-opacity hover:opacity-80"
          style={{ margin: `${-GP_PAD}px ${-GP_PAD}px` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/badges/google-play.png")}
            alt="Get it on Google Play"
            width={646}
            height={250}
            style={{ height: GP_H, width: "auto" }}
          />
        </a>
      )}
    </div>
  )
}
