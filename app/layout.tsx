import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Providers from "../app/providers" // ← we'll create this file below

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Your Beautiful Landing Page",
  description:
    "A modern, interactive, and responsive landing page built with Next.js, Tailwind CSS, and Framer Motion.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-white via-blue-50/40 to-blue-100/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
