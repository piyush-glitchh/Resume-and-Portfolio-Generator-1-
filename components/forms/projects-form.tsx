"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/types"
import { Plus, Trash2, Github, ExternalLink, X } from "lucide-react"
import { useState } from "react"

interface ProjectsFormProps {
  data: Project[]
  onChange: (data: Project[]) => void
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      startDate: "",
      endDate: "",
    }
    onChange([...data, newProject])
  }

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onChange(data.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id))
  }

  const addTechnology = (projectId: string, tech: string) => {
    const project = data.find((p) => p.id === projectId)
    if (project && tech && !project.technologies.includes(tech)) {
      updateProject(projectId, "technologies", [...project.technologies, tech])
    }
  }

  const removeTechnology = (projectId: string, tech: string) => {
    const project = data.find((p) => p.id === projectId)
    if (project) {
      updateProject(
        projectId,
        "technologies",
        project.technologies.filter((t) => t !== tech),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {data.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onUpdate={updateProject}
          onRemove={removeProject}
          onAddTechnology={addTechnology}
          onRemoveTechnology={removeTechnology}
        />
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No projects yet. Click "Add Project" to showcase your work.</p>
        </div>
      )}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  onUpdate: (id: string, field: keyof Project, value: string | string[]) => void
  onRemove: (id: string) => void
  onAddTechnology: (projectId: string, tech: string) => void
  onRemoveTechnology: (projectId: string, tech: string) => void
}

function ProjectCard({ project, onUpdate, onRemove, onAddTechnology, onRemoveTechnology }: ProjectCardProps) {
  const [newTech, setNewTech] = useState("")

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTech.trim()) {
      onAddTechnology(project.id, newTech.trim())
      setNewTech("")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Project</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onRemove(project.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Project Name *</Label>
          <Input
            value={project.name}
            onChange={(e) => onUpdate(project.id, "name", e.target.value)}
            placeholder="E-commerce Platform"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={project.description}
            onChange={(e) => onUpdate(project.id, "description", e.target.value)}
            placeholder="A full-stack e-commerce platform built with React and Node.js..."
            rows={3}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="month"
              value={project.startDate}
              onChange={(e) => onUpdate(project.id, "startDate", e.target.value)}
            />
          </div>
          <div>
            <Label>End Date (Optional)</Label>
            <Input
              type="month"
              value={project.endDate}
              onChange={(e) => onUpdate(project.id, "endDate", e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>GitHub URL</Label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={project.githubUrl}
                onChange={(e) => onUpdate(project.id, "githubUrl", e.target.value)}
                placeholder="https://github.com/username/project"
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label>Live URL</Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={project.liveUrl}
                onChange={(e) => onUpdate(project.id, "liveUrl", e.target.value)}
                placeholder="https://myproject.com"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Technologies Used</Label>
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={handleAddTech}
            placeholder="Type technology and press Enter (e.g., React, Node.js)"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                {tech}
                <button onClick={() => onRemoveTechnology(project.id, tech)} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
