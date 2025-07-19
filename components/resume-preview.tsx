"use client"

import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { ProfessionalTemplate } from "./templates/professional-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { CreativeTemplate } from "./templates/creative-template"

interface ResumePreviewProps {
  data: ResumeData
  template: Template
  customization: CustomizationOptions
}

export function ResumePreview({ data, template, customization }: ResumePreviewProps) {
  const getFontClass = (fontFamily: string) => {
    switch (fontFamily) {
      case "Inter":
        return "font-inter"
      case "Poppins":
        return "font-poppins"
      case "Fira Sans":
        return "font-fira-sans"
      case "DM Sans":
        return "font-dm-sans"
      default:
        return "font-inter"
    }
  }

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
    <div id="resume-preview" className={`${getFontClass(customization.fontFamily)} bg-white shadow-lg`}>
      {renderTemplate()}
    </div>
  )
}
