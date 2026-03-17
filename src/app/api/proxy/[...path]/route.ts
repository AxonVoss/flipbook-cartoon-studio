import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL || 'http://187.77.7.109:8000'

async function proxyRequest(req: NextRequest, { params }: { params: { path: string[] } }, method: string) {
  const path = params.path.join('/')
  const url = `${BACKEND}/${path}`
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const auth = req.headers.get('authorization')
  if (auth) headers['Authorization'] = auth

  let body: string | undefined
  if (!['GET', 'OPTIONS', 'HEAD'].includes(method)) {
    try { body = await req.text() } catch {}
  }

  try {
    const res = await fetch(url, { method, headers, body })
    const data = await res.text()
    return new NextResponse(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 })
  }
}

export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) { return proxyRequest(req, ctx, 'GET') }
export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) { return proxyRequest(req, ctx, 'POST') }
export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) { return proxyRequest(req, ctx, 'PUT') }
export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) { return proxyRequest(req, ctx, 'DELETE') }
export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' } }) }
