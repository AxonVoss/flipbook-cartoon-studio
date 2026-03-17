'use client'
import Link from 'next/link'

const features = [
  {
    icon: '🎯',
    title: 'No AI Drift',
    desc: 'Frame-by-frame generation keeps your story on track. No more wandering AI narratives.',
    color: 'bg-cartoon-yellow',
  },
  {
    icon: '👤',
    title: 'Consistent Characters',
    desc: 'Your character stays the same from frame 1 to frame 240. Reliable, repeatable art.',
    color: 'bg-cartoon-blue',
  },
  {
    icon: '📽️',
    title: 'Export MP4 + PDF',
    desc: 'Get a video to share online AND a printable PDF flipbook you can hold in your hands.',
    color: 'bg-cartoon-red',
  },
]

export default function Hero() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#FFF9E6] to-[#FFFBF0]">
        <div className="max-w-3xl mx-auto">
          <div className="text-8xl mb-6 animate-bounce-cartoon inline-block">📚</div>
          <h1 className="text-5xl md:text-6xl font-black text-cartoon-dark mb-6 leading-tight">
            Create long cartoon<br />
            <span className="text-cartoon-blue underline decoration-wavy decoration-cartoon-yellow">
              animations
            </span>{' '}
            —{' '}
            <span className="text-cartoon-red">the flipbook way</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
            Type your story. Watch it come alive frame by frame. Export as MP4 or a real flipbook PDF you can print and flip!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="btn-yellow text-lg px-10 py-4">
                🚀 Start Creating — It's Free
              </button>
            </Link>
            <Link href="/login">
              <button className="btn-cartoon bg-white text-cartoon-dark text-lg px-8 py-4">
                I have an account
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">No credit card needed • Works without AI API keys</p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-center text-cartoon-dark mb-12">
          Why FlipBook Studio? 🤔
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className={`card-cartoon ${f.color} bg-opacity-20`}>
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-black text-cartoon-dark mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-cartoon-blue bg-opacity-10 border-y-3 border-cartoon-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-cartoon-dark mb-12">How It Works ⚙️</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { step: '1', icon: '✍️', label: 'Write your story' },
              { step: '2', icon: '🎬', label: 'AI creates storyboard' },
              { step: '3', icon: '🖼️', label: 'Frames generate live' },
              { step: '4', icon: '📥', label: 'Download MP4 + PDF' },
            ].map((s) => (
              <div key={s.step} className="card-cartoon bg-white text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="w-8 h-8 rounded-full bg-cartoon-yellow border-3 border-cartoon-dark font-black text-sm flex items-center justify-center mx-auto mb-2">
                  {s.step}
                </div>
                <p className="font-bold text-cartoon-dark">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-black text-cartoon-dark mb-6">Ready to flip? 🎉</h2>
        <Link href="/signup">
          <button className="btn-yellow text-xl px-12 py-5">
            Create Your First Flipbook →
          </button>
        </Link>
      </section>
    </div>
  )
}
