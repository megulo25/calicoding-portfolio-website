import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { COMPANY } from "@/data/company"
import { PROJECTS } from "@/data/projects"
import { Container } from "@/components/ui/container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { BrowserFrame, PhoneFrame, TvFrame } from "@/components/ui/device-frame"
import type { Project } from "@/types"
import { PLATFORM_GRADIENTS } from "@/lib/constants"

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return { title: `Project Not Found | ${COMPANY.name}` }
  }

  return {
    title: `${project.title} — ${COMPANY.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${COMPANY.name}`,
      description: project.description,
      type: "article",
    },
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Primary call-to-action links shown in the hero, most important first. */
function getCtas(project: Project) {
  const { links } = project
  return [
    links.liveUrl && { label: "Visit Live Site", href: links.liveUrl },
    links.iosAppStore && { label: "App Store", href: links.iosAppStore },
    links.googlePlay && { label: "Google Play", href: links.googlePlay },
    links.amazonAppStore && { label: "Amazon Appstore", href: links.amazonAppStore },
    links.rokuChannelStore && { label: "Roku Channel Store", href: links.rokuChannelStore },
    links.repoUrl && { label: "Source Code", href: links.repoUrl },
  ].filter((cta): cta is { label: string; href: string } => Boolean(cta))
}

/** Framed hero visual: a fan of phones, or a browser window. */
function HeroShowcase({ project }: { project: Project }) {
  if (!project.thumbnail) return <div className="aspect-[16/9]" />

  if (project.showcase === "browser") {
    return (
      <BrowserFrame
        src={project.thumbnail}
        alt={project.title}
        url={project.links.liveUrl}
        eager
        className="mx-auto max-w-5xl translate-y-px rounded-b-none border-b-0"
      />
    )
  }

  if (project.showcase === "tv") {
    return <TvFrame src={project.thumbnail} alt={project.title} eager className="mx-auto max-w-5xl" />
  }

  const screens = [
    project.thumbnail,
    ...(project.gallery ?? []).filter((src) => src !== project.thumbnail),
  ].slice(0, 3)
  // Put the thumbnail in the middle of the fan.
  const [first, second, third] = screens
  const ordered = first && second && third ? [second, first, third] : screens

  return (
    <div className="mx-auto flex h-[22rem] max-w-4xl items-start justify-center gap-4 overflow-hidden sm:h-[28rem] sm:gap-8 md:h-[34rem]">
      {ordered.map((src, i) => {
        const isCenter = ordered.length === 1 || i === 1
        return (
          <PhoneFrame
            key={src}
            src={src}
            alt={isCenter ? project.title : ""}
            eager
            className={
              isCenter
                ? "z-10 w-[46%] sm:w-[32%] md:w-[26%]"
                : "mt-12 hidden w-[24%] opacity-70 sm:block md:w-[21%]"
            }
          />
        )
      })}
    </div>
  )
}

