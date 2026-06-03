import pkg from "@next/env"
const { loadEnvConfig } = pkg

loadEnvConfig(process.cwd())

/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"

export default {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === "/blog" ? "daily" : "weekly",
      priority: path === "/" ? 0.9 : path.startsWith("/blog") ? 0.7 : 0.5,
    }
  },
}
