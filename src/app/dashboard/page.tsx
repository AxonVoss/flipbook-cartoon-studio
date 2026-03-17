'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'
import { api } from '@/lib/api'
import { isLoggedIn } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await api.listProjects()
      setProjects(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    try {
      await api.deleteProject(id)
      setProjects((p) => p.filter((proj) => proj.id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-cartoon-dark">My Projects 🎬</h1>
            <p className="text-gray-500 mt-1">{projects.length} flipbook{projects.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            className="btn-yellow px-6 py-3 text-lg"
            onClick={() => router.push('/studio')}
          >
            + New Project
          </button>
        </div>

        {error && (
          <div className="bg-cartoon-red bg-opacity-10 border-2 border-cartoon-red rounded-xl p-4 text-cartoon-red font-bold mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl animate-bounce-cartoon inline-block">📚</div>
            <p className="text-gray-500 mt-4 font-bold">Loading your projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🎨</div>
            <h2 className="text-2xl font-black text-cartoon-dark mb-3">No projects yet!</h2>
            <p className="text-gray-500 mb-6">Create your first flipbook animation and see it come to life.</p>
            <button
              className="btn-yellow px-8 py-4 text-lg"
              onClick={() => router.push('/studio')}
            >
              🚀 Create Your First Flipbook
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => router.push(`/studio?project=${project.id}`)}
                onDelete={() => handleDelete(project.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
