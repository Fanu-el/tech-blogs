import Link from "next/link"
import Script from "next/script"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { use } from "react"
import { getPostBySlug, getPostSlugs } from "@/lib/markdown"
import { TableOfContents } from "@/components/table-of-contents"
import { RelatedPosts } from "@/components/related-posts"
import { SocialShare } from "@/components/social-share"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { parseInlineMarkdown } from "@/components/markdown-inline"

type BlogPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post not found | Tech Blogs",
    }
  }

  const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://your-domain.com")

  return {
    title: `${post.title} | Tech Blogs`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: new URL(`/blog/${post.slug}`, baseUrl),
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = use(params)
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://your-domain.com"

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt,
    url: `${siteUrl}/blog/${post.slug}`,
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Script id={`blog-post-jsonld-${post.slug}`} type="application/ld+json">
        {JSON.stringify(jsonLdSchema)}
      </Script>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <article className="space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                <span>Blog</span>
                <span>{post.publishedAt}</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </header>

            <section className="prose prose-slate max-w-none dark:prose-invert space-y-6 text-base leading-8 text-slate-700 dark:text-slate-300">
              {post.content.split("\n").map((line, index) => {
                if (line.startsWith("# ")) {
                  const title = line.replace("# ", "")
                  const id = title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h2 key={index} id={id} className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
                      {parseInlineMarkdown(title)}
                    </h2>
                  )
                }
                if (line.startsWith("## ")) {
                  const title = line.replace("## ", "")
                  const id = title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h3 key={index} id={id} className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">
                      {parseInlineMarkdown(title)}
                    </h3>
                  )
                }
                if (line.startsWith("### ")) {
                  const title = line.replace("### ", "")
                  const id = title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h4 key={index} id={id} className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
                      {parseInlineMarkdown(title)}
                    </h4>
                  )
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={index} className="list-disc list-inside">
                      {parseInlineMarkdown(line.replace("- ", ""))}
                    </li>
                  )
                }
                if (line.startsWith("```")) {
                  return null
                }
                if (line.startsWith(">")) {
                  return (
                    <blockquote key={index} className="border-l-4 border-slate-300 pl-4 italic text-slate-600 dark:border-slate-700 dark:text-slate-400">
                      {parseInlineMarkdown(line.replace("> ", ""))}
                    </blockquote>
                  )
                }
                if (line.startsWith("**") && line.endsWith("**")) {
                  return (
                    <p key={index} className="font-semibold">
                      {parseInlineMarkdown(line.replace(/\*\*/g, ""))}
                    </p>
                  )
                }
                if (line.trim()) {
                  return (
                    <p key={index}>{parseInlineMarkdown(line)}</p>
                  )
                }
                return null
              })}
            </section>

            <footer className="border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
              <p>Written by {post.author}</p>
              {post.updatedAt && <p>Updated on {post.updatedAt}</p>}
            </footer>

            <div className="pt-4">
              <Link
                href="/blog"
                className="text-sm font-medium text-slate-700 underline decoration-slate-300 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                ← Back to blog listing
              </Link>
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          {post.toc.length > 0 && <TableOfContents items={post.toc} />}
          <SocialShare title={post.title} url={`${siteUrl}/blog/${post.slug}`} />
          <RelatedPosts slug={post.slug} />
          <NewsletterSignup />
        </aside>
      </div>
    </main>
  )
}
