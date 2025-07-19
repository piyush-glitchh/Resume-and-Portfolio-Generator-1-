"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Skill } from "@/lib/types"
import { Plus, Trash2, Star } from "lucide-react"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({ name: "", category: "", level: 3 })

  const categories = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Tools & Technologies",
    "Databases",
    "Cloud Platforms",
    "Soft Skills",
    "Other",
  ]

  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name,
        category: newSkill.category,
        level: newSkill.level,
      }
      onChange([...data, skill])
      setNewSkill({ name: "", category: "", level: 3 })
    }
  }

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id))
  }

  const updateSkillLevel = (id: string, level: number) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, level } : skill)))
  }

  const renderStars = (level: number, skillId: string) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => updateSkillLevel(skillId, star)}
            className="focus:outline-none"
          >
            <Star className={`h-4 w-4 ${star <= level ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const groupedSkills = data.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Skills</h3>
      </div>

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label>Skill Name</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="React"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Proficiency Level</Label>
              <div className="flex items-center space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewSkill({ ...newSkill, level: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= newSkill.level ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={addSkill} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills by Category */}
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-base">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{skill.name}</span>
                    {renderStars(skill.level, skill.id)}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Add your first skill above.</p>
        </div>
      )}
    </div>
  )
}
