"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Education } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
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

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    }
    onChange([...data, newEducation])
    setExpandedItems(new Set([...expandedItems, newEducation.id]))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
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
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <Button onClick={addEducation} className="bg-olive-600 hover:bg-olive-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No education added yet. Click "Add Education" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((education) => (
            <Card key={education.id} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle
                    className="text-base cursor-pointer hover:text-olive-600 transition-colors"
                    onClick={() => toggleExpanded(education.id)}
                  >
                    {education.degree && education.institution
                      ? `${education.degree} at ${education.institution}`
                      : "New Education"}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(education.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedItems.has(education.id) ? "Collapse" : "Expand"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(education.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedItems.has(education.id) && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                      <Input
                        id={`institution-${education.id}`}
                        value={education.institution}
                        onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                        placeholder="University of California, Berkeley"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                      <Input
                        id={`degree-${education.id}`}
                        value={education.degree}
                        onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                        placeholder="Bachelor of Science"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${education.id}`}
                        value={education.field}
                        onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                        placeholder="Computer Science"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`gpa-${education.id}`}>GPA</Label>
                      <Input
                        id={`gpa-${education.id}`}
                        value={education.gpa}
                        onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                        placeholder="3.8/4.0"
                        className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Start Month</Label>
                      <Select
                        value={education.startDate.split("-")[1] || ""}
                        onValueChange={(value) => {
                          const year = education.startDate.split("-")[0] || ""
                          updateEducation(education.id, "startDate", `${year}-${value}`)
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
                        value={education.startDate.split("-")[0] || ""}
                        onValueChange={(value) => {
                          const month = education.startDate.split("-")[1] || ""
                          updateEducation(education.id, "startDate", `${value}-${month}`)
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
                        value={education.endDate.split("-")[1] || ""}
                        onValueChange={(value) => {
                          const year = education.endDate.split("-")[0] || ""
                          updateEducation(education.id, "endDate", `${year}-${value}`)
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
                      <Label>End Year</Label>
                      <Select
                        value={education.endDate.split("-")[0] || ""}
                        onValueChange={(value) => {
                          const month = education.endDate.split("-")[1] || ""
                          updateEducation(education.id, "endDate", `${value}-${month}`)
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${education.id}`}>Description</Label>
                    <Textarea
                      id={`description-${education.id}`}
                      value={education.description}
                      onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                      placeholder="Relevant coursework, achievements, honors, etc."
                      className="border-gray-300 focus:border-olive-500 focus:ring-olive-500"
                      rows={3}
                    />
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
