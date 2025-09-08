import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Save-up",
  description:
    "Save-up is a goal-setting and savings app that helps users set financial targets and track their progress, featuring seamless Paystack integration for secure payments and deposits.",
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
        className={`${inter.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
