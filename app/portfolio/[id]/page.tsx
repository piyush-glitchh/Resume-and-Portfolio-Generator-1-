"use client"

import { useEffect, useState } from "react"
import type { ResumeData, Template, CustomizationOptions } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Star } from "lucide-react"
import Link from "next/link"

interface SharedPortfolio {
  data: ResumeData
  template: Template
  customization: CustomizationOptions
  createdAt: string
  type: string
}

export default function PortfolioPage({ params }: { params: { id: string } }) {
  const [portfolioData, setPortfolioData] = useState<SharedPortfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSharedPortfolio = () => {
      try {
        const savedData = localStorage.getItem(`folium-portfolio-${params.id}`)
        if (savedData) {
          const parsed = JSON.parse(savedData)
          setPortfolioData(parsed)
        }
      } catch (error) {
        console.error("Error loading shared portfolio:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSharedPortfolio()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">The portfolio you're looking for doesn't exist or may have been removed.</p>
          <Link href="/">
            <Button className="bg-olive-600 hover:bg-olive-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const { personalInfo, experience, skills, projects, blogs, contact } = portfolioData.data
  const { primaryColor } = portfolioData.customization

  const renderStars = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= level ? "fill-current text-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-olive-600" />
            <span className="font-semibold">Folium Portfolio</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#about" className="text-gray-600 hover:text-olive-600 transition-colors">
              About
            </a>
            <a href="#experience" className="text-gray-600 hover:text-olive-600 transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-gray-600 hover:text-olive-600 transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-600 hover:text-olive-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">{personalInfo.name}</h1>
              <h2 className="text-2xl lg:text-3xl text-olive-600 mb-6">{personalInfo.role}</h2>
              {personalInfo.summary && (
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">{personalInfo.summary}</p>
              )}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center space-x-2 bg-olive-600 text-white px-6 py-3 rounded-lg hover:bg-olive-700 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Get in Touch</span>
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
            {personalInfo.photo && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.photo || "/placeholder.svg"}
                  alt={personalInfo.name}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-8 border-white shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: primaryColor }}>
            About Me
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-gray-600 leading-relaxed">
                {personalInfo.summary ||
                  "Passionate professional with expertise in creating innovative solutions and driving meaningful impact."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {contact.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-olive-600" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-olive-600" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-olive-600" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section id="skills" className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(
                skills.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  },
                  {} as Record<string, typeof skills>,
                ),
              ).map(([category, categorySkills]) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-gray-700">{skill.name}</span>
                        <div style={{ color: primaryColor }}>{renderStars(skill.level)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section id="experience" className="py-16 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-lg font-semibold" style={{ color: primaryColor }}>
                        {exp.company}
                      </p>
                      {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                    <div className="mt-2 lg:mt-0">
                      <span className="inline-block bg-olive-100 text-olive-800 px-3 py-1 rounded-full text-sm">
                        {new Date(exp.startDate).getFullYear()} -{" "}
                        {exp.current ? "Present" : new Date(exp.endDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-olive-600 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-olive-600 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs rounded-full bg-olive-100 text-olive-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section id="blog" className="py-16 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Latest Publications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {blog.platform} • {new Date(blog.publishDate).toLocaleDateString()}
                  </p>
                  {blog.description && <p className="text-gray-700 text-sm leading-relaxed">{blog.description}</p>}
                  {blog.url && (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-olive-600 hover:text-olive-700 transition-colors"
                    >
                      Read More <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-olive-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl mb-8 opacity-90">Interested in collaborating? I'd love to hear from you.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-2 bg-white text-olive-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-olive-400" />
              <span className="text-lg font-semibold">Folium Portfolio</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/builder">
                <Button
                  variant="outline"
                  className="border-olive-400 text-olive-400 hover:bg-olive-400 hover:text-white bg-transparent"
                >
                  Create Your Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
