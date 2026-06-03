import fs from "fs"
import path from "path"

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  excerpt: string
  author: string
  publishedAt: string
  updatedAt?: string
  readingTime: string
  tags: string[]
  relatedSlugs?: string[]
}

export interface BlogPost extends BlogPostMeta {
  content: string
  toc: Array<{ level: number; title: string; id: string }>
}

function parseFrontmatter(content: string): { meta: Record<string, unknown>; content: string } {
  // Normalize line endings (CRLF -> LF)
  const normalized = content.replace(/\r\n/g, "\n")
  
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = normalized.match(frontmatterRegex)

  if (!match) {
    return { meta: {}, content }
  }

  const frontmatterText = match[1]
  const bodyText = match[2]

  const meta: Record<string, unknown> = {}
  const lines = frontmatterText.split("\n")

  for (const line of lines) {
    if (!line.trim()) continue

    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) continue

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    // Parse arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1)
      meta[key] = value.split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""))
    } else if (value.toLowerCase() === "true") {
      meta[key] = true
    } else if (value.toLowerCase() === "false") {
      meta[key] = false
    } else {
      meta[key] = value.replace(/^["']|["']$/g, "")
    }
  }

  return { meta, content: bodyText }
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

function generateTableOfContents(content: string): Array<{ level: number; title: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: Array<{ level: number; title: string; id: string }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2]
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    if (level > 1) {
      toc.push({ level, title, id })
    }
  }

  return toc
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const postPath = path.join(process.cwd(), "posts", `${slug}.md`)
    const fileContent = fs.readFileSync(postPath, "utf-8")
    const { meta, content } = parseFrontmatter(fileContent)

    const readingTime = estimateReadingTime(content)
    const toc = generateTableOfContents(content)

    return {
      slug,
      title: (meta.title as string) || "",
      description: (meta.description as string) || "",
      excerpt: (meta.excerpt as string) || (meta.description as string) || "",
      author: (meta.author as string) || "Fanuel Amare",
      publishedAt: (meta.publishedAt as string) || new Date().toISOString().split("T")[0],
      updatedAt: (meta.updatedAt as string) || undefined,
      readingTime,
      tags: (meta.tags as string[]) || [],
      relatedSlugs: (meta.relatedSlugs as string[]) || [],
      content,
      toc,
    }
  } catch {
    return null
  }
}

export function getAllPosts(): BlogPost[] {
  try {
    const postsDir = path.join(process.cwd(), "posts")
    const files = fs.readdirSync(postsDir)

    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(".md", "")
        return getPostBySlug(slug)
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch {
    return []
  }
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getAllTags(): Array<{ name: string; count: number }> {
  const tagCounts = new Map<string, number>()

  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  const allPosts = getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, limit)

  return related.length > 0 ? related : allPosts.filter((p) => p.slug !== slug).slice(0, limit)
}
