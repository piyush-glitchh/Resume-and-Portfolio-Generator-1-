"use client"

import type { ResumeData, CustomizationOptions } from "@/lib/types"
import { Mail, Phone, MapPin, Github, ExternalLink, Star, Linkedin, Globe } from "lucide-react"

interface ProfessionalTemplateProps {
  data: ResumeData
  customization: CustomizationOptions
}

export function ProfessionalTemplate({ data, customization }: ProfessionalTemplateProps) {
  const { personalInfo, education, experience, skills, projects, blogs, contact } = data
  const { primaryColor } = customization

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

  return (
    <div className="min-h-[11in] p-8 space-y-8 bg-white">
      {/* Header with Photo */}
      <div className="text-center pb-6 border-b-2 avoid-break" style={{ borderColor: primaryColor }}>
        {personalInfo.photo && (
          <div className="mb-6">
            <img
              src={personalInfo.photo || "/placeholder.svg"}
              alt={personalInfo.name}
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200 shadow-lg"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{personalInfo.name}</h1>
        <h2 className="text-2xl mb-4" style={{ color: primaryColor }}>
          {personalInfo.role}
        </h2>

        {/* Contact Info */}
        <div className="flex justify-center space-x-6 text-sm mb-4 flex-wrap">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="flex items-center space-x-1 hover:underline">
              <Mail className="h-4 w-4" />
              <span>{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="flex items-center space-x-1 hover:underline">
              <Phone className="h-4 w-4" />
              <span>{contact.phone}</span>
            </a>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:underline"
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
              className="flex items-center space-x-1 hover:underline"
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
              className="flex items-center space-x-1 hover:underline"
            >
              <Globe className="h-4 w-4" />
              <span>Website</span>
            </a>
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
                    <h3 className="font-bold text-xl text-gray-900">{exp.position}</h3>
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
                <h3 className="font-semibold text-lg mb-3 text-gray-900">{category}</h3>
                <div className="space-y-2">
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
                  <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
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
                  <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
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
                <h3 className="font-bold text-lg text-gray-900">{blog.title}</h3>
                <p className="text-gray-600">
                  {blog.platform} • {formatDate(blog.publishDate)}
                </p>
                {blog.description && <p className="text-gray-700">{blog.description}</p>}
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
