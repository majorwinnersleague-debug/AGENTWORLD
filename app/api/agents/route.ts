import { NextRequest, NextResponse } from 'next/server'
import { createAgent, getAllAgents } from '@/lib/airtable'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const agents = await getAllAgents()
    return NextResponse.json(agents)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, persona, model, description } = body
    if (!name || !persona || !model) return NextResponse.json({ error: 'name, persona, and model are required' }, { status: 400 })
    if (name.length > 100) return NextResponse.json({ error: 'Name too long' }, { status: 400 })
    if (persona.length > 2000) return NextResponse.json({ error: 'Persona too long' }, { status: 400 })
    const agent = await createAgent({ name, persona, model, description })
    return NextResponse.json(agent, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
