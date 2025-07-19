"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { Download, Printer } from "lucide-react"

interface ExportPanelProps {
  resumeData: ResumeData
  template: Template
  customization: CustomizationOptions
}

export function ExportPanel({ resumeData, template, customization }: ExportPanelProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center bg-olive-600 hover:bg-olive-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handlePrint} className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Print / Save as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
