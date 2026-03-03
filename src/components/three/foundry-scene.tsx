"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial } from "@react-three/drei"
import type { Mesh, Group } from "three"
import * as THREE from "three"

// ---------------------------------------------------------------------------
// Floating metallic shapes — the "foundry" scene
// ---------------------------------------------------------------------------

/** Copper-toned metallic material */
function CopperMaterial() {
  return (
    <meshStandardMaterial
      color="#b87333"
      metalness={0.9}
      roughness={0.15}
      envMapIntensity={1.2}
    />
  )
}

/** Dark obsidian-toned material */
function ObsidianMaterial() {
  return (
    <meshStandardMaterial
      color="#1e1e1e"
      metalness={0.7}
      roughness={0.3}
      envMapIntensity={0.8}
    />
  )
}

// ---------------------------------------------------------------------------
// Individual shapes
// ---------------------------------------------------------------------------

function RotatingTorus() {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15
      ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={[-2.5, 0.5, -1]} castShadow>
        <torusGeometry args={[1.2, 0.35, 32, 64]} />
        <CopperMaterial />
      </mesh>
    </Float>
  )
}

function RotatingOctahedron() {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
      ref.current.rotation.z += delta * 0.08
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref} position={[2.2, -0.3, 0.5]} castShadow>
        <octahedronGeometry args={[1, 0]} />
        <ObsidianMaterial />
      </mesh>
    </Float>
  )
}

function GlassSphere() {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh position={[0.3, 1, 1]} castShadow>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#f2f0e9"
          transmission={0.95}
          roughness={0.05}
        />
      </mesh>
    </Float>
  )
}

function BoxFrame() {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={ref} position={[-0.8, -1.2, -0.5]} castShadow>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color="#b87333"
          metalness={0.85}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// ---------------------------------------------------------------------------
// Ambient particles
// ---------------------------------------------------------------------------

/**
 * Generate particle positions deterministically.
 * Uses a seeded PRNG (mulberry32) so results are pure/idempotent.
 */
function generateParticlePositions(count: number, seed: number): Float32Array {
  let s = seed | 0
  const random = () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (random() - 0.5) * 12
    arr[i * 3 + 1] = (random() - 0.5) * 8
    arr[i * 3 + 2] = (random() - 0.5) * 8
  }
  return arr
}

/** Pre-computed particle positions (module-level, pure) */
const PARTICLE_POSITIONS = generateParticlePositions(80, 42)

function Particles() {
  const ref = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#b87333"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// ---------------------------------------------------------------------------
// Scene composition
// ---------------------------------------------------------------------------

/**
 * FoundryScene — the main 3D scene with geometric shapes and particles.
 *
 * Placed inside the R3F `<Canvas>` by HeroCanvas. Contains:
 * - Rotating copper torus
 * - Floating obsidian octahedron
 * - Glass transmission sphere
 * - Wireframe copper box
 * - Ambient copper particle field
 * - Lighting rig (ambient + directional + point lights)
 */
export function FoundryScene() {
  const groupRef = useRef<Group>(null)

  // Subtle parallax: rotate group based on mouse position
  useFrame(({ pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.15,
        0.05,
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.08,
        0.05,
      )
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 2, -2]} color="#ff6700" intensity={0.8} />
      <pointLight position={[3, -2, 3]} color="#b87333" intensity={0.5} />

      {/* Scene group — affected by mouse parallax */}
      <group ref={groupRef}>
        <RotatingTorus />
        <RotatingOctahedron />
        <GlassSphere />
        <BoxFrame />
        <Particles />
      </group>
    </>
  )
}
