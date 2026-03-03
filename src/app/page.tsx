import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export default function Home() {
  const colors = [
    { name: "Obsidian", className: "bg-obsidian border border-canvas/10", text: "text-canvas" },
    { name: "Obsidian Light", className: "bg-obsidian-light", text: "text-canvas" },
    { name: "Obsidian Lighter", className: "bg-obsidian-lighter", text: "text-canvas" },
    { name: "Canvas", className: "bg-canvas", text: "text-obsidian" },
    { name: "Canvas Dim", className: "bg-canvas-dim", text: "text-obsidian" },
    { name: "Copper", className: "bg-copper", text: "text-obsidian" },
    { name: "Copper Light", className: "bg-copper-light", text: "text-obsidian" },
    { name: "Copper Dark", className: "bg-copper-dark", text: "text-canvas" },
    { name: "Safety Orange", className: "bg-safety-orange", text: "text-obsidian" },
  ] as const

  const spacings = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20] as const

  return (
    <div className="min-h-screen bg-obsidian">
      {/* ================================================================= */}
      {/* HEADER                                                             */}
      {/* ================================================================= */}
      <Container as="header" className="pt-8 pb-4 md:pt-16 md:pb-8">
        <div className="col-full">
          <h1 className="font-bold tracking-tight text-canvas">
            Foundry Tech
          </h1>
          <p className="mt-2 text-canvas-dim">
            Phase 4 — Design System Preview (Grid + Typography + Tokens)
          </p>
        </div>
      </Container>

      {/* ================================================================= */}
      {/* 12-COLUMN GRID VISUALIZATION                                       */}
      {/* ================================================================= */}
      <SectionWrapper ariaLabel="Grid system visualization">
        <Container>
          <div className="col-full mb-8">
            <h2>The Architect&apos;s Grid</h2>
            <p className="mt-2 text-canvas-dim">
              12-column responsive grid: 4 cols mobile → 8 cols tablet → 12 cols desktop
            </p>
          </div>

          {/* Visual grid columns */}
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex h-24 items-center justify-center rounded-sm bg-copper/8 font-mono text-[length:var(--text-caption)] text-copper"
            >
              {i + 1}
            </div>
          ))}

          {/* Grid area patterns */}
          <div className="col-full mt-12 mb-6">
            <h3>Grid Area Patterns</h3>
          </div>

          {/* col-wide: 1–8 */}
          <div className="col-wide rounded-sm border border-copper/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              .col-wide — cols 1–8
            </span>
          </div>

          {/* col-offset: 2–10 */}
          <div className="col-offset mt-3 rounded-sm border border-copper/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              .col-offset — cols 2–10
            </span>
          </div>

          {/* col-narrow: 2–7 */}
          <div className="col-narrow mt-3 rounded-sm border border-copper/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              .col-narrow — cols 2–7
            </span>
          </div>

          {/* col-left + col-right (split) */}
          <div className="col-left mt-3 rounded-sm border border-copper/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              .col-left — cols 1–6
            </span>
          </div>
          <div className="col-right mt-3 rounded-sm border border-safety-orange/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-safety-orange">
              .col-right — cols 7–12
            </span>
          </div>

          {/* col-wide + col-sidebar (asymmetric) */}
          <div className="col-wide mt-3 rounded-sm border border-copper/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              .col-wide — content area
            </span>
          </div>
          <div className="col-sidebar mt-3 rounded-sm border border-safety-orange/30 bg-obsidian-light px-4 py-3">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-safety-orange">
              .col-sidebar — cols 9–12
            </span>
          </div>
        </Container>
      </SectionWrapper>

      <Container><hr className="col-full" /></Container>

      {/* ================================================================= */}
      {/* ASYMMETRIC CONTENT LAYOUT DEMO                                     */}
      {/* ================================================================= */}
      <SectionWrapper ariaLabel="Asymmetric layout demo">
        <Container>
          <div className="col-full mb-8">
            <h2>Asymmetric Content Layout</h2>
          </div>

          <div className="col-left">
            <h3 className="mb-4">
              Content flows across the wider left column
            </h3>
            <p className="text-canvas-dim">
              The Architect&apos;s Grid enables editorial-style asymmetric
              layouts. Content occupies the primary 6-column zone while
              metadata and supplementary information sit in the narrower
              right column. This creates the visual tension and rhythm
              characteristic of high-end print design.
            </p>
          </div>

          <aside className="col-right mt-8 lg:mt-0 rounded-sm border-l-2 border-copper pl-6">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Metadata Sidebar
            </span>
            <dl className="mt-4 space-y-3 font-mono text-[length:var(--text-small)]">
              <div>
                <dt className="text-canvas-dim">Category</dt>
                <dd className="text-canvas">Web Application</dd>
              </div>
              <div>
                <dt className="text-canvas-dim">Year</dt>
                <dd className="text-canvas">2026</dd>
              </div>
              <div>
                <dt className="text-canvas-dim">Stack</dt>
                <dd className="text-canvas">Next.js, Three.js, Tailwind</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </SectionWrapper>

      <Container><hr className="col-full" /></Container>

      {/* ================================================================= */}
      {/* TYPOGRAPHY (from Phase 3)                                          */}
      {/* ================================================================= */}
      <SectionWrapper ariaLabel="Typography system">
        <Container>
          <div className="col-full mb-8">
            <h2>Typography System</h2>
          </div>

          {/* Headline scale */}
          <div className="col-full flex flex-col gap-6 mb-12">
            <div>
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
                Display
              </span>
              <p className="font-headline text-[length:var(--text-display)] leading-[1.05] tracking-tight text-canvas">
                We Build What&apos;s Next.
              </p>
            </div>
            <div>
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">H1</span>
              <h1>The Architect&apos;s Framework</h1>
            </div>
            <div>
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">H2</span>
              <h2>Industrial Futurism</h2>
            </div>
            <div>
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">H3</span>
              <h3>Dark-Mode First Design</h3>
            </div>
            <div>
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">H4</span>
              <h4>Project Case Study</h4>
            </div>
          </div>

          {/* Font pairing cards */}
          <div className="col-full grid gap-6 md:grid-cols-3">
            <div className="rounded-sm border border-grid-line bg-obsidian-light p-6">
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">Headline</span>
              <p className="mt-2 font-headline text-2xl text-canvas">Playfair Display</p>
              <p className="mt-1 font-mono text-[length:var(--text-caption)] text-canvas-dim">Extended Serif · Display · Editorial</p>
            </div>
            <div className="rounded-sm border border-grid-line bg-obsidian-light p-6">
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">Body</span>
              <p className="mt-2 text-2xl text-canvas">Space Grotesk</p>
              <p className="mt-1 font-mono text-[length:var(--text-caption)] text-canvas-dim">Geometric Grotesk · Sans · Clean</p>
            </div>
            <div className="rounded-sm border border-grid-line bg-obsidian-light p-6">
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">Mono</span>
              <p className="mt-2 font-mono text-2xl text-canvas">JetBrains Mono</p>
              <p className="mt-1 font-mono text-[length:var(--text-caption)] text-canvas-dim">Monospace · Technical · Data</p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <Container><hr className="col-full" /></Container>

      {/* ================================================================= */}
      {/* COLORS & TOKENS (from Phase 2)                                     */}
      {/* ================================================================= */}
      <SectionWrapper ariaLabel="Design tokens">
        <Container>
          <div className="col-full mb-8">
            <h2>Color Palette</h2>
          </div>
          <div className="col-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {colors.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div className={`h-20 rounded-sm ${color.className}`} />
                <span className={`text-[length:var(--text-small)] ${color.text === "text-obsidian" ? "text-canvas" : "text-canvas-dim"}`}>
                  {color.name}
                </span>
              </div>
            ))}
          </div>

          <div className="col-full mt-12 mb-8">
            <h2>Spacing Scale</h2>
          </div>
          <div className="col-wide flex flex-col gap-3">
            {spacings.map((n) => (
              <div key={n} className="flex items-center gap-4">
                <span className="w-12 text-right font-mono text-[length:var(--text-small)] text-canvas-dim">{n}</span>
                <div className="h-3 rounded-sm bg-copper" style={{ width: `${n * 16}px` }} />
                <span className="font-mono text-[length:var(--text-caption)] text-canvas-dim">{n * 4}px</span>
              </div>
            ))}
          </div>

          <div className="col-full mt-12 mb-8">
            <h2>Interactive Accents</h2>
          </div>
          <div className="col-full flex flex-wrap gap-4">
            <button className="rounded-sm border border-copper bg-transparent px-6 py-3 font-mono text-[length:var(--text-small)] text-copper transition-colors hover:bg-copper hover:text-obsidian">
              Copper Outline
            </button>
            <button className="rounded-sm bg-copper px-6 py-3 font-mono text-[length:var(--text-small)] text-obsidian transition-colors hover:bg-copper-dark">
              Copper Filled
            </button>
            <button className="rounded-sm bg-safety-orange px-6 py-3 font-mono text-[length:var(--text-small)] text-obsidian transition-colors hover:bg-safety-orange/80">
              Safety Orange
            </button>
          </div>
        </Container>
      </SectionWrapper>

      {/* Dev-Mode Hint */}
      <Container as="footer" className="pb-12">
        <div className="col-full flex items-center gap-2 rounded-sm border border-grid-line bg-obsidian-light px-4 py-3">
          <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
            Dev-Mode
          </span>
          <span className="font-mono text-[length:var(--text-small)] text-canvas-dim">
            Press{" "}
            <kbd className="rounded-sm border border-canvas-dim/20 bg-obsidian-lighter px-1.5 py-0.5 font-mono text-[length:var(--text-caption)] text-canvas">⌘</kbd>
            {" + "}
            <kbd className="rounded-sm border border-canvas-dim/20 bg-obsidian-lighter px-1.5 py-0.5 font-mono text-[length:var(--text-caption)] text-canvas">⇧</kbd>
            {" + "}
            <kbd className="rounded-sm border border-canvas-dim/20 bg-obsidian-lighter px-1.5 py-0.5 font-mono text-[length:var(--text-caption)] text-canvas">D</kbd>
            {" "} to toggle the grid overlay.
          </span>
        </div>
      </Container>
    </div>
  )
}
