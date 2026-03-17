'use client'
import { useEffect, useState, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import StudioForm from '@/components/StudioForm'
import ProgressPanel from '@/components/ProgressPanel'
import VideoPlayer from '@/components/VideoPlayer'
import { api, createWebSocket } from '@/lib/api'
import { isLoggedIn } from '@/lib/auth'

interface ProgressState {
  status: string
  frame: number
  total: number
  preview_url?: string
  video_url?: string
  pdf_url?: string
  error?: string
}

function StudioContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')

  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<ProgressState | null>(null)
  const [storyboard, setStoryboard] = useState<any>(null)
  const [error, setError] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (projectId) {
      loadExistingProject(projectId)
    }
    return () => wsRef.current?.close()
  }, [projectId])

  const loadExistingProject = async (id: string) => {
    try {
      const project = await api.getProject(id)
      if (project.job_id && project.status !== 'done') {
        connectWebSocket(project.job_id, project.total_frames)
      }
      if (project.storyboard) {
        setStoryboard(JSON.parse(project.storyboard))
      }
      if (project.status === 'done') {
        setProgress({
          status: 'done',
          frame: project.total_frames,
          total: project.total_frames,
          video_url: project.video_path ? `/files/videos/${id}.mp4` : undefined,
          pdf_url: project.pdf_path ? `/files/pdfs/${id}.pdf` : undefined,
        })
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const connectWebSocket = (jobId: string, totalFrames: number) => {
    wsRef.current?.close()
    const ws = createWebSocket(jobId)

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setProgress(data)
        if (data.status === 'done' || data.status === 'failed') {
          ws.close()
        }
      } catch {}
    }

    ws.onerror = () => {
      // Fall back to polling
      startPolling(jobId)
    }

    wsRef.current = ws
  }

  const startPolling = (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const status = await api.jobStatus(jobId)
        setProgress(status)
        if (status.status === 'done' || status.status === 'failed') {
          clearInterval(interval)
        }
      } catch {}
    }, 2000)
  }

  const handleSubmit = async (formData: any) => {
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError('')
    setProgress(null)
    setStoryboard(null)

    try {
      // Create project
      const project = await api.createProject(formData)

      // Start generation
      const gen = await api.startGeneration(project.id, 'mock')
      
      // Connect WebSocket
      connectWebSocket(gen.job_id, gen.total_frames)
      setProgress({
        status: 'queued',
        frame: 0,
        total: gen.total_frames,
      })

      // Get storyboard
      const proj = await api.getProject(project.id)
      if (proj.storyboard) {
        setStoryboard(JSON.parse(proj.storyboard))
      }

    } catch (err: any) {
      setError(err.message || 'Failed to start generation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-cartoon-dark">✨ Cartoon Studio</h1>
          <p className="text-gray-500 mt-1">Describe your story and watch it become a cartoon flipbook</p>
        </div>

        {error && (
          <div className="bg-cartoon-red bg-opacity-10 border-2 border-cartoon-red rounded-xl p-4 text-cartoon-red font-bold mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="card-cartoon">
            <h2 className="text-xl font-black text-cartoon-dark mb-4">📝 Story Setup</h2>
            <StudioForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Right: Progress / Preview */}
          <div className="space-y-4">
            {!progress && !storyboard && (
              <div className="card-cartoon text-center py-16">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-black text-cartoon-dark mb-2">Ready to create!</h3>
                <p className="text-gray-500">Fill in your story on the left and click Generate.</p>
              </div>
            )}

            <ProgressPanel progress={progress} storyboard={storyboard} />

            {progress?.status === 'done' && progress.video_url && (
              <VideoPlayer videoUrl={progress.video_url} pdfUrl={progress.pdf_url} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-6xl animate-bounce-cartoon">📚</div></div>}>
      <StudioContent />
    </Suspense>
  )
}
