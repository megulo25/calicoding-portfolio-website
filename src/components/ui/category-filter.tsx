"use client"

import { motion } from "framer-motion"
import type { Platform, ProjectOrigin } from "@/types"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FilterValue = "All" | Platform
type OriginFilterValue = "All Work" | ProjectOrigin

interface PillFilterProps<T extends string> {
  /** Available options, in display order. */
  options: readonly T[]
  /** Currently active option. */
  active: T
  /** Callback when an option is clicked. */
  onSelect: (value: T) => void
  /** Accessible label for the tab list. */
  ariaLabel: string
  /** Unique Framer Motion `layoutId` for this bar's sliding indicator. */
  layoutId: string
  /** Optional per-option display labels. */
  labels?: Partial<Record<T, string>>
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PLATFORM_FILTERS: readonly FilterValue[] = ["All", "Mobile", "Web", "TV", "IoT"] as const

const ORIGIN_FILTERS: readonly OriginFilterValue[] = ["All Work", "Professional", "Personal"] as const

const ORIGIN_LABELS: Partial<Record<OriginFilterValue, string>> = {
  Professional: "Company Work",
  Personal: "Independent",
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

/**
 * PillFilter — horizontal pill bar. The active pill shows a sliding copper
 * indicator via Framer Motion `layoutId`.
 */
function PillFilter<T extends string>({
  options,
  active,
  onSelect,
  ariaLabel,
  layoutId,
  labels,
}: PillFilterProps<T>) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => {
        const isActive = option === active
        return (
          <button
            key={option}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(option)}
            className={`relative rounded-full px-5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-300 ${isActive
              ? "text-obsidian"
              : "text-canvas-dim hover:text-canvas"
              }`}
            data-cursor="hover"
          >
            {/* Animated background pill */}
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-copper"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{labels?.[option] ?? option}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Filter projects by target platform. */
export function CategoryFilter({
  active,
  onSelect,
}: {
  active: FilterValue
  onSelect: (value: FilterValue) => void
}) {
  return (
    <PillFilter
      options={PLATFORM_FILTERS}
      active={active}
      onSelect={onSelect}
      ariaLabel="Filter by platform"
      layoutId="category-pill"
    />
  )
}

/** Filter projects by origin: company work vs. independent projects. */
export function OriginFilter({
  active,
  onSelect,
}: {
  active: OriginFilterValue
  onSelect: (value: OriginFilterValue) => void
}) {
  return (
    <PillFilter
      options={ORIGIN_FILTERS}
      active={active}
      onSelect={onSelect}
      ariaLabel="Filter by project origin"
      layoutId="origin-pill"
      labels={ORIGIN_LABELS}
    />
  )
}

export type { FilterValue, OriginFilterValue }
