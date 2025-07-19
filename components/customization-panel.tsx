"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomizationOptions } from "@/lib/types"

interface CustomizationPanelProps {
  customization: CustomizationOptions
  onChange: (customization: CustomizationOptions) => void
}

const colorOptions = [
  { value: "#7a8a4a", label: "Olive Green", color: "#7a8a4a" },
  { value: "#6b7280", label: "Gray", color: "#6b7280" },
  { value: "#374151", label: "Dark Gray", color: "#374151" },
  { value: "#059669", label: "Emerald", color: "#059669" },
  { value: "#0891b2", label: "Cyan", color: "#0891b2" },
  { value: "#7c3aed", label: "Violet", color: "#7c3aed" },
  { value: "#dc2626", label: "Red", color: "#dc2626" },
  { value: "#ea580c", label: "Orange", color: "#ea580c" },
]

const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Poppins", label: "Poppins" },
  { value: "Fira Sans", label: "Fira Sans" },
  { value: "DM Sans", label: "DM Sans" },
]

export function CustomizationPanel({ customization, onChange }: CustomizationPanelProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Color */}
        <div className="space-y-3">
          <Label className="text-gray-700">Primary Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => onChange({ ...customization, primaryColor: color.value })}
                className={`w-full h-10 rounded-lg border-2 transition-all ${
                  customization.primaryColor === color.value
                    ? "border-gray-400 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ backgroundColor: color.color }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="space-y-3">
          <Label className="text-gray-700">Font Family</Label>
          <Select
            value={customization.fontFamily}
            onValueChange={(value: "Inter" | "Poppins" | "Fira Sans" | "DM Sans") =>
              onChange({ ...customization, fontFamily: value })
            }
          >
            <SelectTrigger className="border-gray-300 focus:border-olive-500 focus:ring-olive-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
