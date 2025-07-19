import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Palette, Download, Zap, Users, Star, ArrowRight, Leaf } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-olive-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-olive-600 rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Folium</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-olive-600 transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-gray-600 hover:text-olive-600 transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-olive-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-olive-600">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-olive-600 hover:bg-olive-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-olive-100 text-olive-800 border-olive-200">
              ✨ Professional Resume Builder
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create stunning resumes
              <span className="text-olive-600"> in minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Build professional resumes with our easy-to-use builder. Choose from beautiful templates, customize to
              your needs, and export as PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builder">
                <Button size="lg" className="bg-olive-600 hover:bg-olive-700 text-white px-8 py-3">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 bg-transparent"
              >
                View Examples
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to create the perfect resume
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our powerful resume builder comes with all the features you need to stand out from the crowd.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <FileText className="h-10 w-10 text-olive-600 mb-2" />
                  <CardTitle className="text-gray-900">Professional Templates</CardTitle>
                  <CardDescription>
                    Choose from carefully designed templates that are ATS-friendly and recruiter-approved.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Palette className="h-10 w-10 text-olive-600 mb-2" />
                  <CardTitle className="text-gray-900">Easy Customization</CardTitle>
                  <CardDescription>
                    Personalize colors, fonts, and layouts to match your style and industry preferences.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Download className="h-10 w-10 text-olive-600 mb-2" />
                  <CardTitle className="text-gray-900">Instant Export</CardTitle>
                  <CardDescription>
                    Download your resume as a high-quality PDF ready for job applications.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Zap className="h-10 w-10 text-olive-600 mb-2" />
                  <CardTitle className="text-gray-900">Real-time Preview</CardTitle>
                  <CardDescription>
                    See your changes instantly with our live preview feature as you build your resume.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-10 w-10 text-olive-600 mb-2" />
                  <CardTitle className="text-gray-900">ATS Optimized</CardTitle>
                  <CardDescription>
                    Our templates are designed to pass through Applicant Tracking Systems successfully.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Star className="h-10 w-10 text-olive-600 mb-2" />
                  <CardTitle className="text-gray-900">Multiple Sections</CardTitle>
                  <CardDescription>
                    Add education, experience, skills, projects, blogs, and contact information easily.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Beautiful templates for every profession
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our professionally designed templates help you make a great first impression.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="text-gray-900">Professional</CardTitle>
                  <CardDescription>
                    Clean and modern design perfect for corporate roles and traditional industries.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gradient-to-br from-olive-100 to-olive-200 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="text-gray-900">Creative</CardTitle>
                  <CardDescription>
                    Stand out with a creative design ideal for design, marketing, and creative roles.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="text-gray-900">Minimal</CardTitle>
                  <CardDescription>
                    Simple and elegant design that focuses on your content and achievements.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-olive-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to build your perfect resume?</h2>
            <p className="text-xl text-olive-100 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs with Folium.
            </p>
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="bg-white text-olive-600 hover:bg-gray-100 px-8 py-3">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-500">
          © 2025 Folium. All rights reserved. This domain and its content are owned and maintained by Piyush Priyabrata
          Mishra and Aanshuman Panigrahi.
        </p>
      </footer>
    </div>
  )
}
