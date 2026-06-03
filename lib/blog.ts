export type BlogPost = {
  slug: string
  aliases?: string[]
  title: string
  description: string
  excerpt: string
  publishedAt: string
  author: string
  readingTime: string
  tags: string[]
  content: string[]
}

const posts: BlogPost[] = [
  {
    slug: "architecture",
    aliases: ["nextjs-app-router", "system-design"],
    title: "How to Design Scalable Architecture",
    description:
      "Explore the principles of scalable architecture for modern software systems.",
    excerpt:
      "Explore the principles of scalable architecture for modern software systems.",
    publishedAt: "2026-06-03",
    author: "Fanuel Amare",
    readingTime: "6 min read",
    tags: ["architecture", "scalability", "systems"],
    content: [
      "A reliable tech blog needs strong architecture thinking to support growth and maintainability.",
      "Scalable systems are built with clear boundaries, observable behavior, and thoughtful failure handling.",
      "This article covers core design patterns that help teams keep their platforms resilient over time."
    ],
  },
  {
    slug: "readability",
    aliases: ["content-design"],
    title: "Writing Readable Tech Content",
    description:
      "Best practices for writing blog content that is easy to scan, understand, and share.",
    excerpt:
      "Best practices for writing blog content that is easy to scan, understand, and share.",
    publishedAt: "2026-05-28",
    author: "Fanuel Amare",
    readingTime: "5 min read",
    tags: ["writing", "content", "ux"],
    content: [
      "Good tech writing is concise, well-structured, and mindful of readers scanning for key ideas.",
      "Use clear headings, short paragraphs, and consistent examples to keep content approachable.",
      "A strong blog article helps developers solve problems quickly while preserving deeper insights."
    ],
  },
  {
    slug: "performance",
    aliases: ["optimization"],
    title: "Practical Performance Optimization",
    description:
      "Techniques for improving performance across web apps and engineering workflows.",
    excerpt:
      "Techniques for improving performance across web apps and engineering workflows.",
    publishedAt: "2026-06-01",
    author: "Fanuel Amare",
    readingTime: "4 min read",
    tags: ["performance", "optimization", "engineering"],
    content: [
      "Performance is both a technical and process improvement challenge for every tech team.",
      "Focus on fast feedback, efficient tooling, and measurable metrics to improve outcomes.",
      "This guide covers practical steps to make your applications and workflows more responsive."
    ],
  },
]

export function getAllPosts() {
  return posts
}

export function findPostBySlug(slug: string) {
  const canonicalPost = posts.find((post) => post.slug === slug)
  if (canonicalPost) {
    return { post: canonicalPost, canonicalSlug: canonicalPost.slug }
  }

  const aliasPost = posts.find((post) => post.aliases?.includes(slug))
  if (aliasPost) {
    return { post: aliasPost, canonicalSlug: aliasPost.slug }
  }

  return { post: undefined, canonicalSlug: undefined }
}

export function getAllPostSlugs() {
  return posts.map((post) => post.slug)
}

export function getCanonicalSlugForAlias(slug: string) {
  return posts.find((post) => post.aliases?.includes(slug))?.slug
}
