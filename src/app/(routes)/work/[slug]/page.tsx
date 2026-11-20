import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PROJECTS } from "@/data/projects"
import { PhoneFrame, RenderFrame, TvFrame } from "@/components/ui/device-frame"
import { MediaGallery } from "@/components/ui/media-gallery"
import { ProjectStage } from "@/components/ui/project-stage"
import { PLATFORM_LABEL } from "@/components/ui/project-tile"
import { StoreBadges } from "@/components/ui/store-badges"
import { projectJsonLd } from "@/lib/seo/json-ld"
import { withBasePath } from "@/lib/utils"
import type { Project, ProjectVideo } from "@/types"

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return { title: "Project not found" }

  const image = withBasePath(project.ogImage ?? project.thumbnail)
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: "article", images: [image] },
    twitter: { card: "summary_large_image", title: project.title, description: project.description, images: [image] },
  }
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

/** A narrative section: label on the left (sticky on desktop), prose on the right. */
function Chapter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <h2 className="eyebrow md:sticky md:top-24 md:col-span-4 md:self-start">{label}</h2>
      <div className="space-y-5 text-lg leading-relaxed text-ink-muted md:col-span-8 [&_strong]:text-ink">
        {children}
      </div>
    </section>
  )
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para) => (
        <p key={para.slice(0, 32)}>{para}</p>
      ))}
    </>
  )
}

/** A captioned clip in its device frame. */
function MotionClip({ video }: { video: ProjectVideo }) {
  const media = { src: video.poster, alt: video.alt ?? video.caption, reel: video }
  return (
    <figure className={video.frame === "phone" ? "mx-auto w-full max-w-[17rem]" : undefined}>
      {video.frame === "tv" ? (
        <TvFrame {...media} />
      ) : video.frame === "phone" ? (
        <PhoneFrame {...media} sizes="(max-width: 640px) 70vw, 272px" />
      ) : (
        <RenderFrame {...media} />
      )}
      <figcaption className="mt-3 text-sm text-ink-muted">{video.caption}</figcaption>
    </figure>
  )
}

