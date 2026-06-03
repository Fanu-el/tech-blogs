import { Noto_Sans, Playfair_Display } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

const playfairDisplayHeading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" })

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "Tech Blogs | Next.js Developer Journal",
  description:
    "A modern tech blog built with Next.js, featuring clean routing, fast pages, and structured metadata.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://your-domain.com"),
  openGraph: {
    title: "Tech Blogs | Next.js Developer Journal",
    description:
      "A modern tech blog built with Next.js, featuring clean routing, fast pages, and structured metadata.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blogs | Next.js Developer Journal",
    description:
      "A modern tech blog built with Next.js, featuring clean routing, fast pages, and structured metadata.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
