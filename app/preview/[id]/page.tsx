"use client"

import { useEffect, useState } from "react"
import { ResumePreview } from "@/components/resume-preview"
import { ExportPanel } from "@/components/export-panel"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

interface SharedResume {
  data: ResumeData
  template: Template
  customization: CustomizationOptions
  createdAt: string
}

export default function PreviewPage({ params }: { params: { id: string } }) {
  const [resumeData, setResumeData] = useState<SharedResume | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSharedResume = () => {
      try {
        const savedData = localStorage.getItem(`shared-resume-${params.id}`)
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
            <Button>
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
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="font-semibold">Swiftfolio</span>
            </Link>
            <div className="text-sm text-gray-500">Shared Resume • {resumeData.data.personalInfo.name}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/builder">
              <Button variant="outline">Create Your Own</Button>
            </Link>
            <ExportPanel
              resumeData={resumeData.data}
              template={resumeData.template}
              customization={resumeData.customization}
            />
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="container mx-auto px-4 py-8">
        <ResumePreview data={resumeData.data} template={resumeData.template} customization={resumeData.customization} />
      </div>

      {/* Footer */}
      <div className="border-t bg-white mt-12 no-print">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 mb-4">Create your own professional resume with Swiftfolio</p>
          <Link href="/builder">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
