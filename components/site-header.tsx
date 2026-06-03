import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <Link href="/" className="text-lg font-semibold text-slate-950 dark:text-white">
            Tech Blogs
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Engineering ideas and practical lessons for developers.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/" className="transition hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <Link href="/blog" className="transition hover:text-slate-900 dark:hover:text-white">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}
