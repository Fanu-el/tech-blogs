import React from "react"
import Link from "next/link"

/**
 * Parses inline Markdown syntax (bold, italic, code, links) in a string
 * and returns React elements.
 */
export function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex to match:
  // 1. code: `code`
  // 2. bold: **bold**
  // 3. italic: *italic*
  // 4. link: [text](url)
  const regex = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g

  const result: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, code, bold, italic, linkText, linkUrl] = match
    const matchIndex = match.index

    // Add preceding text
    if (matchIndex > lastIndex) {
      result.push(text.substring(lastIndex, matchIndex))
    }

    if (code !== undefined) {
      result.push(
        <code
          key={matchIndex}
          className="bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400"
        >
          {code}
        </code>
      )
    } else if (bold !== undefined) {
      result.push(
        <strong key={matchIndex} className="font-semibold text-slate-900 dark:text-white">
          {bold}
        </strong>
      )
    } else if (italic !== undefined) {
      result.push(
        <em key={matchIndex} className="italic text-slate-800 dark:text-slate-200">
          {italic}
        </em>
      )
    } else if (linkText !== undefined && linkUrl !== undefined) {
      const isInternal = linkUrl.startsWith("/")
      if (isInternal) {
        result.push(
          <Link
            key={matchIndex}
            href={linkUrl}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition"
          >
            {linkText}
          </Link>
        )
      } else {
        result.push(
          <a
            key={matchIndex}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition"
          >
            {linkText}
          </a>
        )
      }
    }

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex))
  }

  return result
}