/** Landscape clips in a grid, phone clips in a narrow column beside them. */
function MotionGrid({ videos }: { videos: ProjectVideo[] }) {
  const portrait = videos.filter((v) => v.frame === "phone")
  const landscape = videos.filter((v) => v.frame !== "phone")
  const landscapeGrid = (
    <div className={`grid gap-8 ${landscape.length > 1 && portrait.length === 0 ? "sm:grid-cols-2" : ""}`}>
      {landscape.map((video, i) => (
        <div
          key={video.src}
          className={`reveal ${i === 0 && landscape.length > 1 && landscape.length % 2 === 1 && portrait.length === 0 ? "sm:col-span-2" : ""}`}
        >
          <MotionClip video={video} />
        </div>
      ))}
    </div>
  )
  if (portrait.length === 0) return landscapeGrid
  if (landscape.length === 0) {
    return (
      <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-10">
        {portrait.map((video) => (
          <div key={video.src} className="reveal w-full max-w-[17rem]">
            <MotionClip video={video} />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">{landscapeGrid}</div>
      <div className="grid gap-8 lg:w-[17rem] lg:shrink-0">
        {portrait.map((video) => (
          <div key={video.src} className="reveal">
            <MotionClip video={video} />
          </div>
        ))}
      </div>
    </div>
  )
}

function MediaSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10 md:py-14">
      <h2 className="eyebrow mb-8">{label}</h2>
      {children}
    </section>
  )
}

function nextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length] as Project
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const company = project.origin === "Professional"
  const next = nextProject(slug)
  const { links } = project

  const meta = [
    { label: company ? "Company" : "Client", value: project.client },
    { label: company ? "My role" : "Role", value: project.role },
    { label: "Platforms", value: project.platforms.map((p) => PLATFORM_LABEL[p]).join(" · ") },
    { label: company ? "When" : "Year", value: project.period ?? String(project.year) },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }} />

      {/* Header ---------------------------------------------------------- */}
      <header className="shell pt-10 md:pt-16">
        <Link href="/work" className="link-arrow text-sm text-ink-muted">
          <span aria-hidden="true">←</span> All work
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="enter eyebrow">
              {company ? `Company work · ${project.client}` : "Independent work"}
            </p>
            <h1 className="enter mt-4 text-[clamp(2.5rem,6vw,4.75rem)]" style={{ ["--delay" as string]: "60ms" }}>
              {project.title}
            </h1>
            <p className="enter mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl" style={{ ["--delay" as string]: "120ms" }}>
              {project.description}
            </p>
          </div>
          <div className="enter flex flex-col gap-4 lg:col-span-4 lg:items-end" style={{ ["--delay" as string]: "180ms" }}>
            <StoreBadges links={links} />
            {links.liveUrl && (
              <a href={links.liveUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm">
                {links.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <dl className="enter mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:grid-cols-4" style={{ ["--delay" as string]: "220ms" }}>
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Hero media ------------------------------------------------------ */}
      <div className="shell mt-10">
        <ProjectStage project={project} size="hero" eager interactive className="enter rounded-[var(--radius-xl)]" />
        {project.status && (
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
            {project.status}
          </p>
        )}
      </div>

      <div className="shell">
        {/* Metrics ------------------------------------------------------- */}
        {project.metrics && project.metrics.length > 0 && (
          <dl
            className={`mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line ${
              project.metrics.length >= 4 ? "md:grid-cols-4" : project.metrics.length === 3 ? "md:grid-cols-3" : ""
            }`}
          >
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-bg px-5 py-7">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-none tracking-tight">{m.value}</dd>
                <dd className="mt-2 text-sm text-ink-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Narrative ----------------------------------------------------- */}
        <div className="mt-16">
          <Chapter label="Overview">
            <Paragraphs text={project.overview} />
          </Chapter>

          {project.highlights.length > 0 && (
            <Chapter label="At a glance">
              <ul className="grid gap-x-8 gap-y-3 text-base sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-ink">{h}</span>
                  </li>
                ))}
              </ul>
            </Chapter>
          )}

          <Chapter label="The challenge">
            <Paragraphs text={project.challenge} />
          </Chapter>
          <Chapter label={company ? "What I did" : "How I built it"}>
            <Paragraphs text={project.solution} />
          </Chapter>
          <Chapter label="Outcome">
            <Paragraphs text={project.results} />
          </Chapter>

          <Chapter label="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-ink-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </Chapter>
        </div>

        {/* Media --------------------------------------------------------- */}
        {project.videos && project.videos.length > 0 && (
          <MediaSection label="In motion">
            <MotionGrid videos={project.videos} />
          </MediaSection>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <MediaSection label="Screens">
            <MediaGallery images={project.gallery} frame={project.showcase} title={project.title} url={links.liveUrl} />
            {company && (
              <p className="mt-6 text-sm text-ink-faint">
                Screens are from the app&apos;s public store listing. Details here are limited to what&apos;s public.
              </p>
            )}
          </MediaSection>
        )}

        {project.extraGalleries?.map((extra) => (
          <MediaSection key={extra.label} label={extra.label}>
            <MediaGallery images={extra.images} frame={extra.frame} title={`${project.title} ${extra.label}`} />
          </MediaSection>
        ))}

        {project.credits && (
          <section className="border-t border-line py-8 text-xs leading-relaxed text-ink-faint">
            <h2 className="eyebrow mb-3">Credits</h2>
            <div className="max-w-3xl space-y-2">
              {project.credits.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {project.credits.licenses && project.credits.licenses.length > 0 && (
                <p>
                  Sources &amp; licenses:{" "}
                  {project.credits.licenses.map((license, i) => (
                    <span key={license.href}>
                      {i > 0 && " · "}
                      <a href={license.href} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2 hover:text-ink">
                        {license.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Next project -------------------------------------------------- */}
        <section className="border-t border-line pt-10 md:pt-14" aria-label="Next project">
          <Link href={`/work/${next.slug}`} className="group grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <p className="eyebrow">Next project</p>
              <p className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent">
                {next.title} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
              <p className="mt-2 text-ink-muted">{next.tagline}</p>
            </div>
            <div className="overflow-hidden rounded-[var(--radius-xl)] md:col-span-7">
              <ProjectStage project={next} />
            </div>
          </Link>
        </section>
      </div>
    </>
  )
}
