"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { PersonalInfo } from "@/lib/types"
import { Upload, X } from "lucide-react"
import { useRef } from "react"

interface PersonalInfoFormProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleChange("photo", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    handleChange("photo", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Photo Upload Section */}
      <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Photo</h3>
          <p className="text-sm text-gray-600 mb-4">Add a professional headshot to make your resume stand out</p>
        </div>

        {data.photo ? (
          <div className="relative">
            <img
              src={data.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-olive-200 shadow-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0 shadow-lg"
              onClick={removePhoto}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 shadow-inner">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
        )}

        <div className="text-center space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-olive-300 text-olive-700 hover:bg-olive-50 hover:border-olive-400"
          >
            <Upload className="mr-2 h-4 w-4" />
            {data.photo ? "Change Photo" : "Upload Photo"}
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          <p className="text-xs text-gray-500">Recommended: Square image (1:1 ratio), JPG or PNG, max 5MB</p>
        </div>
      </div>

      {/* Personal Information Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Full Name *
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
            className="border-gray-300 focus:border-olive-500 focus:ring-olive-500 mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="role" className="text-gray-700 font-medium">
            Professional Role *
          </Label>
          <Input
            id="role"
            value={data.role}
            onChange={(e) => handleChange("role", e.target.value)}
            placeholder="Software Engineer"
            className="border-gray-300 focus:border-olive-500 focus:ring-olive-500 mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary" className="text-gray-700 font-medium">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief description of your professional background, key achievements, and career objectives..."
          rows={4}
          className="border-gray-300 focus:border-olive-500 focus:ring-olive-500 mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">
          Write 2-3 sentences highlighting your experience and what makes you unique
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            className="border-gray-300 focus:border-olive-500 focus:ring-olive-500 mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-gray-700 font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="border-gray-300 focus:border-olive-500 focus:ring-olive-500 mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="text-gray-700 font-medium">
          Location
        </Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="New York, NY"
          className="border-gray-300 focus:border-olive-500 focus:ring-olive-500 mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">City, State or City, Country format preferred</p>
      </div>
    </div>
  )
}
