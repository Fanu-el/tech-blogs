"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import type { BlogPost } from "@/lib/markdown"

interface BlogSearchListProps {
  posts: BlogPost[]
}

export function BlogSearchList({ posts }: BlogSearchListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search articles by title, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-10 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500 dark:focus:border-slate-600 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Blog Listing */}
      <section className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
            <Search className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-500" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No articles found</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              We couldn't find any articles matching "{searchQuery}". Try a different keyword or reset.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
