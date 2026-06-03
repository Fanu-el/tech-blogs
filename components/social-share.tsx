"use client"

interface SocialShareProps {
  title: string
  url: string
}

export function SocialShare({ title, url }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  }

  return (
    <div className="space-y-3 rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800/70 dark:bg-slate-950/40">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">Share this post</p>
      <div className="flex gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          Twitter
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          LinkedIn
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          Facebook
        </a>
      </div>
    </div>
  )
}
