export interface AuthUser {
  user_id: string
  email: string
  access_token: string
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('flipbook_token')
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('flipbook_user')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setAuth(user: AuthUser) {
  localStorage.setItem('flipbook_token', user.access_token)
  localStorage.setItem('flipbook_user', JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem('flipbook_token')
  localStorage.removeItem('flipbook_user')
}

export function isLoggedIn(): boolean {
  return !!getToken()
}
