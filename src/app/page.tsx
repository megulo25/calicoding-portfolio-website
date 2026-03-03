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
  ] as const;

  const spacings = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20] as const;

  return (
    <div className="min-h-screen bg-obsidian p-8 md:p-16">
      {/* Header */}
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-canvas">
          Foundry Tech
        </h1>
        <p className="mt-2 text-canvas-dim">
          Phase 2 — Design Tokens Preview
        </p>
      </header>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-canvas">
          Color Palette
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div
                className={`h-20 rounded-sm ${color.className}`}
              />
              <span className={`text-sm ${color.text === "text-obsidian" ? "text-canvas" : "text-canvas-dim"}`}>
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-canvas">
          Spacing Scale (4px base)
        </h2>
        <div className="flex flex-col gap-3">
          {spacings.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-12 text-right font-mono text-sm text-canvas-dim">
                {n}
              </span>
              <div
                className={`h-3 rounded-sm bg-copper`}
                style={{ width: `${n * 16}px` }}
              />
              <span className="font-mono text-xs text-canvas-dim">
                {n * 4}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radii */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-canvas">
          Border Radii
        </h2>
        <div className="flex gap-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <div
                className={`h-16 w-16 border-2 border-copper rounded-${size} bg-obsidian-lighter`}
              />
              <span className="font-mono text-sm text-canvas-dim">{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* UI Accent Test */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-canvas">
          Interactive Accents
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-sm border border-copper bg-transparent px-6 py-3 font-mono text-sm text-copper transition-colors hover:bg-copper hover:text-obsidian focus-visible:outline-copper">
            Copper Outline
          </button>
          <button className="rounded-sm bg-copper px-6 py-3 font-mono text-sm text-obsidian transition-colors hover:bg-copper-dark">
            Copper Filled
          </button>
          <button className="rounded-sm bg-safety-orange px-6 py-3 font-mono text-sm text-obsidian transition-colors hover:bg-safety-orange/80">
            Safety Orange
          </button>
        </div>
      </section>

      {/* Selection Test */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-canvas">
          Selection Color
        </h2>
        <p className="max-w-xl text-canvas-dim">
          Select this text to verify the copper selection highlight. The
          selected text should appear with a copper background and obsidian
          text color, matching the Architect&apos;s Framework design system.
        </p>
      </section>
    </div>
  )
}