/** Get previous and next projects for navigation. */
function getAdjacentProjects(currentSlug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug)
  return {
    prev: index > 0 ? PROJECTS[index - 1] : null,
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null,
  }
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)
  const primaryPlatform = project.platforms[0] ?? "Web"
  const ctas = getCtas(project)

  return (
    <>
      {/* Hero */}
      <SectionWrapper id="project-hero" className="py-24 md:py-32">
        <Container>
          {/* Back link */}
          <ScrollReveal className="col-full mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-canvas-dim transition-colors duration-300 hover:text-copper"
              data-cursor="hover"
            >
              <span aria-hidden="true">←</span>
              Back to Work
            </Link>
          </ScrollReveal>

          {/* Platform + Year badges */}
          <ScrollReveal className="col-full mb-4" delay={0.05}>
            <div className="flex items-center gap-3">
              {project.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-copper/30 bg-obsidian/80 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-copper"
                >
                  {platform}
                </span>
              ))}
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-canvas-dim">
                {project.year}
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal className="col-span-full lg:col-span-8" delay={0.1}>
            <h1 className="max-w-3xl font-bold">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-canvas-dim">
              {project.description}
            </p>
            {project.status && (
              <div className="mt-6 flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-copper">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                {project.status}
              </div>
            )}
            {ctas.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {ctas.map((cta, i) => (
                  <a
                    key={cta.href}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.15em] transition-colors duration-300 ${i === 0
                      ? "bg-copper text-obsidian hover:bg-copper-light"
                      : "border border-canvas/15 text-canvas hover:border-copper hover:text-copper"
                      }`}
                  >
                    {cta.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </ScrollReveal>

          {/* Tech stack pills */}
          <ScrollReveal className="col-full mt-8" delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-canvas/10 bg-obsidian-light px-4 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-canvas-dim"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Hero image / gradient */}
      <SectionWrapper id="project-image" className="pb-16 md:pb-24">
        <Container>
          <ScrollReveal className="col-full">
            <div
              className={`relative w-full overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br px-6 pt-12 sm:px-12 md:pt-16 ${PLATFORM_GRADIENTS[primaryPlatform]}`}
            >
              <HeroShowcase project={project} />
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Overview + Project info sidebar */}
      <SectionWrapper id="project-overview" className="pb-24 md:pb-32">
        <Container>
          {/* Overview text */}
          <ScrollReveal className="col-span-full lg:col-span-7">
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
              Overview
            </p>
            <div className="space-y-4 text-base leading-relaxed text-canvas-dim">
              {project.overview.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* Project info sidebar */}
          <ScrollReveal
            className="col-span-full mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0"
            delay={0.15}
            direction="right"
          >
            <div className="flex flex-col gap-6 rounded-[var(--radius-md)] border border-canvas/6 bg-obsidian-light p-6">
              <dl className="flex flex-col gap-6">
              {project.client && (
                <div>
                  <dt className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim">
                    Client
                  </dt>
                  <dd className="text-sm font-medium">{project.client}</dd>
                </div>
              )}
              {project.role && (
                <div>
                  <dt className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim">
                    Our Role
                  </dt>
                  <dd className="text-sm font-medium">{project.role}</dd>
                </div>
              )}
              <div>
                <dt className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim">
                  Platforms
                </dt>
                <dd className="text-sm font-medium">
                  {project.platforms.join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim">
                  Year
                </dt>
                <dd className="text-sm font-medium">{project.year}</dd>
              </div>

              </dl>

              {/* External links */}
              {(project.links.liveUrl ||
                project.links.repoUrl ||
                project.links.iosAppStore ||
                project.links.googlePlay ||
                project.links.amazonAppStore ||
                project.links.rokuChannelStore) && (
                  <div className="flex flex-col gap-3 border-t border-canvas/6 pt-6">
                    {project.links.liveUrl && (
                      <a
                        href={project.links.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-copper transition-colors duration-300 hover:text-copper-light"
                      >
                        Visit Live Site <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.links.iosAppStore && (
                      <a
                        href={project.links.iosAppStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-copper transition-colors duration-300 hover:text-copper-light"
                      >
                        App Store (iOS) <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.links.googlePlay && (
                      <a
                        href={project.links.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-copper transition-colors duration-300 hover:text-copper-light"
                      >
                        Google Play <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.links.amazonAppStore && (
                      <a
                        href={project.links.amazonAppStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-copper transition-colors duration-300 hover:text-copper-light"
                      >
                        Amazon Appstore <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.links.rokuChannelStore && (
                      <a
                        href={project.links.rokuChannelStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-copper transition-colors duration-300 hover:text-copper-light"
                      >
                        Roku Channel Store <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.links.repoUrl && (
                      <a
                        href={project.links.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-copper transition-colors duration-300 hover:text-copper-light"
                      >
                        View Repository <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <SectionWrapper id="project-highlights" className="pb-24 md:pb-32">
          <Container>
            <ScrollReveal className="col-full mb-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                Key Features
              </p>
            </ScrollReveal>
            <ul className="col-full grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-canvas/6 bg-canvas/6 sm:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((item, i) => (
                <li key={item} className="flex gap-4 bg-obsidian-light p-6">
                  <span className="font-mono text-[0.6875rem] text-copper/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-canvas">{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </SectionWrapper>
      )}

      {/* Challenge / Solution / Results */}
      <SectionWrapper id="project-narrative" className="pb-24 md:pb-32">
        <Container>
          <div className="col-full grid gap-12 md:grid-cols-3 md:gap-8">
            {/* Challenge */}
            <ScrollReveal delay={0.05}>
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                  Challenge
                </p>
                <p className="text-sm leading-relaxed text-canvas-dim">
                  {project.challenge}
                </p>
              </div>
            </ScrollReveal>

            {/* Solution */}
            <ScrollReveal delay={0.15}>
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                  Solution
                </p>
                <p className="text-sm leading-relaxed text-canvas-dim">
                  {project.solution}
                </p>
              </div>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal delay={0.25}>
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                  Results
                </p>
                <p className="text-sm leading-relaxed text-canvas-dim">
                  {project.results}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* Gallery — only shown when gallery images exist */}
      {project.gallery && project.gallery.length > 0 && (
        <SectionWrapper id="project-gallery" className="pb-24 md:pb-32">
          <Container>
            <ScrollReveal className="col-full mb-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                Gallery
              </p>
            </ScrollReveal>
            {project.showcase === "phone" ? (
              <div className="col-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {project.gallery.map((src, i) => (
                  <ScrollReveal key={src} delay={0.05 + i * 0.06}>
                    <PhoneFrame src={src} alt={`${project.title} screen ${i + 1}`} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="col-full grid gap-6 sm:grid-cols-2">
                {project.gallery.map((src, i) => (
                  <ScrollReveal key={src} delay={0.1 + i * 0.08} className={i === 0 ? "sm:col-span-2" : ""}>
                    {project.showcase === "tv" ? (
                      <TvFrame src={src} alt={`${project.title} screen ${i + 1}`} />
                    ) : (
                      <BrowserFrame src={src} alt={`${project.title} screenshot ${i + 1}`} url={project.links.liveUrl} />
                    )}
                  </ScrollReveal>
                ))}
              </div>
            )}
          </Container>
        </SectionWrapper>
      )}

      {/* Prev / Next navigation */}
      <SectionWrapper id="project-nav" className="pb-24 md:pb-32">
        <Container>
          <div className="col-full">
            <div className="flex items-stretch justify-between gap-4 border-t border-canvas/6 pt-8">
              {/* Previous */}
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  className="group flex flex-col"
                  data-cursor="hover"
                >
                  <span className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim">
                    ← Previous
                  </span>
                  <span className="text-sm font-semibold transition-colors duration-300 group-hover:text-copper">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="group flex flex-col items-end text-right"
                  data-cursor="hover"
                >
                  <span className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-canvas-dim">
                    Next →
                  </span>
                  <span className="text-sm font-semibold transition-colors duration-300 group-hover:text-copper">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
