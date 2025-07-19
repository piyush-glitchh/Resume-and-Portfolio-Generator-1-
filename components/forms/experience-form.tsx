"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Experience } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"

interface ExperienceFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1990 + 6 }, (_, i) => currentYear + 5 - i)
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    }
    onChange([...data, newExperience])
    setExpandedItems(new Set([...expandedItems, newExperience.id]))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
    setExpandedItems(new Set([...expandedItems].filter((itemId) => itemId !== id)))
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <Button onClick={addExperience} className="bg-olive-600 hover:bg-olive-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No experience added yet. Click "Add Experience" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((experience) => (
            <Card key={experience.id} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle
                    className="text-base cursor-pointer hover:text-olive-600 transition-colors"
                    onClick={() => toggleExpanded(experience.id)}
                  >
                    {experience.position && experience.company
                      ? `${experience.position} at ${experience.company}`
                      : "New Experience"}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(experience.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedItems.has(experience.id) ? "Collapse" : "Expand"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(experience.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedItems.has(experience.id) && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`position-${experience.id}`}>Job Title *</Label>
                      <Input
                        id={`position-${experience.id}`}
                        value={experience.position}
                        onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                        placeholder="Software Engineer"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                        placeholder="Google"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`location-${experience.id}`}>Location</Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location}
                        onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                        placeholder="San Francisco, CA"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Start Month</Label>
                      <Select
                        value={experience.startDate.split("-")[1] || ""}
                        onValueChange={(value) => {
                          const year = experience.startDate.split("-")[0] || ""
                          updateExperience(experience.id, "startDate", `${year}-${value}`)
                        }}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-olive-500 focus:ring-olive-500">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Select
                        value={experience.startDate.split("-")[0] || ""}
                        onValueChange={(value) => {
                          const month = experience.startDate.split("-")[1] || ""
                          updateExperience(experience.id, "startDate", `${value}-${month}`)
                        }}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-olive-500 focus:ring-olive-500">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>End Month</Label>
                      <Select
                        value={experience.endDate.split("-")[1] || ""}
                        onValueChange={(value) => {
                          const year = experience.endDate.split("-")[0] || ""
                          updateExperience(experience.id, "endDate", `${year}-${value}`)
                        }}
                        disabled={experience.current}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-olive-500 focus:ring-olive-500">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Select
                        value={experience.endDate.split("-")[0] || ""}
                        onValueChange={(value) => {
                          const month = experience.endDate.split("-")[1] || ""
                          updateExperience(experience.id, "endDate", `${value}-${month}`)
                        }}
                        disabled={experience.current}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-olive-500 focus:ring-olive-500">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        updateExperience(experience.id, "current", checked as boolean)
                        if (checked) {
                          updateExperience(experience.id, "endDate", "")
                        }
                      }}
                      className="border-gray-300 data-[state=checked]:bg-olive-600 data-[state=checked]:border-olive-600"
                    />
                    <Label htmlFor={`current-${experience.id}`} className="text-sm">
                      I currently work here
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                    <Textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                      placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Improved application performance by 30% through code optimization"
                      className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      rows={4}
                    />
                    <p className="text-sm text-gray-500">
                      Use bullet points (•) to list your achievements and responsibilities
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
