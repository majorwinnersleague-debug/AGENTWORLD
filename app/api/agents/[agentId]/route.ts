import { NextRequest, NextResponse } from 'next/server'
import { getAgentById } from '@/lib/airtable'

export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest, { params }: { params: { agentId: string } }) {
  try {
    const agent = await getAgentById(params.agentId)
    return NextResponse.json(agent)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 })
  }
}
