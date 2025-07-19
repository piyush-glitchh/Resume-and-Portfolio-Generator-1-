"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Share2, Palette, FileText, Zap, Printer } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "Create stunning resumes & portfolios in minutes"

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
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "No Login Required",
      description: "Start building immediately without any registration hassle",
    },
    {
      icon: <Palette className="h-6 w-6 text-purple-600" />,
      title: "Customizable Templates",
      description: "Choose from professional, minimal, and creative designs",
    },
    {
      icon: <Printer className="h-6 w-6 text-green-600" />,
      title: "Instant Print & Export",
      description: "Print directly from browser or save as PDF instantly",
    },
    {
      icon: <Share2 className="h-6 w-6 text-orange-600" />,
      title: "Share Publicly",
      description: "Get a shareable link to showcase your portfolio online",
    },
  ]

  const templates = [
    {
      name: "Professional",
      description: "Clean and corporate design",
      preview: "/placeholder.svg?height=300&width=200",
    },
    {
      name: "Minimal",
      description: "Simple and elegant style",
      preview: "/placeholder.svg?height=300&width=200",
    },
    {
      name: "Creative",
      description: "Bold and modern approach",
      preview: "/placeholder.svg?height=300&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Swiftfolio</span>
          </div>
          <Link href="/builder">
            <Button className="bg-blue-600 hover:bg-blue-700">
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
            Build professional resumes and stunning portfolios without any login. Choose templates, customize colors,
            and export instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Swiftfolio?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional resumes and portfolios, designed for speed and simplicity.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
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
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} template`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
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
            Join thousands of professionals who've created stunning resumes with Swiftfolio.
          </p>
          <Link href="/builder">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-12 py-4">
              Start Building Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Swiftfolio</span>
            </div>
            <p className="text-gray-600 text-sm">© 2024 Swiftfolio. Build amazing resumes and portfolios.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
