"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Link from "next/link"

// Lazy-load the 3D canvas — skip SSR (Three.js needs the DOM)
const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false },
)

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
} as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * HeroSection — full-viewport hero with 3D scene background.
 *
 * Desktop:  3D canvas fills the background, text overlays left side.
 * Mobile:   Gradient/static background, text centered.
 */
export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* 3D Canvas — desktop only (hidden below md) */}
      <HeroCanvas />

      {/* Gradient overlay to keep text readable over the 3D scene */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent md:block"
        aria-hidden="true"
      />

      {/* Mobile-only atmospheric gradient (replaces 3D scene) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian-light to-copper/10 md:hidden"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,4rem)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.p
            variants={itemVariants}
            className="mb-6 inline-block rounded-full border border-copper/30 px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper"
          >
            Mobile · Web · TV · IoT
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-headline text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight"
          >
            We Build
            <br />
            <span className="bg-gradient-to-r from-copper to-safety-orange bg-clip-text text-transparent">
              What&apos;s Next.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-lg leading-relaxed text-canvas-dim"
          >
            Foundry Tech crafts digital experiences that perform across every
            screen — from pocket to wall-sized, from wearable to industrial.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-copper px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-obsidian transition-all duration-300 hover:bg-copper-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              data-cursor="hover"
            >
              View Work
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-canvas/20 px-8 py-3.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-canvas transition-all duration-300 hover:border-copper hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              data-cursor="hover"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex items-center gap-3"
          >
            <div className="h-8 w-px bg-canvas-dim/30" aria-hidden="true" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim/50">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
