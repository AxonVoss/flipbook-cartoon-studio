'use client'

const FILES_BASE = 'http://api.axonprotocol.net'

export default function VideoPlayer({ videoUrl, pdfUrl }: { videoUrl?: string; pdfUrl?: string }) {
  if (!videoUrl) return null

  const fullVideoUrl = `${FILES_BASE}${videoUrl}`

  return (
    <div className="card-cartoon">
      <h3 className="font-black text-cartoon-dark text-lg mb-3">🎬 Your Animation</h3>
      <video
        src={fullVideoUrl}
        controls
        loop
        playsInline
        className="w-full rounded-xl border-2 border-cartoon-dark"
      />
      <div className="flex gap-3 mt-3">
        <a href={fullVideoUrl} download className="btn-blue flex-1 text-center text-sm py-2 block">
          📽️ Download MP4
        </a>
        {pdfUrl && (
          <a
            href={`${FILES_BASE}${pdfUrl}`}
            download
            className="btn-cartoon bg-cartoon-green text-white border-cartoon-dark flex-1 text-center text-sm py-2 block"
          >
            📄 PDF Flipbook
          </a>
        )}
      </div>
    </div>
  )
}
