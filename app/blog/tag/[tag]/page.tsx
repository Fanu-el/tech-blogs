import { getPostsByTag, getAllTags } from "@/lib/markdown"
import Link from "next/link"
import { TagList } from "@/components/tag-list"

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag: tag.name }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  return {
    title: `${tag} | Tech Blogs`,
    description: `Articles tagged with ${tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getPostsByTag(tag)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-slate-200/70 bg-slate-50 p-8 dark:border-slate-800/70 dark:bg-slate-950/40">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Filter</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Articles tagged &quot;{tag}&quot;
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Found {posts.length} article{posts.length !== 1 ? "s" : ""}.
            </p>
          </section>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-8 text-center dark:border-slate-800/70 dark:bg-slate-950/40">
              <p className="text-slate-600 dark:text-slate-300">No posts found with this tag yet.</p>
            </div>
          ) : (
            <section className="grid gap-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800/70 dark:bg-slate-950/80"
                >
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    <span>{post.publishedAt}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="mt-4 block">
                    <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                      {post.description}
                    </p>
                  </Link>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((postTag) => (
                      <Link
                        key={postTag}
                        href={`/blog/tag/${postTag}`}
                        className={`rounded-full px-3 py-1 text-xs transition ${
                          postTag === tag
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                      >
                        {postTag}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <TagList selectedTag={tag} />
        </aside>
      </div>
    </main>
  )
}
