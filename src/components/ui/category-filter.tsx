"use client"

import type { Platform, ProjectOrigin } from "@/types"

type FilterValue = "All" | Platform
type OriginFilterValue = "All Work" | ProjectOrigin

interface PillFilterProps<T extends string> {
  options: readonly T[]
  active: T
  onSelect: (value: T) => void
  ariaLabel: string
  labels?: Partial<Record<T, string>>
}

const PLATFORM_FILTERS: readonly FilterValue[] = ["All", "Mobile", "Web", "TV", "IoT"]
const PLATFORM_LABELS: Partial<Record<FilterValue, string>> = { All: "All platforms", IoT: "Hardware" }

const ORIGIN_FILTERS: readonly OriginFilterValue[] = ["All Work", "Professional", "Personal"]
const ORIGIN_LABELS: Partial<Record<OriginFilterValue, string>> = {
  "All Work": "Everything",
  Professional: "Company",
  Personal: "Independent",
}

/** Segmented pill control. Plain buttons with aria-pressed — no JS animation. */
function PillFilter<T extends string>({ options, active, onSelect, ariaLabel, labels }: PillFilterProps<T>) {
  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
      {options.map((option) => {
        const isActive = option === active
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(option)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
              isActive ? "bg-ink text-bg" : "text-ink-muted hover:text-ink"
            }`}
          >
            {labels?.[option] ?? option}
          </button>
        )
      })}
    </div>
  )
}

/** Filter projects by target platform. */
export function CategoryFilter({ active, onSelect }: { active: FilterValue; onSelect: (value: FilterValue) => void }) {
  return (
    <PillFilter options={PLATFORM_FILTERS} active={active} onSelect={onSelect} ariaLabel="Filter by platform" labels={PLATFORM_LABELS} />
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
    <PillFilter options={ORIGIN_FILTERS} active={active} onSelect={onSelect} ariaLabel="Filter by project origin" labels={ORIGIN_LABELS} />
  )
}

export type { FilterValue, OriginFilterValue }
