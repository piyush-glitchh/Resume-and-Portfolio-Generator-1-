"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { Download, Share2, Printer, Camera, Copy } from "lucide-react"

interface ExportPanelProps {
  resumeData: ResumeData
  template: Template
  customization: CustomizationOptions
}

export function ExportPanel({ resumeData, template, customization }: ExportPanelProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleCopyText = async () => {
    try {
      const element = document.getElementById("resume-preview")
      if (!element) {
        alert("Resume preview not found. Please try again.")
        return
      }

      // Extract text content from the resume
      const textContent = element.innerText
      await navigator.clipboard.writeText(textContent)
      alert("Resume text copied to clipboard!")
    } catch (error) {
      console.error("Error copying text:", error)
      alert("Failed to copy text. Please try selecting and copying manually.")
    }
  }

  const shareResume = async () => {
    setIsSharing(true)
    try {
      // Generate a unique ID for the resume
      const resumeId = Date.now().toString(36) + Math.random().toString(36).substr(2)

      // Save resume data to localStorage with the ID
      const resumeToShare = {
        data: resumeData,
        template,
        customization,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(`shared-resume-${resumeId}`, JSON.stringify(resumeToShare))

      // Create shareable URL
      const shareUrl = `${window.location.origin}/preview/${resumeId}`

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl)

      alert(`Resume shared! URL copied to clipboard:\n${shareUrl}`)
    } catch (error) {
      console.error("Error sharing resume:", error)
      alert("Failed to share resume. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handlePrint} className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Print / Save as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyText} className="flex items-center">
            <Copy className="mr-2 h-4 w-4" />
            Copy Text
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              alert(
                "💡 Tip: Use your browser's screenshot tool (Cmd/Ctrl + Shift + S) or right-click → 'Save image as' to capture the resume as an image.",
              )
            }
            className="flex items-center"
          >
            <Camera className="mr-2 h-4 w-4" />
            Screenshot Tips
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" onClick={shareResume} disabled={isSharing} className="flex items-center bg-transparent">
        {isSharing ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            Sharing...
          </>
        ) : (
          <>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </>
        )}
      </Button>
    </div>
  )
}
