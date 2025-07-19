"use client"

import type { ResumeData, CustomizationOptions } from "@/lib/types"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from "lucide-react"

interface MinimalTemplateProps {
  data: ResumeData
  customization: CustomizationOptions
}

export function MinimalTemplate({ data, customization }: MinimalTemplateProps) {
  const { personalInfo, education, experience, skills, projects, blogs, contact } = data
  const { primaryColor } = customization

  const renderStars = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className={`w-2 h-2 rounded-full ${star <= level ? "bg-current" : "bg-gray-300"}`} />
        ))}
      </div>
    )
  }

  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    return `${month}/${year}`
  }

  return (
    <div className="min-h-[11in] p-12 space-y-12 text-gray-800">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-8">
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo || "/placeholder.svg"}
                alt={personalInfo.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-light tracking-wide">{personalInfo.name}</h1>
            <div className="w-16 h-px mt-2" style={{ backgroundColor: primaryColor }}></div>
            <h2 className="text-xl font-light text-gray-600 mt-2">{personalInfo.role}</h2>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="flex items-center space-x-2 hover:underline">
              <Mail className="h-3 w-3" />
              <span>{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="flex items-center space-x-2 hover:underline">
              <Phone className="h-3 w-3" />
              <span>{contact.phone}</span>
            </a>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline"
            >
              <Linkedin className="h-3 w-3" />
              <span>LinkedIn</span>
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </a>
          )}
          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline"
            >
              <Globe className="h-3 w-3" />
              <span>Website</span>
            </a>
          )}
        </div>

        {personalInfo.summary && (
          <p className="text-gray-700 leading-relaxed max-w-4xl font-light">{personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-light mb-8 tracking-wide">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-8">
                <div
                  className="absolute left-0 top-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{exp.position}</h3>
                      <p className="font-light" style={{ color: primaryColor }}>
                        {exp.company}
                      </p>
                      {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                    </div>
                    <p className="text-sm text-gray-500 font-light">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 font-light whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
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
          <h2 className="text-2xl font-light mb-8 tracking-wide">Skills</h2>
          <div className="space-y-6">
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
                <h3 className="font-medium mb-3 text-gray-600">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="font-light">{skill.name}</span>
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
          <h2 className="text-2xl font-light mb-8 tracking-wide">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 text-gray-600 hover:text-gray-800" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 text-gray-600 hover:text-gray-800" />
                      </a>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 font-light leading-relaxed">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded font-light"
                        style={{
                          backgroundColor: `${primaryColor}15`,
                          color: primaryColor,
                          border: `1px solid ${primaryColor}30`,
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
          <h2 className="text-2xl font-light mb-8 tracking-wide">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="font-light" style={{ color: primaryColor }}>
                    {edu.institution}
                  </p>
                  {edu.field && <p className="text-gray-600 font-light">{edu.field}</p>}
                  {edu.gpa && <p className="text-gray-600 font-light text-sm">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-gray-500 font-light text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blogs */}
      {blogs.length > 0 && (
        <div>
          <h2 className="text-2xl font-light mb-8 tracking-wide">Publications</h2>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <h3 className="font-medium">{blog.title}</h3>
                <p className="text-gray-600 font-light text-sm">
                  {blog.platform} • {formatDate(blog.publishDate)}
                </p>
                {blog.description && <p className="text-gray-700 font-light text-sm mt-1">{blog.description}</p>}
                {blog.url && (
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-sm font-medium hover:underline"
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
  )
}
