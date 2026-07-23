# Graph Report - .  (2026-07-22)

## Corpus Check
- 68 files · ~124,464 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 284 nodes · 445 edges · 21 communities (15 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Home & About Content
- Work Gallery & Project Pages
- Navigation & Mobile Menu
- Layout Providers & Footer
- Root Layout & SEO Metadata
- TypeScript Compiler Config
- Lint & Type Dependencies
- Runtime Dependencies
- Package Scripts
- Three.js Foundry Scene
- GitHub Pages Deployment
- tsconfig Path Includes
- ESLint Config
- Next.js Config
- PostCSS Config
- Company URL Flow
- Custom Domain CNAME
- Geist Font

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 22 edges
2. `COMPANY` - 16 edges
3. `PROJECTS` - 9 edges
4. `scripts` - 8 edges
5. `Container()` - 8 edges
6. `SectionWrapper()` - 8 edges
7. `ScrollReveal()` - 7 edges
8. `include` - 7 edges
9. `useDevMode()` - 6 edges
10. `NavItem` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Vercel Deployment (README default)` --semantically_similar_to--> `GitHub Pages Deployment Target`  [INFERRED] [semantically similar]
  README.md → DEPLOYMENT.md
- `useLenis()` --references--> `lenis`  [EXTRACTED]
  src/hooks/use-lenis.ts → package.json
- `build job` --references--> `prebuild script (typecheck + lint)`  [INFERRED]
  .github/workflows/deploy.yml → DEPLOYMENT.md
- `build job` --references--> `Static Export (next.config.ts output: export)`  [INFERRED]
  .github/workflows/deploy.yml → DEPLOYMENT.md
- `Next.js Project (create-next-app)` --conceptually_related_to--> `Static Export (next.config.ts output: export)`  [INFERRED]
  README.md → DEPLOYMENT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **GitHub Pages Static Deployment Pipeline** — github_workflows_deploy_workflow, github_workflows_deploy_build_job, github_workflows_deploy_deploy_job, deployment_static_export, deployment_nojekyll, deployment_github_pages_target [INFERRED 0.85]

## Communities (21 total, 6 thin omitted)

### Community 0 - "Home & About Content"
Cohesion: 0.08
Nodes (25): metadata, SERVICES, STATS, CAPABILITIES, metadata, PHILOSOPHY, PROCESS, CONTACT_INFO (+17 more)

### Community 1 - "Work Gallery & Project Pages"
Cohesion: 0.10
Nodes (24): AboutPage(), generateMetadata(), getAdjacentProjects(), PageProps, ProjectDetailPage(), WorkGallery(), CategoryFilter(), CategoryFilterProps (+16 more)

### Community 2 - "Navigation & Mobile Menu"
Cohesion: 0.10
Nodes (20): NAV_ITEMS, itemVariants, menuVariants, MobileNav(), MobileNavProps, NAV_ITEMS, overlayVariants, CursorVariant (+12 more)

### Community 3 - "Layout Providers & Footer"
Cohesion: 0.13
Nodes (16): Providers(), ProvidersProps, Footer(), NAV_ITEMS, Header(), BREAKPOINTS, DevInfoPanel(), getBreakpointVisibilityClass() (+8 more)

### Community 4 - "Root Layout & SEO Metadata"
Cohesion: 0.12
Nodes (15): jetbrainsMono, metadata, playfair, RootLayout(), spaceGrotesk, containerVariants, HeroCanvas, HeroSection() (+7 more)

### Community 5 - "TypeScript Compiler Config"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, exactOptionalPropertyTypes, forceConsistentCasingInFileNames (+17 more)

### Community 6 - "Lint & Type Dependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+11 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): framer-motion, lenis, next, dependencies, framer-motion, lenis, next, react (+11 more)

### Community 8 - "Package Scripts"
Cohesion: 0.14
Nodes (15): ignoreScripts, name, private, scripts, build, check, dev, lint (+7 more)

### Community 9 - "Three.js Foundry Scene"
Cohesion: 0.19
Nodes (3): FoundryScene(), PARTICLE_POSITIONS, HeroCanvas()

### Community 10 - "GitHub Pages Deployment"
Cohesion: 0.24
Nodes (10): basePath Subpath Configuration, GitHub Pages Deployment Target, .nojekyll File, prebuild script (typecheck + lint), Static Export (next.config.ts output: export), build job, deploy job, Deploy to GitHub Pages Workflow (+2 more)

### Community 11 - "tsconfig Path Includes"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

## Knowledge Gaps
- **114 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+109 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `useLenis()` connect `Layout Providers & Footer` to `Runtime Dependencies`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `lenis` connect `Runtime Dependencies` to `Layout Providers & Footer`?**
  _High betweenness centrality (0.211) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home & About Content` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Work Gallery & Project Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.10160427807486631 - nodes in this community are weakly interconnected._
- **Should `Navigation & Mobile Menu` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._