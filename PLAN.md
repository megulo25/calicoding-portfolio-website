## Plan: Foundry Tech — Expanded Implementation Roadmap (15 Phases)

**TL;DR** — The original 7 phases are exploded into 15 smaller checkpoints. Each phase produces a visually or functionally verifiable result so you can inspect, test, and approve before moving on. The project is currently a stock `create-next-app` scaffold (Next 16.1.6, React 19, Tailwind v4). Every phase lists exact files created/modified, what to check, and the expected behavior.

---

### Phase 1: Dependency Installation & Folder Scaffolding

**Goal:** Install all libraries needed across the entire project, and create the empty folder structure so every subsequent phase just fills in files.

**Steps:**

1. Install production dependencies:
   - `framer-motion` — physics-based animation
   - `three` — 3D engine
   - `@react-three/fiber` — React renderer for Three.js
   - `@react-three/drei` — R3F helpers (OrbitControls, Text, etc.)
   - `@react-three/postprocessing` — bloom, film grain, chromatic aberration
   - `lenis` — high-inertia smooth scrolling
2. Install dev dependencies:
   - `@types/three` — Three.js type definitions
3. Create empty directory skeleton (no code yet, just folders with `.gitkeep` or barrel `index.ts` files):
   - `src/components/ui/`
   - `src/components/layout/`
   - `src/components/three/`
   - `src/components/sections/`
   - `src/lib/constants/`
   - `src/lib/context/`
   - `src/lib/data/`
   - `src/lib/utils/`
   - `src/hooks/`
   - `src/types/`
   - `src/app/(routes)/work/`
   - `src/app/(routes)/about/`
   - `src/app/(routes)/contact/`
4. Create a shared `src/types/index.ts` exporting a placeholder `Project` interface and a `DevModeState` type so TypeScript references resolve early.
5. Clean up public — remove default scaffold SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Add a temporary `public/images/` directory for future assets.

