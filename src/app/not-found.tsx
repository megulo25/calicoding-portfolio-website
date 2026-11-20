import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
}

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60dvh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
        This page <span className="serif-accent">wandered off</span>.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">It doesn&apos;t exist or has moved. The work is still here, though.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/work" className="btn btn-primary">
          See the work
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </section>
  )
}
