export interface PersonalInfo {
  name: string
  role: string
  summary: string
  email: string
  phone: string
  location: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
}

export interface Skill {
  id: string
  name: string
  level: number // 1-5 stars
  category: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  startDate: string
  endDate?: string
}

export interface Blog {
  id: string
  title: string
  description: string
  url: string
  publishDate: string
  platform: string
}

export interface Contact {
  email: string
  phone: string
  linkedin: string
  github: string
  website: string
  twitter: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  projects: Project[]
  blogs: Blog[]
  contact: Contact
}

export type Template = "professional" | "minimal" | "creative"

export interface CustomizationOptions {
  primaryColor: string
  fontFamily: "Inter" | "Poppins" | "Fira Sans" | "DM Sans"
  layout: "single-column" | "two-column"
}
