'use client'
import { API_BASE } from '@/lib/api'

interface Project {
  id: string
  title: string
  status: string
  total_frames: number
  thumbnail_path?: string
  created_at: string
  art_style: string
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  queued: 'bg-cartoon-yellow text-cartoon-dark',
  generating: 'bg-cartoon-blue text-white',
  compiling: 'bg-cartoon-purple text-white',
  done: 'bg-cartoon-green text-white',
  error: 'bg-cartoon-red text-white',
}

const statusLabels: Record<string, string> = {
  draft: '📝 Draft',
  queued: '⏳ Queued',
  generating: '🎨 Generating',
  compiling: '🎬 Compiling',
  done: '✅ Done',
  error: '❌ Error',
}

export default function ProjectCard({
  project,
  onClick,
  onDelete,
}: {
  project: Project
  onClick: () => void
  onDelete: () => void
}) {
  const thumbUrl = project.thumbnail_path
    ? `${API_BASE}/files/frames/${project.id}/frame_0001.png`
    : null

  return (
    <div
      className="card-cartoon cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="w-full h-36 bg-cartoon-yellow bg-opacity-30 rounded-xl border-2 border-cartoon-dark mb-3 overflow-hidden flex items-center justify-center">
        {thumbUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbUrl} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">📚</span>
        )}
      </div>

      {/* Status badge */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-black text-cartoon-dark text-lg truncate flex-1 pr-2">{project.title}</h3>
        <span className={`badge ${statusColors[project.status] || statusColors.draft} shrink-0`}>
          {statusLabels[project.status] || project.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{project.total_frames} frames • {project.art_style}</span>
        <span>{new Date(project.created_at).toLocaleDateString()}</span>
      </div>

      <button
        className="mt-3 text-xs text-cartoon-red font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => { e.stopPropagation(); onDelete() }}
      >
        🗑️ Delete
      </button>
    </div>
  )
}
