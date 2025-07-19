"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Palette, FileText, Zap, Printer, User, Briefcase, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "Create stunning resumes in minutes"

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-olive-600" />,
      title: "No Login Required",
      description: "Start building immediately without any registration hassle",
    },
    {
      icon: <Palette className="h-6 w-6 text-olive-600" />,
      title: "Customizable Templates",
      description: "Choose from professional, minimal, and creative designs",
    },
    {
      icon: <Printer className="h-6 w-6 text-olive-600" />,
      title: "Instant Print & Export",
      description: "Print directly from browser or save as PDF instantly",
    },
  ]

  const templates = [
    {
      name: "Professional",
      description: "Clean and corporate design perfect for traditional industries",
      preview: "/placeholder.svg?height=400&width=300&text=Professional+Template",
      icon: <Briefcase className="h-8 w-8 text-olive-600" />,
    },
    {
      name: "Minimal",
      description: "Simple and elegant style that focuses on content",
      preview: "/placeholder.svg?height=400&width=300&text=Minimal+Template",
      icon: <User className="h-8 w-8 text-olive-600" />,
    },
    {
      name: "Creative",
      description: "Bold and modern approach for creative professionals",
      preview: "/placeholder.svg?height=400&width=300&text=Creative+Template",
      icon: <Sparkles className="h-8 w-8 text-olive-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-olive-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-olive-600" />
            <span className="text-2xl font-bold text-gray-900">Folium</span>
          </div>
          <Link href="/builder">
            <Button className="bg-olive-600 hover:bg-olive-700 text-white">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 min-h-[120px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build professional resumes without any login. Choose templates, customize colors, and export instantly.
          </p>
          <div className="flex justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-olive-600 hover:bg-olive-700 text-white text-lg px-12 py-4">
                Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Folium?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional resumes, designed for speed and simplicity.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Beautiful Templates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully crafted templates, each designed for different industries and styles.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer group border-gray-200">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden relative">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} template`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg">{template.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{template.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to build your perfect resume?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who've created stunning resumes with Folium.
          </p>
          <Link href="/builder">
            <Button size="lg" className="bg-olive-600 hover:bg-olive-700 text-white text-lg px-12 py-4">
              Start Building Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-olive-600" />
              <span className="text-lg font-semibold text-gray-900">Folium</span>
            </div>
            <p className="text-gray-600 text-sm">© 2024 Folium. Build amazing resumes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
