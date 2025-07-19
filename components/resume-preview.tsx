"use client"

import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { ProfessionalTemplate } from "@/components/templates/professional-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { CreativeTemplate } from "@/components/templates/creative-template"

interface ResumePreviewProps {
  data: ResumeData
  template: Template
  customization: CustomizationOptions
}

export function ResumePreview({ data, template, customization }: ResumePreviewProps) {
  const renderTemplate = () => {
    const props = { data, customization }

    switch (template) {
      case "professional":
        return <ProfessionalTemplate {...props} />
      case "minimal":
        return <MinimalTemplate {...props} />
      case "creative":
        return <CreativeTemplate {...props} />
      default:
        return <ProfessionalTemplate {...props} />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div
        id="resume-preview"
        className={`bg-white shadow-lg print:shadow-none print:m-0 print:p-0 ${
          customization.fontFamily === "Inter"
            ? "font-inter"
            : customization.fontFamily === "Poppins"
              ? "font-poppins"
              : customization.fontFamily === "Fira Sans"
                ? "font-fira-sans"
                : customization.fontFamily === "DM Sans"
                  ? "font-dm-sans"
                  : "font-sans"
        }`}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}
