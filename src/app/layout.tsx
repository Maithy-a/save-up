import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Roboto_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "SubApp",
  description:
    "Demo project for handling Paystack payments and subscription flows using Next.js, Supabase, and Tailwind.",
  icons: {
    icon: "/images/geopandas.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
