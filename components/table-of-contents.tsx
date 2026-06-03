"use client"

interface TableOfContentsProps {
  items: Array<{ level: number; title: string; id: string }>
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <aside className="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800/70 dark:bg-slate-950/40">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">On this page</h3>
      <nav className="space-y-2 text-sm">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  )
}
