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
    <div className="min-h-screen bg-obsidian p-8 md:p-16">
      {/* Header */}
      <header className="mb-16">
        <h1 className="font-bold tracking-tight text-canvas">
          Foundry Tech
        </h1>
        <p className="mt-2 text-canvas-dim">
          Phase 3 — Design Tokens + Typography Preview
        </p>
      </header>

      {/* ================================================================= */}
      {/* TYPOGRAPHY                                                         */}
      {/* ================================================================= */}

      {/* Typographic Scale — Headline Font (Playfair Display) */}
      <section className="mb-16">
        <h2 className="mb-8">Headline Font — Playfair Display</h2>
        <div className="flex flex-col gap-6">
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Display — clamp(3rem, 8vw, 7rem)
            </span>
            <p className="font-headline text-[length:var(--text-display)] leading-[1.05] tracking-tight text-canvas">
              We Build What&apos;s Next.
            </p>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              H1 — clamp(2.25rem, 5vw, 4rem)
            </span>
            <h1>The Architect&apos;s Framework</h1>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              H2 — clamp(1.75rem, 3.5vw, 2.5rem)
            </span>
            <h2>Industrial Futurism</h2>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              H3 — clamp(1.25rem, 2.5vw, 1.75rem)
            </span>
            <h3>Dark-Mode First Design</h3>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              H4 — clamp(1.1rem, 1.5vw, 1.25rem)
            </span>
            <h4>Project Case Study</h4>
          </div>
        </div>
      </section>

      {/* Body Font (Space Grotesk) */}
      <section className="mb-16">
        <h2 className="mb-8">Body Font — Space Grotesk</h2>
        <div className="flex flex-col gap-6">
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Body — clamp(1rem, 1.2vw, 1.125rem)
            </span>
            <p className="max-w-2xl text-canvas-dim">
              Foundry Tech specializes in building premier digital experiences
              across Mobile, Web, TV, and IoT platforms. Our design system,
              the Architect&apos;s Framework, blends industrial engineering
              precision with high-end editorial aesthetics.
            </p>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Small — clamp(0.8125rem, 1vw, 0.875rem)
            </span>
            <p className="max-w-2xl text-[length:var(--text-small)] text-canvas-dim">
              Technical specifications and secondary information rendered at
              the small scale. Used for metadata, timestamps, and supporting
              details throughout the interface.
            </p>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Caption — 0.6875rem (fixed)
            </span>
            <p className="text-[length:var(--text-caption)] uppercase tracking-widest text-canvas-dim">
              Labels · Badges · Category Tags · Status Indicators
            </p>
          </div>
        </div>
      </section>

      {/* Monospace Font (JetBrains Mono) */}
      <section className="mb-16">
        <h2 className="mb-8">Mono Font — JetBrains Mono</h2>
        <div className="flex flex-col gap-6">
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Technical Data
            </span>
            <p className="font-mono text-canvas">
              const stack = [&quot;Next.js&quot;, &quot;React 19&quot;, &quot;Three.js&quot;, &quot;Framer Motion&quot;];
            </p>
          </div>
          <div>
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Code Block
            </span>
            <pre><code>{`// The Architect's Framework
export interface Project {
  id: string;
  category: "Mobile" | "Web" | "TV" | "IoT";
  techStack: string[];
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* Font Pairing Comparison */}
      <section className="mb-16">
        <h2 className="mb-8">Font Pairing</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-sm border border-grid-line bg-obsidian-light p-6">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Headline
            </span>
            <p className="mt-2 font-headline text-2xl text-canvas">
              Playfair Display
            </p>
            <p className="mt-1 font-mono text-[length:var(--text-caption)] text-canvas-dim">
              Extended Serif · Display · Editorial
            </p>
          </div>
          <div className="rounded-sm border border-grid-line bg-obsidian-light p-6">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Body
            </span>
            <p className="mt-2 text-2xl text-canvas">
              Space Grotesk
            </p>
            <p className="mt-1 font-mono text-[length:var(--text-caption)] text-canvas-dim">
              Geometric Grotesk · Sans-serif · Clean
            </p>
          </div>
          <div className="rounded-sm border border-grid-line bg-obsidian-light p-6">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-widest text-copper">
              Mono
            </span>
            <p className="mt-2 font-mono text-2xl text-canvas">
              JetBrains Mono
            </p>
            <p className="mt-1 font-mono text-[length:var(--text-caption)] text-canvas-dim">
              Monospace · Technical · Data
            </p>
          </div>
        </div>
      </section>

      <hr className="mb-16" />

      {/* ================================================================= */}
      {/* COLOR PALETTE (from Phase 2)                                       */}
      {/* ================================================================= */}

      <section className="mb-16">
        <h2 className="mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div
                className={`h-20 rounded-sm ${color.className}`}
              />
              <span className={`text-[length:var(--text-small)] ${color.text === "text-obsidian" ? "text-canvas" : "text-canvas-dim"}`}>
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="mb-16">
        <h2 className="mb-6">Spacing Scale (4px base)</h2>
        <div className="flex flex-col gap-3">
          {spacings.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-12 text-right font-mono text-[length:var(--text-small)] text-canvas-dim">
                {n}
              </span>
              <div
                className="h-3 rounded-sm bg-copper"
                style={{ width: `${n * 16}px` }}
              />
              <span className="font-mono text-[length:var(--text-caption)] text-canvas-dim">
                {n * 4}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radii */}
      <section className="mb-16">
        <h2 className="mb-6">Border Radii</h2>
        <div className="flex gap-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <div
                className={`h-16 w-16 border-2 border-copper rounded-${size} bg-obsidian-lighter`}
              />
              <span className="font-mono text-[length:var(--text-small)] text-canvas-dim">{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* UI Accent Test */}
      <section className="mb-16">
        <h2 className="mb-6">Interactive Accents</h2>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-sm border border-copper bg-transparent px-6 py-3 font-mono text-[length:var(--text-small)] text-copper transition-colors hover:bg-copper hover:text-obsidian focus-visible:outline-copper">
            Copper Outline
          </button>
          <button className="rounded-sm bg-copper px-6 py-3 font-mono text-[length:var(--text-small)] text-obsidian transition-colors hover:bg-copper-dark">
            Copper Filled
          </button>
          <button className="rounded-sm bg-safety-orange px-6 py-3 font-mono text-[length:var(--text-small)] text-obsidian transition-colors hover:bg-safety-orange/80">
            Safety Orange
          </button>
        </div>
      </section>

      {/* Selection Test */}
      <section>
        <h2 className="mb-6">Selection Color</h2>
        <p className="max-w-xl text-canvas-dim">
          Select this text to verify the copper selection highlight. The
          selected text should appear with a copper background and obsidian
          text color, matching the Architect&apos;s Framework design system.
        </p>
      </section>
    </div>
  )
}
