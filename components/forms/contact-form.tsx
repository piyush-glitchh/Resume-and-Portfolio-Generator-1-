"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Contact } from "@/lib/types"
import { Mail, Phone, Linkedin, Github, Globe, Twitter } from "lucide-react"

interface ContactFormProps {
  data: Contact
  onChange: (data: Contact) => void
}

export function ContactForm({ data, onChange }: ContactFormProps) {
  const handleChange = (field: keyof Contact, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const contactFields = [
    {
      key: "email" as keyof Contact,
      label: "Email",
      placeholder: "john@example.com",
      icon: Mail,
      type: "email",
    },
    {
      key: "phone" as keyof Contact,
      label: "Phone",
      placeholder: "+1 (555) 123-4567",
      icon: Phone,
      type: "tel",
    },
    {
      key: "linkedin" as keyof Contact,
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/username",
      icon: Linkedin,
      type: "url",
    },
    {
      key: "github" as keyof Contact,
      label: "GitHub",
      placeholder: "https://github.com/username",
      icon: Github,
      type: "url",
    },
    {
      key: "website" as keyof Contact,
      label: "Website",
      placeholder: "https://yourwebsite.com",
      icon: Globe,
      type: "url",
    },
    {
      key: "twitter" as keyof Contact,
      label: "Twitter",
      placeholder: "https://twitter.com/username",
      icon: Twitter,
      type: "url",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact & Social Links</h3>
        <p className="text-gray-600 text-sm mb-6">
          Add your contact information and social media profiles to help people connect with you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {contactFields.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              <div className="relative">
                <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id={field.key}
                  type={field.type}
                  value={data[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="pl-10"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use full URLs for social media profiles (including https://)</li>
          <li>• Make sure your LinkedIn profile is public and up-to-date</li>
          <li>• Consider creating a personal website to showcase your work</li>
          <li>• Keep your GitHub profile active with recent projects</li>
        </ul>
      </div>
    </div>
  )
}
