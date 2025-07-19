"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Template } from "@/lib/types"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selected: Template
  onSelect: (template: Template) => void
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const templates = [
    {
      id: "professional" as Template,
      name: "Professional",
      description: "Clean corporate design",
      preview: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "minimal" as Template,
      name: "Minimal",
      description: "Simple elegant style",
      preview: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "creative" as Template,
      name: "Creative",
      description: "Bold modern approach",
      preview: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Choose Template</h3>
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-lg border-2 transition-colors ${
                selected === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onSelect(template.id)}
            >
              <div className="p-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-12 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  {selected === template.id && <Check className="h-5 w-5 text-blue-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
