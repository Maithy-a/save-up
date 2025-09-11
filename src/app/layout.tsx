import type { Metadata } from "next"
import { Epilogue, DM_Sans } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"


const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Targetly",
  description:
    "Targetly is a goal-setting and savings app that helps users set financial targets and track their progress, featuring seamless Paystack integration for secure payments and deposits.",
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
        className={`${epilogue.variable} ${dmSans.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
