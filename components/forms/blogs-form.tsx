"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Blog } from "@/lib/types"
import { Plus, Trash2, ExternalLink } from "lucide-react"

interface BlogsFormProps {
  data: Blog[]
  onChange: (data: Blog[]) => void
}

export function BlogsForm({ data, onChange }: BlogsFormProps) {
  const platforms = ["Medium", "Dev.to", "Hashnode", "Personal Blog", "LinkedIn", "Substack", "Other"]

  const addBlog = () => {
    const newBlog: Blog = {
      id: Date.now().toString(),
      title: "",
      description: "",
      url: "",
      publishDate: "",
      platform: "",
    }
    onChange([...data, newBlog])
  }

  const updateBlog = (id: string, field: keyof Blog, value: string) => {
    onChange(data.map((blog) => (blog.id === id ? { ...blog, [field]: value } : blog)))
  }

  const removeBlog = (id: string) => {
    onChange(data.filter((blog) => blog.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Blogs & Publications</h3>
        <Button onClick={addBlog} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </Button>
      </div>

      {data.map((blog) => (
        <Card key={blog.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Blog Post</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => removeBlog(blog.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Article Title *</Label>
              <Input
                value={blog.title}
                onChange={(e) => updateBlog(blog.id, "title", e.target.value)}
                placeholder="10 Tips for Better React Performance"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={blog.description}
                onChange={(e) => updateBlog(blog.id, "description", e.target.value)}
                placeholder="A comprehensive guide to optimizing React applications..."
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Platform</Label>
                <Select value={blog.platform} onValueChange={(value) => updateBlog(blog.id, "platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Publish Date</Label>
                <Input
                  type="date"
                  value={blog.publishDate}
                  onChange={(e) => updateBlog(blog.id, "publishDate", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Article URL</Label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={blog.url}
                  onChange={(e) => updateBlog(blog.id, "url", e.target.value)}
                  placeholder="https://medium.com/@username/article-title"
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No blog posts yet. Click "Add Blog" to showcase your writing.</p>
        </div>
      )}
    </div>
  )
}
