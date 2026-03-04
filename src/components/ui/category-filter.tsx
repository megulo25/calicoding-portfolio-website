"use client"

import { motion } from "framer-motion"
import type { Platform } from "@/types"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FilterValue = "All" | Platform

interface CategoryFilterProps {
  /** Currently active filter. */
  active: FilterValue
  /** Callback when a filter button is clicked. */
  onSelect: (value: FilterValue) => void
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FILTERS: readonly FilterValue[] = [
  "All",
  "Mobile",
  "Web",
  "TV",
  "IoT",
] as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * CategoryFilter — horizontal pill bar for filtering projects by category.
 * Active pill shows a sliding copper indicator via Framer Motion `layoutId`.
 */
export function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter by platform"
    >
      {FILTERS.map((filter) => {
        const isActive = filter === active
        return (
          <button
            key={filter}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(filter)}
            className={`relative rounded-full px-5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-300 ${isActive
              ? "text-obsidian"
              : "text-canvas-dim hover:text-canvas"
              }`}
            data-cursor="hover"
          >
            {/* Animated background pill */}
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-copper"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{filter}</span>
          </button>
        )
      })}
    </div>
  )
}

export type { FilterValue }
