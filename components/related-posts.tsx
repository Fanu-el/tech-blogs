import Link from "next/link"
import { getRelatedPosts } from "@/lib/markdown"

interface RelatedPostsProps {
  slug: string
}

export function RelatedPosts({ slug }: RelatedPostsProps) {
  const related = getRelatedPosts(slug, 3)

  if (related.length === 0) return null

  return (
    <aside className="space-y-4 rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800/70 dark:bg-slate-950/40">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Related articles</h3>
      <div className="space-y-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <h4 className="font-medium text-slate-900 group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
              {post.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {post.publishedAt}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  )
}
