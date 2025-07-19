"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Education } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
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
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.map((education) => (
        <Card key={education.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Education Entry</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Institution *</Label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="University of California"
                />
              </div>
              <div>
                <Label>Degree *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>

            <div>
              <Label>Field of Study</Label>
              <Input
                value={education.field}
                onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                placeholder="Computer Science"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={education.description}
                onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                placeholder="Relevant coursework, achievements, honors..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  )
}
