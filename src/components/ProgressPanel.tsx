'use client'
import { API_BASE } from '@/lib/api'

interface ProgressState {
  status: string
  frame: number
  total: number
  preview_url?: string
  video_url?: string
  pdf_url?: string
  error?: string
}

interface Scene {
  scene_number: number
  description: string
  frame_count: number
}

export default function ProgressPanel({
  progress,
  storyboard,
}: {
  progress: ProgressState | null
  storyboard: { scenes: Scene[]; total_frames: number } | null
}) {
  if (!storyboard && !progress) return null

  const pct = progress && progress.total > 0
    ? Math.round((progress.frame / progress.total) * 100)
    : 0

  const statusLabel: Record<string, string> = {
    queued: '⏳ Queued...',
    generating: `🎨 Generating frame ${progress?.frame ?? 0} of ${progress?.total ?? 0}...`,
    compiling: '🎬 Compiling video & PDF...',
    done: '✅ Complete!',
    failed: '❌ Generation failed',
  }

  return (
    <div className="space-y-4">
      {/* Storyboard Scenes */}
      {storyboard && (
        <div className="card-cartoon">
          <h3 className="font-black text-cartoon-dark text-lg mb-3">📋 Storyboard</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {storyboard.scenes.map((scene) => (
              <div key={scene.scene_number} className="flex gap-2 text-sm">
                <span className="w-6 h-6 rounded-full bg-cartoon-yellow border-2 border-cartoon-dark font-bold text-xs flex items-center justify-center shrink-0">
                  {scene.scene_number}
                </span>
                <div>
                  <p className="text-cartoon-dark font-medium">{scene.description.slice(0, 80)}{scene.description.length > 80 ? '...' : ''}</p>
                  <p className="text-gray-400 text-xs">{scene.frame_count} frames</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 font-bold">Total: {storyboard.total_frames} frames</p>
        </div>
      )}

      {/* Progress */}
      {progress && (
        <div className="card-cartoon">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-cartoon-dark text-lg">
              {statusLabel[progress.status] || progress.status}
            </h3>
            <span className="font-black text-cartoon-blue text-xl">{pct}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-6 bg-gray-200 rounded-full border-2 border-cartoon-dark overflow-hidden">
            <div
              className="h-full bg-cartoon-yellow transition-all duration-300 rounded-full flex items-center justify-end pr-2"
              style={{ width: `${pct}%` }}
            >
              {pct > 10 && <span className="text-xs font-bold text-cartoon-dark">{pct}%</span>}
            </div>
          </div>

          {progress.frame > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {progress.frame} / {progress.total} frames
            </p>
          )}

          {/* Preview image */}
          {progress.preview_url && (
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-500 mb-1">LATEST FRAME PREVIEW</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${API_BASE}${progress.preview_url}`}
                alt="Latest frame"
                className="w-full rounded-xl border-2 border-cartoon-dark"
                key={progress.preview_url}
              />
            </div>
          )}

          {/* Error */}
          {progress.error && (
            <div className="mt-3 bg-cartoon-red bg-opacity-10 border-2 border-cartoon-red rounded-xl p-3 text-sm text-cartoon-red font-bold">
              {progress.error}
            </div>
          )}

          {/* Download buttons */}
          {progress.status === 'done' && (
            <div className="mt-4 flex gap-3">
              {progress.video_url && (
                <a
                  href={`/api/backend?path=${encodeURIComponent(progress.video_url!.replace(/^\//, ''))}`}
                  download
                  className="btn-blue flex-1 text-center text-sm py-2 block"
                >
                  📽️ Download MP4
                </a>
              )}
              {progress.pdf_url && (
                <a
                  href={`/api/backend?path=${encodeURIComponent(progress.pdf_url!.replace(/^\//, ''))}`}
                  download
                  className="btn-cartoon bg-cartoon-green text-white border-cartoon-dark flex-1 text-center text-sm py-2 block"
                >
                  📄 Download PDF Flipbook
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
