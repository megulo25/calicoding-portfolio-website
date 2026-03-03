"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { FoundryScene } from "./foundry-scene"

/**
 * HeroCanvas — R3F Canvas wrapper for the hero 3D scene.
 *
 * - Lazy-loads the scene with Suspense (empty fallback = seamless reveal).
 * - Includes post-processing: subtle bloom + vignette.
 * - Uses `city` environment map for realistic metallic reflections.
 * - Hidden below `md` breakpoint (mobile gets a static fallback in HeroSection).
 */
export function HeroCanvas() {
  return (
    <div className="absolute inset-0 hidden md:block" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <FoundryScene />
          <Environment preset="city" />
          <Preload all />
        </Suspense>

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            intensity={0.3}
          />
          <Vignette offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
