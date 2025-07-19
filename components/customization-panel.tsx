"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomizationOptions } from "@/lib/types"

interface CustomizationPanelProps {
  customization: CustomizationOptions
  onChange: (customization: CustomizationOptions) => void
}

export function CustomizationPanel({ customization, onChange }: CustomizationPanelProps) {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Gray", value: "#6B7280" },
  ]

  const fonts = [
    { name: "System Default", value: "Inter" },
    { name: "Modern Sans", value: "Poppins" },
    { name: "Clean Sans", value: "Fira Sans" },
    { name: "Professional", value: "DM Sans" },
  ]

  const layouts = [
    { name: "Single Column", value: "single-column" },
    { name: "Two Column", value: "two-column" },
  ]

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="font-semibold">Customization</h3>

        <div>
          <Label className="text-sm font-medium mb-3 block">Primary Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded-full border-2 ${
                  customization.primaryColor === color.value ? "border-gray-900 scale-110" : "border-gray-300"
                } transition-transform`}
                style={{ backgroundColor: color.value }}
                onClick={() => onChange({ ...customization, primaryColor: color.value })}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Font Family</Label>
          <Select
            value={customization.fontFamily}
            onValueChange={(value: any) => onChange({ ...customization, fontFamily: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Layout</Label>
          <Select
            value={customization.layout}
            onValueChange={(value: any) => onChange({ ...customization, layout: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {layouts.map((layout) => (
                <SelectItem key={layout.value} value={layout.value}>
                  {layout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
