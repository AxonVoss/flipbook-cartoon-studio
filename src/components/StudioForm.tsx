'use client'
import { useState } from 'react'

const ART_STYLES = [
  { value: 'cartoon', label: '🎨 Classic Cartoon' },
  { value: 'anime', label: '⛩️ Anime' },
  { value: 'sketch', label: '✏️ Pencil Sketch' },
  { value: 'watercolor', label: '🎭 Watercolor' },
  { value: 'pixel', label: '🕹️ Pixel Art' },
  { value: 'comic', label: '💬 Comic Book' },
]

interface StudioFormData {
  title: string
  story: string
  duration_seconds: number
  fps: number
  art_style: string
  character_description: string
}

export default function StudioForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: StudioFormData) => void
  loading: boolean
}) {
  const [form, setForm] = useState<StudioFormData>({
    title: '',
    story: '',
    duration_seconds: 10,
    fps: 24,
    art_style: 'cartoon',
    character_description: '',
  })

  const totalFrames = form.duration_seconds * form.fps

  const set = (key: keyof StudioFormData, val: any) =>
    setForm((f) => ({ ...f, [key]: val }))

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}
      className="space-y-5"
    >
      <div>
        <label className="block font-bold text-cartoon-dark mb-1">📖 Project Title</label>
        <input
          className="input-cartoon"
          placeholder="My Epic Cartoon Adventure"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-bold text-cartoon-dark mb-1">📝 Story</label>
        <textarea
          className="input-cartoon min-h-32 resize-y"
          placeholder="A brave little robot wanders into a magical forest. It meets a talking fox who shows it the way home. Together they cross rivers, climb mountains, and discover the true meaning of friendship."
          value={form.story}
          onChange={(e) => set('story', e.target.value)}
          required
          rows={5}
        />
        <p className="text-xs text-gray-400 mt-1">The AI will split this into scenes automatically</p>
      </div>

      <div>
        <label className="block font-bold text-cartoon-dark mb-1">👤 Character Description</label>
        <input
          className="input-cartoon"
          placeholder="A small robot with big round eyes and a glowing chest light"
          value={form.character_description}
          onChange={(e) => set('character_description', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-bold text-cartoon-dark mb-1">🎨 Art Style</label>
        <select
          className="input-cartoon"
          value={form.art_style}
          onChange={(e) => set('art_style', e.target.value)}
        >
          {ART_STYLES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-cartoon-dark mb-1">
            ⏱️ Duration: <span className="text-cartoon-blue">{form.duration_seconds}s</span>
          </label>
          <input
            type="range"
            min={3}
            max={60}
            value={form.duration_seconds}
            onChange={(e) => set('duration_seconds', parseInt(e.target.value))}
            className="w-full accent-cartoon-yellow"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>3s</span><span>60s</span>
          </div>
        </div>
        <div>
          <label className="block font-bold text-cartoon-dark mb-1">
            🎞️ FPS: <span className="text-cartoon-blue">{form.fps}</span>
          </label>
          <input
            type="range"
            min={8}
            max={30}
            step={2}
            value={form.fps}
            onChange={(e) => set('fps', parseInt(e.target.value))}
            className="w-full accent-cartoon-blue"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>8fps</span><span>30fps</span>
          </div>
        </div>
      </div>

      <div className="bg-cartoon-yellow bg-opacity-20 border-2 border-cartoon-yellow rounded-cartoon p-3 text-sm text-cartoon-dark">
        📊 <strong>{totalFrames} frames</strong> will be generated ({form.duration_seconds}s × {form.fps}fps)
      </div>

      <div>
        <label className="block font-black text-cartoon-dark mb-1">🤖 AI Model</label>
        <select
          className="input-cartoon w-full"
          value={(form as any).model || 'replicate'}
          onChange={(e) => set('model' as any, e.target.value)}
        >
          <option value="replicate">🎨 Replicate SDXL (Best Quality)</option>
          <option value="mock">🔧 Mock (Fast Test, No API Cost)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-yellow w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '⏳ Generating...' : '🎬 Generate Animation'}
      </button>
    </form>
  )
}
