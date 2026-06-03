"use client"

import { useState } from "react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Placeholder - replace with your newsletter service
      // Example: Mailchimp, ConvertKit, Substack, etc.
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800/70 dark:bg-slate-950/40">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Subscribe to updates</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Get new posts delivered to your inbox.
      </p>

      {status === "success" ? (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          Thanks for subscribing! 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-600 dark:text-red-400">Something went wrong. Try again.</p>
          )}
        </form>
      )}
    </div>
  )
}
