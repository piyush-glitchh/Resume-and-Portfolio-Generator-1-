"use client"

import { useEffect, useState } from "react"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

interface SharedResume {
  data: ResumeData
  template: Template
  customization: CustomizationOptions
  createdAt: string
  type: string
}

export default function PreviewPage({ params }: { params: { id: string } }) {
  const [resumeData, setResumeData] = useState<SharedResume | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSharedResume = () => {
      try {
        // Try multiple possible keys for backward compatibility
        const possibleKeys = [
          `folium-shared-${params.id}`,
          `shared-resume-${params.id}`,
          `folium-portfolio-${params.id}`,
        ]

        let savedData = null
        for (const key of possibleKeys) {
          const data = localStorage.getItem(key)
          if (data) {
            savedData = data
            break
          }
        }

        if (savedData) {
          const parsed = JSON.parse(savedData)
          setResumeData(parsed)
        }
      } catch (error) {
        console.error("Error loading shared resume:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSharedResume()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
          <p className="text-gray-600 mb-6">The resume you're looking for doesn't exist or may have been removed.</p>
          <Link href="/">
            <Button className="bg-olive-600 hover:bg-olive-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-olive-600" />
            <span className="font-semibold">Folium Resume</span>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-olive-300 text-olive-700 hover:bg-olive-50 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create Your Own
            </Button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 print:p-0 print:m-0">
        <ResumePreview data={resumeData.data} template={resumeData.template} customization={resumeData.customization} />
      </div>
    </div>
  )
}
