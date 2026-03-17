'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser, clearAuth } from '@/lib/auth'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  return (
    <nav className="bg-cartoon-yellow border-b-3 border-cartoon-dark px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-cartoon">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span className="font-bold text-xl text-cartoon-dark">FlipBook Studio</span>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link href="/dashboard">
              <button className="btn-blue text-sm py-2">Dashboard</button>
            </Link>
            <Link href="/studio">
              <button className="btn-cartoon bg-cartoon-green text-white border-cartoon-dark text-sm py-2">
                ✨ Create
              </button>
            </Link>
            <button onClick={handleLogout} className="btn-cartoon bg-white text-cartoon-dark text-sm py-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="btn-cartoon bg-white text-cartoon-dark text-sm py-2">Login</button>
            </Link>
            <Link href="/signup">
              <button className="btn-yellow text-sm py-2">Sign Up Free</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
