"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Template } from "@/lib/types"
import { Check, Briefcase, User, Sparkles } from "lucide-react"

interface TemplateSelectorProps {
  selected: Template
  onSelect: (template: Template) => void
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const templates = [
    {
      id: "professional" as Template,
      name: "Professional",
      description: "Clean corporate design perfect for traditional industries",
      preview: "/placeholder.svg?height=200&width=150&text=Professional",
      icon: <Briefcase className="h-6 w-6 text-olive-600" />,
    },
    {
      id: "minimal" as Template,
      name: "Minimal",
      description: "Simple elegant style that focuses on content",
      preview: "/placeholder.svg?height=200&width=150&text=Minimal",
      icon: <User className="h-6 w-6 text-olive-600" />,
    },
    {
      id: "creative" as Template,
      name: "Creative",
      description: "Bold modern approach for creative professionals",
      preview: "/placeholder.svg?height=200&width=150&text=Creative",
      icon: <Sparkles className="h-6 w-6 text-olive-600" />,
    },
  ]

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 text-gray-900">Choose Template</h3>
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-lg border-2 transition-colors ${
                selected === template.id ? "border-olive-500 bg-olive-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onSelect(template.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {template.icon}
                    <div>
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                    </div>
                  </div>
                  {selected === template.id && <Check className="h-5 w-5 text-olive-500 flex-shrink-0" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
