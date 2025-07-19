import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Fira_Sans, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-sans",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Folium - Professional Resume & Portfolio Builder",
  description:
    "Create stunning resumes and portfolios with our easy-to-use builder. Choose from professional templates and customize to your needs.",
  keywords: "resume builder, portfolio builder, CV maker, professional resume, job application",
  authors: [{ name: "Folium Team" }],
  creator: "Folium",
  publisher: "Folium",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://folium.app",
    title: "Folium - Professional Resume & Portfolio Builder",
    description: "Create stunning resumes and portfolios with our easy-to-use builder.",
    siteName: "Folium",
  },
  twitter: {
    card: "summary_large_image",
    title: "Folium - Professional Resume & Portfolio Builder",
    description: "Create stunning resumes and portfolios with our easy-to-use builder.",
    creator: "@folium",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${firaSans.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
