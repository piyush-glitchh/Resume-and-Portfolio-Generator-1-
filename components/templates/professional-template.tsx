"use client"

import type { ResumeData, CustomizationOptions } from "@/lib/types"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, Star } from "lucide-react"

interface ProfessionalTemplateProps {
  data: ResumeData
  customization: CustomizationOptions
}

export function ProfessionalTemplate({ data, customization }: ProfessionalTemplateProps) {
  const { personalInfo, education, experience, skills, projects, blogs, contact } = data
  const { primaryColor, layout } = customization

  const renderStars = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-3 w-3 ${star <= level ? "fill-current text-current" : "text-gray-300"}`} />
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

  if (layout === "two-column") {
    return (
      <div className="min-h-[11in] p-8 grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {contact.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{contact.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {contact.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" style={{ color: primaryColor }} />
                  <span className="text-xs break-all">{contact.linkedin}</span>
                </div>
              )}
              {contact.github && (
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" style={{ color: primaryColor }} />
                  <span className="text-xs break-all">{contact.github}</span>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" style={{ color: primaryColor }} />
                  <span className="text-xs break-all">{contact.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
                SKILLS
              </h2>
              <div className="space-y-4">
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
                  <div key={category}>
                    <h3 className="font-semibold text-sm mb-2">{category}</h3>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-sm">{skill.name}</span>
                          {renderStars(skill.level)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-sm font-medium">{edu.institution}</p>
                    {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <div className="text-center pb-6 border-b-2" style={{ borderColor: primaryColor }}>
            <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
            <h2 className="text-xl mb-4" style={{ color: primaryColor }}>
              {personalInfo.role}
            </h2>
            {personalInfo.summary && (
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{personalInfo.summary}</p>
            )}
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{exp.position}</h3>
                        <p className="font-semibold" style={{ color: primaryColor }}>
                          {exp.company}
                        </p>
                        {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                      </div>
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{project.name}</h3>
                      <div className="flex space-x-2">
                        {project.githubUrl && <Github className="h-4 w-4 text-gray-600" />}
                        {project.liveUrl && <ExternalLink className="h-4 w-4 text-gray-600" />}
                      </div>
                    </div>
                    {project.description && <p className="text-gray-700 mb-2">{project.description}</p>}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded"
                            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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

          {/* Blogs */}
          {blogs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                PUBLICATIONS & BLOGS
              </h2>
              <div className="space-y-3">
                {blogs.map((blog) => (
                  <div key={blog.id}>
                    <h3 className="font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-600">
                      {blog.platform} • {formatDate(blog.publishDate)}
                    </p>
                    {blog.description && <p className="text-gray-700 text-sm">{blog.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Single column layout
  return (
    <div className="min-h-[11in] p-8 space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b-2 avoid-break" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
        <h2 className="text-2xl mb-4" style={{ color: primaryColor }}>
          {personalInfo.role}
        </h2>

        {/* Contact Info */}
        <div className="flex justify-center space-x-6 text-sm mb-4">
          {contact.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{contact.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {personalInfo.summary && (
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">{personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="avoid-break">
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl">{exp.position}</h3>
                    <p className="font-semibold text-lg" style={{ color: primaryColor }}>
                      {exp.company}
                    </p>
                    {exp.location && <p className="text-gray-600">{exp.location}</p>}
                  </div>
                  <p className="text-gray-500 whitespace-nowrap">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="avoid-break">
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
            SKILLS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
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
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3">{category}</h3>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span>{skill.name}</span>
                      {renderStars(skill.level)}
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
        <div className="avoid-break">
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
            PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <div className="flex space-x-2">
                    {project.githubUrl && <Github className="h-4 w-4 text-gray-600" />}
                    {project.liveUrl && <ExternalLink className="h-4 w-4 text-gray-600" />}
                  </div>
                </div>
                {project.description && <p className="text-gray-700 mb-3">{project.description}</p>}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm rounded"
                        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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
        <div className="avoid-break">
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{edu.degree}</h3>
                  <p className="font-semibold" style={{ color: primaryColor }}>
                    {edu.institution}
                  </p>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-gray-500 whitespace-nowrap">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blogs */}
      {blogs.length > 0 && (
        <div className="avoid-break">
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
            PUBLICATIONS & BLOGS
          </h2>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <h3 className="font-bold text-lg">{blog.title}</h3>
                <p className="text-gray-600">
                  {blog.platform} • {formatDate(blog.publishDate)}
                </p>
                {blog.description && <p className="text-gray-700">{blog.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
