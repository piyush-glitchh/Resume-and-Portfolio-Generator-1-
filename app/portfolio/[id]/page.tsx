"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { ArrowLeft, Home, FileText, Loader2 } from "lucide-react"
import Link from "next/link"

interface PortfolioData {
  id: string
  data: ResumeData
  template: Template
  customization: CustomizationOptions
  created_at: string
}

export default function PortfolioPage() {
  const params = useParams()
  const id = params.id as string

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) {
        setError("Invalid portfolio ID")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/portfolio?id=${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError("Portfolio not found")
          } else {
            setError("Failed to load portfolio")
          }
          setLoading(false)
          return
        }

        const data = await response.json()
        setPortfolioData(data)
      } catch (error) {
        console.error("Error fetching portfolio:", error)
        setError("Failed to load portfolio")
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-olive-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Portfolio</h2>
            <p className="text-gray-600 text-center">Please wait while we fetch your portfolio...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {error === "Portfolio not found" ? "Portfolio Not Found" : "Error Loading Portfolio"}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {error === "Portfolio not found"
                ? "The portfolio you're looking for doesn't exist or may have been removed."
                : "We encountered an error while loading this portfolio. Please try again later."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href="/" className="flex items-center justify-center">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-olive-600 hover:bg-olive-700">
                <Link href="/builder" className="flex items-center justify-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Your Own
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Folium</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline">
              <Link href="/builder" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Create Your Own
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Portfolio Content */}
      <div className="container mx-auto px-4 py-8 print:p-0 print:m-0">
        <ResumePreview
          data={portfolioData.data}
          template={portfolioData.template}
          customization={portfolioData.customization}
        />
      </div>

      {/* Footer - only visible on screen, not print */}
      <footer className="border-t border-gray-200 bg-white py-8 no-print">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            This portfolio was created with{" "}
            <Link href="/" className="text-olive-600 hover:text-olive-700 font-medium">
              Folium
            </Link>
          </p>
          <Button asChild className="bg-olive-600 hover:bg-olive-700">
            <Link href="/builder">Create Your Own Portfolio</Link>
          </Button>
        </div>
      </footer>
    </div>
  )
}
