'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { api } from '@/lib/api'
import { setAuth } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.login(email, password)
      setAuth(res)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = async () => {
    setLoading(true)
    try {
      const res = await api.guestLogin()
      setAuth(res)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Guest login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="card-cartoon w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">📚</div>
            <h1 className="text-3xl font-black text-cartoon-dark">Welcome Back!</h1>
            <p className="text-gray-500 mt-1">Log in to your flipbook studio</p>
          </div>

          {error && (
            <div className="bg-cartoon-red bg-opacity-10 border-2 border-cartoon-red rounded-xl p-3 text-sm text-cartoon-red font-bold mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-cartoon-dark mb-1">Email</label>
              <input
                type="email"
                className="input-cartoon"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-bold text-cartoon-dark mb-1">Password</label>
              <input
                type="password"
                className="input-cartoon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-yellow w-full py-3 text-lg disabled:opacity-50">
              {loading ? '⏳ Logging in...' : '🚀 Log In'}
            </button>
          </form>

          <div className="relative my-4">
            <div className="border-t-2 border-gray-200" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-gray-400 text-sm">or</span>
          </div>

          <button
            onClick={handleGuest}
            disabled={loading}
            className="btn-cartoon bg-gray-100 text-cartoon-dark w-full py-3 disabled:opacity-50"
          >
            👻 Continue as Guest
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            No account?{' '}
            <Link href="/signup" className="font-bold text-cartoon-blue underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
