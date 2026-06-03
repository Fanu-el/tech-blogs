import { getAllPosts } from "@/lib/markdown"
import { TagList } from "@/components/tag-list"
import { BlogSearchList } from "@/components/blog-search-list"

export const metadata = {
  title: "Blog | Tech Blogs",
  description:
    "Explore practical tech articles on architecture, content, performance, and developer workflows.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-slate-200/70 bg-slate-50 p-8 dark:border-slate-800/70 dark:bg-slate-950/40">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Blog</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Articles on software and development
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Browse practical guides on architecture, writing, performance, and development best practices.
            </p>
          </section>

          <BlogSearchList posts={posts} />
        </div>

        <aside className="space-y-6">
          <TagList />
        </aside>
      </div>
    </main>
  )
}

