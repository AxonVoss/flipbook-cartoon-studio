import { getToken } from './auth'

const API_BASE = '/api/proxy'

async function request(path: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }

  return res.json()
}

export const api = {
  // Auth
  signup: (email: string, password: string) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  guestLogin: () =>
    request('/auth/guest', { method: 'POST' }),

  // Projects
  listProjects: () => request('/projects'),
  createProject: (data: any) =>
    request('/projects', { method: 'POST', body: JSON.stringify(data) }),
  getProject: (id: string) => request(`/projects/${id}`),
  deleteProject: (id: string) =>
    request(`/projects/${id}`, { method: 'DELETE' }),
  getFrames: (id: string) => request(`/projects/${id}/frames`),

  // Generate
  storyboard: (data: any) =>
    request('/generate/storyboard', { method: 'POST', body: JSON.stringify(data) }),
  startGeneration: (projectId: string, model = 'mock') =>
    request('/generate/start', { method: 'POST', body: JSON.stringify({ project_id: projectId, model }) }),
  jobStatus: (jobId: string) => request(`/generate/status/${jobId}`),
  regenerateFrame: (projectId: string, frameNumber: number, model = 'mock') =>
    request('/generate/regenerate-frame', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, frame_number: frameNumber, model }),
    }),
}

export function createWebSocket(jobId: string): WebSocket {
  const wsBase = (API_BASE || 'http://localhost:8000').replace(/^http/, 'ws')
  return new WebSocket(`${wsBase}/ws/${jobId}`)
}

export { API_BASE }
