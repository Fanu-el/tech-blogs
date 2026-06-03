import Link from "next/link"
import { getAllTags } from "@/lib/markdown"

interface TagsProps {
  selectedTag?: string
}

export function TagList({ selectedTag }: TagsProps) {
  const tags = getAllTags()

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Filter by tag</h3>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            !selectedTag
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
              : "border border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:text-slate-300"
          }`}
        >
          All posts
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/blog/tag/${tag.name}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              selectedTag === tag.name
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                : "border border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:text-slate-300"
            }`}
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </div>
  )
}
