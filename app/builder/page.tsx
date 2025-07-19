"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { EducationForm } from "@/components/forms/education-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { BlogsForm } from "@/components/forms/blogs-form"
import { ContactForm } from "@/components/forms/contact-form"
import { TemplateSelector } from "@/components/template-selector"
import { CustomizationPanel } from "@/components/customization-panel"
import { ResumePreview } from "@/components/resume-preview"
import { ExportPanel } from "@/components/export-panel"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      role: "",
      summary: "",
      email: "",
      phone: "",
      location: "",
      photo: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    blogs: [],
    contact: {
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      website: "",
      twitter: "",
    },
  })

  const [selectedTemplate, setSelectedTemplate] = useState<Template>("professional")
  const [customization, setCustomization] = useState<CustomizationOptions>({
    primaryColor: "#7a8a4a",
    fontFamily: "Inter",
  })
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("folium-resume-data")
    const savedTemplate = localStorage.getItem("folium-template")
    const savedCustomization = localStorage.getItem("folium-customization")

    if (savedData) {
      setResumeData(JSON.parse(savedData))
    }
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as Template)
    }
    if (savedCustomization) {
      setCustomization(JSON.parse(savedCustomization))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("folium-resume-data", JSON.stringify(resumeData))
  }, [resumeData])

  useEffect(() => {
    localStorage.setItem("folium-template", selectedTemplate)
  }, [selectedTemplate])

  useEffect(() => {
    localStorage.setItem("folium-customization", JSON.stringify(customization))
  }, [customization])

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const tabs = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "blogs", label: "Blogs", icon: "📝" },
    { id: "contact", label: "Contact", icon: "📞" },
  ]

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b border-gray-200 bg-white sticky top-0 z-50 no-print">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setShowPreview(false)} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            <div className="flex items-center space-x-2">
              <ExportPanel resumeData={resumeData} template={selectedTemplate} customization={customization} />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 print:p-0 print:m-0">
          <ResumePreview data={resumeData} template={selectedTemplate} customization={customization} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Folium</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setShowPreview(true)} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <ExportPanel resumeData={resumeData} template={selectedTemplate} customization={customization} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 no-print">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 no-print">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Build Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6 bg-gray-100">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="text-xs data-[state=active]:bg-olive-600 data-[state=active]:text-white"
                      >
                        <span className="mr-1">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="personal">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) => updateResumeData("personalInfo", data)}
                    />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) => updateResumeData("education", data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience">
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) => updateResumeData("experience", data)}
                    />
                  </TabsContent>

                  <TabsContent value="skills">
                    <SkillsForm data={resumeData.skills} onChange={(data) => updateResumeData("skills", data)} />
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsForm data={resumeData.projects} onChange={(data) => updateResumeData("projects", data)} />
                  </TabsContent>

                  <TabsContent value="blogs">
                    <BlogsForm data={resumeData.blogs} onChange={(data) => updateResumeData("blogs", data)} />
                  </TabsContent>

                  <TabsContent value="contact">
                    <ContactForm data={resumeData.contact} onChange={(data) => updateResumeData("contact", data)} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6 no-print">
            <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            <CustomizationPanel customization={customization} onChange={setCustomization} />
          </div>
        </div>
      </div>

      {/* Hidden resume for print - only visible during print */}
      <div className="hidden print:block">
        <ResumePreview data={resumeData} template={selectedTemplate} customization={customization} />
      </div>
    </div>
  )
}