**Verification:**
- `bun install` completes without errors.
- `bun dev` still starts successfully (the page is still the default, that's fine).
- Confirm folder structure exists via file tree.
- TypeScript compiles (`bun run build` passes with zero errors).

---

### Phase 2: Design Tokens — Color Palette & Spacing

**Goal:** Replace default Tailwind tokens with the Architect's Framework palette. After this phase, using `bg-obsidian`, `text-canvas`, `border-copper`, etc. in any component will "just work."

**Steps:**

1. Rewrite the `:root` and `@theme inline` blocks in globals.css:
   - **Colors:**
     - `--color-obsidian: #0A0A0A` (primary background)
     - `--color-obsidian-light: #141414` (elevated surfaces)
     - `--color-obsidian-lighter: #1E1E1E` (cards/modals)
     - `--color-canvas: #F2F0E9` (primary text)
     - `--color-canvas-dim: #A8A49C` (secondary text)
     - `--color-copper: #B87333` (primary accent)
     - `--color-copper-light: #D4956A` (hover accent)
     - `--color-copper-dark: #8B5A2B` (pressed accent)
     - `--color-safety-orange: #FF6700` (highlight/CTA accent)
     - `--color-grid-line: rgba(242, 240, 233, 0.06)` (grid overlay)
   - **Spacing scale:** 4px base unit, tokens for `--space-1` through `--space-20` (4px–80px).
   - **Border radii:** `--radius-sm: 2px`, `--radius-md: 4px`, `--radius-lg: 8px` (sharp, industrial feel — no large rounding).
   - **Z-index scale:** `--z-grid: 9999`, `--z-cursor: 9998`, `--z-nav: 100`, `--z-modal: 200`.
2. Remove the `prefers-color-scheme` media query — this is a dark-mode-first site. The `:root` always uses obsidian/canvas values.
3. Add CSS custom properties for transition durations: `--duration-fast: 150ms`, `--duration-base: 300ms`, `--duration-slow: 600ms`, `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`.
4. Set global box-sizing, selection color (`::selection { background: var(--color-copper); color: var(--color-obsidian) }`), and scrollbar styling (thin, copper thumb on obsidian track).

**Verification:**
- Create a temporary test on page.tsx with `<div className="bg-obsidian text-canvas">` and `<span className="text-copper">` to confirm tokens resolve.
- Inspect computed styles in browser DevTools — colors match the hex values above.
- Scrollbar is visually styled (Webkit browsers).

---

### Phase 3: Typography System

**Goal:** Replace Geist fonts with the editorial + monospace pairing and establish a fluid typographic scale.

**Steps:**

1. In layout.tsx, replace `Geist` and `Geist_Mono` font imports:
   - **Headline font:** Load `Playfair Display` (serif, available on Google Fonts — closest freely available match to PP Editorial New's high-contrast extended serif) via `next/font/google` with variable `--font-headline`.
   - **Body/technical font:** Load `Space Grotesk` (grotesk sans) via `next/font/google` with variable `--font-body`.
   - **Monospace font:** Load `JetBrains Mono` via `next/font/google` with variable `--font-mono`.
2. Register font tokens in `@theme inline` in globals.css:
   - `--font-headline: var(--font-playfair-display)`
   - `--font-body: var(--font-space-grotesk)`
   - `--font-mono: var(--font-jetbrains-mono)`
3. Define a fluid typographic scale using `clamp()` in globals.css:
   - `--text-display: clamp(3rem, 8vw, 7rem)` — hero headlines
   - `--text-h1: clamp(2.25rem, 5vw, 4rem)`
   - `--text-h2: clamp(1.75rem, 3.5vw, 2.5rem)`
   - `--text-h3: clamp(1.25rem, 2.5vw, 1.75rem)`
   - `--text-body: clamp(1rem, 1.2vw, 1.125rem)`
   - `--text-small: clamp(0.75rem, 1vw, 0.875rem)`
   - `--text-caption: 0.6875rem` (fixed, for labels/badges)
4. Add corresponding utility classes or `@theme` entries so Tailwind's `text-display`, `text-h1`, etc. work.
5. Set `body` font-family to `var(--font-body)` in the global styles.
6. Add a `<Typography />` test section on page.tsx rendering every size with both font families so you can review the pairing.

**Verification:**
- Page renders with Playfair Display headlines, Space Grotesk body, JetBrains Mono code.
- Font sizes scale fluidly between mobile (375px) and desktop (1440px).
- No FOUT (flash of unstyled text) — fonts are loaded via `next/font` with `display: swap`.

---

### Phase 4: Global Base Styles & CSS Grid Foundation

**Goal:** Establish the core layout grid and base HTML element styles that every page inherits.

**Steps:**

1. Define an asymmetric 12-column CSS Grid in globals.css:
   - `.grid-architect` class: `display: grid; grid-template-columns: repeat(12, 1fr); column-gap: 1.5rem; padding-inline: clamp(1rem, 4vw, 4rem);`
   - Responsive adjustments: 4 columns on mobile, 8 on tablet, 12 on desktop.
   - Document named grid areas for common asymmetric patterns (e.g., `content-wide` spans columns 1–8, `sidebar` spans 9–12; `content-offset` spans 2–10 for centered-but-not-centered effect).
2. Add base HTML resets and element styles:
   - `a` — no underline by default, copper color on hover, custom focus-visible ring (2px copper outline, 2px offset).
   - `h1–h6` — apply `font-headline`, appropriate `--text-*` sizes, `letter-spacing: -0.02em` for tight editorial feel.
   - `p` — `font-body`, `--text-body` size, `line-height: 1.65`.
   - `code, pre` — `font-mono`, `--text-small`, obsidian-lighter background.
   - `hr` — 0.5px height, `--color-grid-line`.
3. Create a `<Container />` component in `src/components/ui/container.tsx` — a reusable wrapper that applies `.grid-architect` with max-width constraint (`max-w-[1440px]`, centered).
4. Create a `<SectionWrapper />` component in `src/components/ui/section-wrapper.tsx` — adds vertical padding (`py-24 md:py-32`), optional `id` for scroll targets, and an `aria-label`.
5. Replace page.tsx with a design system preview page using `<Container>` and `<SectionWrapper>` to display: color swatches, typography samples, a 12-column grid visualization (colored columns), and spacing scale.

**Verification:**
- The design system preview page renders on `/`.
- 12-column grid is visible (via temporarily colored columns).
- All typography levels render correctly in the grid.
- Responsive: columns collapse to 4 on mobile.
- Focus styles are visible when tabbing through links.

---

### Phase 5: Dev-Mode Context & Grid Overlay

**Goal:** Implement the "Dev-Mode" toggle infrastructure and the visible grid overlay. This is a foundational system that later phases enhance.

**Steps:**

1. Create `src/lib/context/dev-mode-context.tsx`:
   - React Context providing `{ isDevMode: boolean; toggleDevMode: () => void }`.
   - Provider component that:
     - Stores state in `useState`, synced to `localStorage` key `foundry-dev-mode`.
     - On mount, reads `localStorage` and restores preference.
     - Listens for `Ctrl+Shift+D` (or `Cmd+Shift+D` on macOS) keyboard shortcut to toggle.
     - Sets `document.documentElement.dataset.devMode = "true" | "false"` so CSS can target `[data-dev-mode="true"]`.
2. Create `src/hooks/use-dev-mode.ts` — a convenience hook wrapping `useContext(DevModeContext)` with an error boundary if used outside provider.
3. Create `src/components/ui/grid-overlay.tsx`:
   - A `position: fixed; inset: 0; pointer-events: none` div.
   - Renders 12 semi-transparent columns (`bg-copper/5`) inside a `.grid-architect` layout.
   - Each column shows its number (1–12) in `--text-caption` monospace at the top.
   - Horizontal baseline guides every 8px via a repeating CSS gradient.
   - Only visible when `[data-dev-mode="true"]` is set (pure CSS: `[data-dev-mode="true"] .grid-overlay { opacity: 1 }`).
4. Wrap the app with `<DevModeProvider>` in layout.tsx.
5. Render `<GridOverlay />` inside the layout (always in DOM, visibility CSS-controlled).
6. Add a temporary keyboard shortcut hint to the preview page: "Press Ctrl+Shift+D to toggle Dev-Mode."

**Verification:**
- Press `Ctrl+Shift+D` → grid overlay appears with 12 numbered columns and baseline guides.
- Press again → overlay disappears.
- Reload page → preference is remembered.
- Overlay does not capture mouse events (pointer-events: none).
- `data-dev-mode` attribute toggles on `<html>`.

---

### Phase 6: Header & Desktop Navigation

**Goal:** Build the fixed site header with logo, navigation links, and the Dev-Mode toggle switch.

**Steps:**

1. Create `src/components/layout/header.tsx` (client component):
   - `position: fixed; top: 0; width: 100%` with `z-nav`.
   - Semi-transparent `bg-obsidian/80` with `backdrop-blur-md`.
   - Inner layout uses `.grid-architect` 12-column grid.
   - **Left zone (cols 1–2):** "FOUNDRY" wordmark in `font-headline`, uppercase, letter-spaced. Below it, a `font-mono` `--text-caption` tagline: "TECH STUDIO".
   - **Center zone (cols 5–8):** Navigation links — Work, About, Contact. Each link has a copper underline that animates in from the left on hover (Framer Motion `layoutId` shared underline for active route).
   - **Right zone (cols 11–12):** Dev-Mode toggle styled as a small industrial toggle switch (a `<button>` with a sliding indicator, copper when active, obsidian-lighter when inactive). Accessible: `role="switch"`, `aria-checked`, `aria-label="Toggle developer mode"`.
2. Create `src/lib/constants/navigation.ts` — typed array of `{ label: string; href: string }` for nav items, used by header and mobile nav.
3. Add active-route detection: use `usePathname()` from `next/navigation` to highlight the current nav link with a persistent copper underline.
4. Add the header to layout.tsx, with `pt-20` (or equivalent) on the main content wrapper to account for fixed header height.
5. Update the design system preview page to include enough content to scroll, verifying the header stays fixed and the backdrop blur works.

**Verification:**
- Header is fixed at the top of the viewport on all pages.
- Logo reads "FOUNDRY / TECH STUDIO" in the correct fonts.
- Nav links display with hover underline animation.
- Dev-Mode toggle in header works (syncs with Ctrl+Shift+D shortcut).
- Header blurs content behind it on scroll.
- All header controls are keyboard-accessible with visible focus rings.

---

### Phase 7: Footer

**Goal:** Build the full-width site footer with contact CTA and branding.

**Steps:**

1. Create `src/components/layout/footer.tsx` (server component where possible):
   - Full-width, separated from content by a 0.5px `border-grid-line` top border.
   - Inner layout uses `.grid-architect`.
   - **Left block (cols 1–5):** Large headline in serif: "Let's Build Together." Below it, a brief description in `font-body` `text-canvas-dim`.
   - **Center block (cols 6–8):** Navigation links (same as header) in `font-mono`, `--text-small`.
   - **Right block (cols 9–12):** Social links (GitHub, LinkedIn, Twitter/X, Email) as icon buttons. Below, copyright line in `font-mono` `--text-caption`: "© 2026 Foundry Tech. All rights reserved."
   - Bottom strip: full-width thin copper accent line (1px).
2. Add placeholder social link URLs (just `#` for now).
3. Render the footer in layout.tsx below the `{children}` slot.
4. Ensure the footer is at the natural bottom of the page (flexbox `min-h-screen` layout on the content area, footer outside it).

**Verification:**
- Footer appears at the bottom of every page.
- Three-column layout renders correctly.
- Links are accessible and focusable.
- Footer does not overlap content.
- Copper accent line is visible.

---

### Phase 8: Mobile Navigation

**Goal:** Implement the responsive mobile navigation drawer.

**Steps:**

1. Add a hamburger/menu button to src/components/layout/header.tsx, visible only below `md` breakpoint. Styled as two horizontal lines (industrial aesthetic), animates to an X on open.
2. Create `src/components/layout/mobile-nav.tsx`:
   - Full-screen overlay (`fixed inset-0 bg-obsidian z-modal`).
   - Navigation links displayed vertically in large `--text-h2` serif font, staggered entrance animation (Framer Motion `staggerChildren: 0.08`, each link slides up with `opacity: 0 → 1`).
   - Dev-Mode toggle appears at the bottom of the mobile nav.
   - Close on link click (navigate) or X button.
   - Close on `Escape` key.
   - Trap focus within the drawer when open (`aria-modal="true"`, `role="dialog"`).
3. Hide desktop nav links below `md` breakpoint.
4. Prevent body scroll when drawer is open (`overflow: hidden` on body).
5. Test across viewport widths: drawer triggers at < 768px, desktop nav shows at ≥ 768px.

**Verification:**
- Hamburger icon appears on mobile, hidden on desktop.
- Tapping hamburger opens full-screen nav with staggered link animations.
- Tapping a link closes the drawer and navigates.
- Escape key closes the drawer.
- Focus is trapped within the drawer.
- Body does not scroll behind the drawer.

---

### Phase 9: Smooth Scrolling & Magnetic Cursor

**Goal:** Add the signature motion behaviors — high-inertia smooth scrolling and the magnetic cursor effect.

**Steps:**

1. Create `src/components/layout/smooth-scroll-provider.tsx`:
   - Client component that initializes `lenis` on mount.
   - Configuration: `lerp: 0.06`, `smoothWheel: true`, `syncTouch: true` (for iOS momentum feel).
   - Integrate with Framer Motion's `useScroll` if needed (Lenis provides a `scroll` event that can sync with Framer Motion's scroll progress).
   - Provide a `scrollTo(target)` function via context for programmatic scrolling (e.g., anchor links).
   - Handle `prefers-reduced-motion`: if enabled, disable Lenis entirely and fall back to native scroll.
2. Create `src/hooks/use-smooth-scroll.ts` — context hook for consuming `scrollTo` and `scrollProgress`.
3. Create `src/components/ui/magnetic-cursor.tsx`:
   - Custom cursor: a 12px copper circle that follows the mouse using Framer Motion `useMotionValue` + `useSpring` (spring config: `stiffness: 150, damping: 15`).
   - When hovering over elements with `data-magnetic` attribute, the cursor expands to 48px and the target element subtly shifts toward the cursor position (±4px magnetic pull).
   - Hidden on touch devices (detect via `pointer: coarse` media query or `ontouchstart` check).
   - The default system cursor is hidden via `cursor: none` on `body` (desktop only).
4. Add `<SmoothScrollProvider>` wrapping the app in layout.tsx.
5. Add `<MagneticCursor />` to layout.tsx.
6. Add `data-magnetic` attribute to all nav links and button components.

**Verification:**
- Scrolling has noticeable inertia — releasing the scroll wheel continues the scroll smoothly.
- Custom copper cursor appears on desktop, follows mouse with slight spring lag.
- Hovering over nav links causes the cursor to expand and the link to shift slightly toward the cursor.
- On mobile/touch devices: no custom cursor, native scrolling if `prefers-reduced-motion` is set.
- Smooth scroll `lerp` is clearly visible (page doesn't snap-stop).

---

### Phase 10: Page Transitions & Route Stubs

**Goal:** Create all route pages as stubs and add animated transitions between them.

**Steps:**

1. Create `src/components/layout/page-transition.tsx`:
   - Uses Framer Motion `AnimatePresence` with `mode="wait"`.
   - Enter animation: page content fades in + slides up 20px, duration 0.5s with `ease-out-expo`.
   - Exit animation: page content fades out + slides down 10px, duration 0.3s.
   - A horizontal copper line "wipes" across the top of the page during transition (a thin `div` that scales from `scaleX(0)` to `scaleX(1)` and back).
2. Create `src/app/(routes)/layout.tsx` — a shared layout for the route group that wraps `{children}` in `<PageTransition>`.
3. Create stub pages with placeholder content:
   - `src/app/(routes)/work/page.tsx` — "Work" headline + "Coming Soon" in monospace.
   - `src/app/(routes)/about/page.tsx` — "About" headline + "Coming Soon."
   - `src/app/(routes)/contact/page.tsx` — "Contact" headline + "Coming Soon."
4. Update the root page.tsx — transform it from the design system preview into the actual home page shell:
   - Hero section placeholder (a full-viewport `div` with "FOUNDRY TECH" in `--text-display` serif, dark background).
   - A "Selected Work" section placeholder below it.
   - The design system preview content can be moved to a dev route or removed.
5. Update nav links in `src/lib/constants/navigation.ts` to point to the correct routes.
6. Verify that the shared `(routes)/layout.tsx` wrapping does not conflict with the root layout.

**Verification:**
- Clicking nav links navigates between Home, Work, About, Contact.
- Each transition shows the copper wipe + fade animation.
- Back/forward browser buttons also trigger transitions.
- No layout shift during transitions (header/footer remain stable).
- Each stub page renders its headline correctly.

---

### Phase 11: Hero Section — 3D Scene & Content Overlay

**Goal:** Build the interactive above-the-fold hero with the R3F 3D wireframe and editorial headline.

**Steps:**

1. Create `src/components/three/hero-scene.tsx` (client component, `"use client"`):
   - A `<Canvas>` from `@react-three/fiber` with `camera={{ position: [0, 0, 5], fov: 50 }}`.
   - Renders an `<IcosahedronGeometry>` (or `<TorusKnotGeometry>`) as a wireframe mesh — industrial/architectural feel.
   - The mesh slowly auto-rotates (`useFrame` with `rotation.y += 0.002`).
   - Mouse position influences the mesh rotation: `onPointerMove` maps cursor position to `rotation.x` / `rotation.y` offset via `lerp` for smooth follow.
   - Mesh material: `MeshStandardMaterial` in wireframe mode, color `#B87333` (copper), with emissive glow.
   - Background: transparent (the obsidian page background shows through).
2. Add post-processing in a `<PostEffects />` sub-component:
   - `<Bloom>` — subtle luminance threshold, intensity 0.3.
   - `<ChromaticAberration>` — very subtle offset for the digital-industrial look.
   - Film grain via a custom shader pass or `<Noise>` from drei.
3. Create `src/components/sections/hero-content.tsx`:
   - Absolutely positioned over the canvas.
   - Headline: "We Build What's Next." in `--text-display`, `font-headline`, `text-canvas`.
   - Subheadline: "Mobile / Web / TV / IoT" in `font-mono`, `text-canvas-dim`, with a typewriter reveal animation (characters appear sequentially via Framer Motion `staggerChildren`).
   - CTA button: "See Our Work →" with copper border, transparent background, hover fill animation.
4. Create `src/components/sections/hero.tsx` — composer component combining the canvas and content overlay, `min-h-screen`, with the 3D scene filling the background.
5. Add a scroll indicator at the bottom: a thin vertical copper line (16px) with a looping `translateY` animation.
6. Place `<Hero />` on the home page page.tsx.

**Verification:**
- Hero fills the viewport on load.
- 3D wireframe renders and rotates slowly.
- Moving the mouse influences the wireframe rotation.
- Headline, subheadline, and CTA are readable and properly layered above the 3D scene.
- Typewriter animation plays on the subheadline.
- Scroll indicator pulses at the bottom.
- No console errors from R3F or Three.js.

---

### Phase 12: Hero Scroll Parallax & Performance

**Goal:** Add scroll-linked animations to the hero and optimize 3D rendering.

**Steps:**

1. In src/components/sections/hero.tsx, use Framer Motion's `useScroll` + `useTransform` to:
   - Scale the 3D canvas from `1 → 0.85` as the user scrolls past the hero viewport.
   - Move the headline upward (`translateY: 0 → -80px`) and fade it out (`opacity: 1 → 0`).
   - Move the subheadline in the opposite direction (`translateY: 0 → 40px`) for a "text splitting apart" effect.
   - The scroll indicator fades out immediately (in the first 10% of scroll).
2. Performance optimizations:
   - Wrap the R3F `<Canvas>` in `next/dynamic` with `ssr: false` so it's client-only.
   - Use `frameloop="demand"` when the hero section scrolls out of view (toggle via `IntersectionObserver`).
   - Add a static fallback for SSR: a `<noscript>` or initial render showing just the text hero without the canvas.
   - Respect `prefers-reduced-motion`: disable auto-rotation, disable parallax transforms, show a static gradient background instead of the 3D scene.
3. Add a `Suspense` boundary around the canvas with a loading state (simple copper gradient placeholder).
4. Test GPU usage — ensure the 3D scene doesn't run the GPU at full tilt when off-screen.

**Verification:**
- Scrolling past the hero triggers smooth parallax (text splits, canvas scales down).
- When hero is off-screen, FPS draw calls drop (check via Dev-Mode or browser performance tab).
- Disabling JS still shows a readable hero (static content fallback).
- `prefers-reduced-motion` → no animations, no 3D canvas, gradient background instead.
- Suspense loading state briefly flashes before canvas mounts (or is instant on fast connections).

---

### Phase 13: Work Page — Project Data, Grid & Cards

**Goal:** Build the portfolio showcase with data layer, asymmetric grid, interactive cards, and category filtering.

**Steps:**

1. Define the data schema in `src/types/index.ts`:
   - `Project` interface: `{ id: string; title: string; slug: string; category: "Mobile" | "Web" | "TV" | "IoT"; description: string; thumbnail: string; techStack: string[]; year: number; featured: boolean }`.
2. Create `src/lib/data/projects.ts` — array of 6–8 sample projects across all four categories, with placeholder thumbnail paths (`/images/projects/[slug].jpg` — we'll use solid-color placeholder divs until real images are added).
3. Create `src/components/ui/project-card.tsx`:
   - Displays thumbnail (or colored placeholder), category badge (Safety Orange background, `--text-caption`, `font-mono`, uppercase), title (serif `--text-h3`), year (mono), and tech stack pills.
   - On hover (Framer Motion `whileHover`): card scales to `1.02`, thumbnail shifts subtly via `translateY(-4px)` inside a clipped `overflow-hidden` container, and a copper border fades in.
   - Entire card is an `<a>` link to `/work/[slug]`. Accessible `aria-label`.
4. Create `src/components/sections/project-grid.tsx`:
   - CSS Grid layout using `.grid-architect` with intentional asymmetry: featured projects span 7 columns, regular projects span 5 columns, with alternating offsets (`col-start-1` vs. `col-start-4` on alternating rows).
   - On mobile: single column, all cards same size.
   - Scroll-triggered staggered entrance: each card animates in from `opacity: 0, y: 40` using Framer Motion `useInView` + `staggerChildren: 0.1`.
5. Create `src/components/sections/project-filter.tsx`:
   - Horizontal tab bar: "All", "Mobile", "Web", "TV", "IoT."
   - Tabs in `font-mono`, `--text-small`, uppercase.
   - Active tab has an animated copper underline (Framer Motion `layoutId` for shared element animation).
   - Filtering uses `useState` — when toggled, grid items animate out/in using `AnimatePresence`.
6. Assemble the full Work page in `src/app/(routes)/work/page.tsx`:
   - Section header: "Selected Work" in serif `--text-h1`.
   - `<ProjectFilter />` below the header.
   - `<ProjectGrid />` with filtered projects.
7. Add SEO metadata to the Work page via `export const metadata`.

**Verification:**
- Work page renders the asymmetric project grid.
- Category filter tabs animate the underline indicator.
- Switching categories animates cards in/out smoothly.
- Cards are hoverable with scale + parallax thumbnail effect.
- Grid is responsive (1 col mobile → asymmetric desktop).
- Clicking a card navigates to `/work/[slug]` (404 for now — that's expected).
- Dev-Mode shows grid column boundaries overlaying the project grid.

---

### Phase 14: Case Study Pages, About & Contact

**Goal:** Build the dynamic case study route, the About page with company info, and the Contact page with the styled form.

**Steps:**

1. **Case Study Pages:**
   - Create `src/app/(routes)/work/[slug]/page.tsx` with `generateStaticParams` returning slugs from the projects data.
   - Layout: full-bleed hero area (placeholder image/color based on category), then a two-column asymmetric text layout (cols 1–7 for description, cols 9–12 for metadata sidebar).
   - Metadata sidebar: category, year, tech stack list, "Visit Project →" link (placeholder `#`).
   - Bottom: "Next Project" link with the next project's title, styled as a large full-width CTA band with hover animation.
2. **About Page** (`src/app/(routes)/about/page.tsx`):
   - Opening statement: large serif headline "Building the Digital Future, One Interface at a Time." spanning cols 1–10.
   - Split-panel section: left (cols 1–6) — placeholder illustration/image area; right (cols 7–12) — company philosophy text with staggered line-by-line reveal (Framer Motion `useInView`).
   - Capabilities section: horizontal auto-scrolling ticker (CSS `@keyframes` marquee) listing capabilities: "Mobile Apps", "Responsive Web", "Smart TV", "IoT Platforms", "Design Systems", "API Architecture" — repeated, in `font-mono`, separated by copper dots.
   - Process/Timeline section: 4 steps (Discovery → Design → Build → Launch) displayed as a horizontal flowchart with connecting lines, styled like a blueprint schematic (mono type, copper accent nodes).
3. **Contact Page** (`src/app/(routes)/contact/page.tsx`):
   - Split layout: left (cols 1–5) — "Get In Touch" headline + contact info (email, phone, location in mono type); right (cols 6–12) — form.
   - Form fields: Name, Email, Message. Styled as "data entry terminals":
     - No visible border initially — just a 0.5px bottom border in `grid-line` color.
     - On focus: bottom border transitions to copper, a monospace label slides up above the field.
     - `font-mono` input text, `caret-color: copper`.
   - Submit button: full-width, copper background, obsidian text, hover darkens to `copper-dark`.
   - Form submission: Next.js Server Action that logs to console (no backend yet). Show a success toast/message on submit.
4. Add metadata (`generateMetadata`) to case study, about, and contact pages.

**Verification:**
- `/work/[slug]` renders the correct project data for each slug.
- "Next Project" links cycle through projects.
- About page renders all three sections (statement, philosophy, capabilities ticker, process timeline).
- Ticker scrolls continuously.
- Contact form fields animate on focus (copper underline, floating label).
- Submitting the form shows a success message.
- All pages use the asymmetric grid and are responsive.

---

### Phase 15: Dev-Mode Full Implementation, SEO, Accessibility & Final Polish

**Goal:** Complete Dev-Mode from basic grid overlay to full technical substructure reveal. Then harden SEO, accessibility, and performance for production.

**Steps:**

1. **Dev-Mode Enhancements:**
   - **Component bounding boxes:** When Dev-Mode is on, add a CSS rule `[data-dev-mode="true"] [data-component] { outline: 1px dashed rgba(184,115,51,0.3); position: relative; }` and `::after` pseudo showing the component name. Add `data-component="Header"`, `data-component="ProjectCard"`, etc. to key components.
   - **Performance HUD** (`src/components/ui/performance-hud.tsx`): a fixed bottom-right panel (draggable via Framer Motion `drag`) showing:
     - FPS counter (calculated via `requestAnimationFrame` delta, updated every 500ms).
     - Current route path.
     - Active breakpoint (`sm`/`md`/`lg`/`xl`/`2xl` — detected via `window.matchMedia`).
     - WebGL draw calls (read from `gl.info.render.calls` via R3F's `useThree`).
   - **Glitch transition:** When toggling Dev-Mode, play a 300ms CSS animation: a `clip-path: inset()` jitter + `hue-rotate` + brief static noise overlay, then fade to the overlay state.
   - Persist Dev-Mode preference in `localStorage` (already done in Phase 5 — verify it still works).
2. **SEO:**
   - Update root metadata in layout.tsx: title template `"%s | Foundry Tech"`, base description, Open Graph image (placeholder 1200×630 OG image), Twitter card meta.
   - Create `src/app/sitemap.ts` — auto-generate sitemap from routes + project slugs.
   - Create `src/app/robots.ts` — allow all crawlers.
   - Add `canonical` URLs to each page.
3. **Accessibility:**
   - Audit all interactive elements for keyboard navigability and ARIA attributes.
   - Add `aria-live="polite"` region for page transition announcements.
   - Ensure 3D canvas has `role="img"` and `aria-label` describing the visual.
   - Add skip-to-content link (`<a href="#main-content" className="sr-only focus:not-sr-only">`) at the top of the layout.
   - Verify color contrast: Canvas (`#F2F0E9`) on Obsidian (`#0A0A0A`) = contrast ratio 15.4:1 (AAA ✓). Canvas-dim (`#A8A49C`) on Obsidian = verify ≥ 4.5:1.
   - All images/icons have alt text.
   - `prefers-reduced-motion` fully disables: smooth scroll, parallax, typewriter, staggered reveals, 3D scene, magnetic cursor.
4. **Performance:**
   - Code-split all Three.js components with `next/dynamic({ ssr: false })`.
   - Audit Server Components vs Client Components — keep everything Server Component unless it needs interactivity.
   - Add proper `loading.tsx` files for routes with heavy client components.
   - Configure next.config.ts: security headers (`X-Frame-Options`, `X-Content-Type-Options`, CSP), image optimization settings.
   - Run `bun run build` and verify no errors, bundle size is reasonable.
5. **Final QA:**
   - Responsive check at 320px, 375px, 768px, 1024px, 1280px, 1440px, 1920px, 2560px.
   - Cross-browser: Safari, Chrome, Firefox (visual consistency).
   - Lighthouse audit: target ≥ 90 on all four categories.

**Verification:**
- Dev-Mode: toggling shows component bounding boxes, Performance HUD with live FPS, breakpoint indicator, and glitch transition plays.
- SEO: `view-source` shows correct meta tags, OG image, canonical URLs. `/sitemap.xml` and `/robots.txt` resolve.
- Accessibility: full keyboard navigation works end-to-end (tab through header → content → footer). Skip-to-content link works. Screen reader announces page transitions.
- `bun run build` completes with zero errors.
- Lighthouse: ≥ 90 across Performance, Accessibility, Best Practices, SEO.

---

### Decisions

- **15 phases (not 7)** — each phase is reviewable in ~20 minutes of inspection. No phase has more than 6 files to look at.
- **Tailwind v4 CSS-first config** — all tokens stay in globals.css, no separate config file.
- **Fonts** — Playfair Display (serif), Space Grotesk (body), JetBrains Mono (mono) from Google Fonts. Substitutable for PP Editorial New / Satoshi if you provide `.woff2` files.
- **IoT Schematic** — implemented as animated SVG (Framer Motion), not R3F, to keep bundle lightweight. Lives in the case study pages for IoT projects.
- **Dev-Mode** — CSS-first strategy (`[data-dev-mode]` selectors) + React context for JS-dependent features (HUD, keyboard shortcut).
- **No real backend** — contact form uses a Server Action logging to console. Can be wired to a service (Resend, SendGrid) later.
- **Phases 1–5 are zero-visual-debt** — the entire design system, tokens, grid, typography, and Dev-Mode are locked in before any "real" UI is built. This prevents rework.

---

Ready for your review. Let me know if you want phases split further, reordered, or if any scope needs adjustment. Once approved, we begin Phase 1.