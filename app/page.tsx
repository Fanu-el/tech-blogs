import Link from "next/link"
import { getAllPosts } from "@/lib/markdown"

export const metadata = {
  title: "Home | Tech Blogs",
  description:
    "A modern tech blog that shares engineering ideas, workflows, and practical lessons for developers.",
}

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="space-y-6 rounded-3xl border border-slate-200/70 bg-slate-50 p-10 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/40">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Tech Blog</p>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Engineering insights and practical guides
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300;">
          Sharing ideas about architecture, workflows, performance, and best practices for building modern software.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950"
          >
            Browse blog posts
          </Link>
        </div>
      </section>

      <section className="mt-12 space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Latest posts</h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">
            Fresh articles on engineering topics, from system design to developer workflows and practical optimization.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800/70 dark:bg-slate-950/80"
            >
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <span>{post.publishedAt}</span>
                <span>{post.readingTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-4 block">
                <h3 className="text-2xl font-semibold text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-slate-200">
                  {post.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
