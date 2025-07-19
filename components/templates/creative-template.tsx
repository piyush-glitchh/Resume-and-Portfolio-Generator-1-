"use client"

import type { ResumeData, CustomizationOptions } from "@/lib/types"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, Star } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
  customization: CustomizationOptions
}

export function CreativeTemplate({ data, customization }: CreativeTemplateProps) {
  const { personalInfo, education, experience, skills, projects, blogs, contact } = data
  const { primaryColor } = customization

  const renderStars = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= level ? "fill-current text-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="min-h-[11in] bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div
        className="p-12 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 transform translate-x-32 -translate-y-32"
          style={{ backgroundColor: "white" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 transform -translate-x-24 translate-y-24"
          style={{ backgroundColor: "white" }}
        ></div>

        <div className="relative z-10 flex items-center space-x-8">
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo || "/placeholder.svg"}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
              />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">{personalInfo.name}</h1>
            <h2 className="text-2xl font-light mb-6 opacity-90">{personalInfo.role}</h2>

            {personalInfo.summary && (
              <p className="text-lg leading-relaxed max-w-3xl mb-8 opacity-95">{personalInfo.summary}</p>
            )}

            {/* Contact */}
            <div className="flex flex-wrap gap-6 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full">
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
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
                  className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-12 space-y-12">
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div
                    className="absolute left-0 top-0 w-1 h-full rounded"
                    style={{ backgroundColor: `${primaryColor}30` }}
                  ></div>
                  <div className="pl-8 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{exp.position}</h3>
                        <p className="text-lg font-semibold" style={{ color: primaryColor }}>
                          {exp.company}
                        </p>
                        {exp.location && <p className="text-gray-600">{exp.location}</p>}
                      </div>
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-3xl font-bold">Skills</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
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
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold" style={{ color: primaryColor }}>
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{skill.name}</span>
                        <div style={{ color: primaryColor }}>{renderStars(skill.level)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-3xl font-bold">Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-4"
                  style={{ borderColor: primaryColor }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          style={{ backgroundColor: `${primaryColor}20` }}
                        >
                          <Github className="h-4 w-4" style={{ color: primaryColor }} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          style={{ backgroundColor: `${primaryColor}20` }}
                        >
                          <ExternalLink className="h-4 w-4" style={{ color: primaryColor }} />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full font-medium"
                          style={{
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-lg font-semibold" style={{ color: primaryColor }}>
                        {edu.institution}
                      </p>
                      {edu.field && <p className="text-gray-600">{edu.field}</p>}
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div
                      className="px-4 py-2 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blogs */}
        {blogs.length > 0 && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-3xl font-bold">Publications</h2>
            </div>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {blog.platform} • {formatDate(blog.publishDate)}
                  </p>
                  {blog.description && <p className="text-gray-700">{blog.description}</p>}
                  {blog.url && (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-sm font-medium hover:underline"
                      style={{ color: primaryColor }}
                    >
                      Read Article <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
