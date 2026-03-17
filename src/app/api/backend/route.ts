import { NextRequest, NextResponse } from 'next/server'

const BACKEND = 'http://187.77.7.109:8000'

async function proxy(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || ''
  const url = `${BACKEND}/${path}`
  
  const headers: Record<string, string> = {}
  const auth = req.headers.get('authorization')
  const ct = req.headers.get('content-type')
  if (auth) headers['Authorization'] = auth
  if (ct) headers['Content-Type'] = ct

  let body: string | undefined
  if (!['GET', 'OPTIONS', 'HEAD'].includes(req.method)) {
    try { body = await req.text() } catch {}
  }

  try {
    const res = await fetch(url, { method: req.method, headers, body })
    const contentType = res.headers.get('content-type') || 'application/octet-stream'
    const buffer = await res.arrayBuffer()
    
    return new NextResponse(buffer, {
      status: res.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 })
  }
}

export async function GET(req: NextRequest) { return proxy(req) }
export async function POST(req: NextRequest) { return proxy(req) }
export async function PUT(req: NextRequest) { return proxy(req) }
export async function DELETE(req: NextRequest) { return proxy(req) }
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  }})
}
