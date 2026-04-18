import { NextRequest } from 'next/server'
import { getAgentById } from '@/lib/airtable'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { messages, agentId } = await req.json()
    if (!agentId || !messages || !Array.isArray(messages)) return new Response(JSON.stringify({ error: 'agentId and messages required' }), { status: 400 })
    const agent = await getAgentById(agentId)
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) return new Response(JSON.stringify({ error: 'Service unavailable' }), { status: 503 })
    const validMessages = messages.filter((m: any) => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string').slice(-20).map((m: any) => ({ role: m.role, content: m.content.slice(0, 4000) }))
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'https://basmaworld.com', 'X-Title': `AgentWorld — ${agent.name}` },
      body: JSON.stringify({ model: agent.model, stream: true, messages: [{ role: 'system', content: agent.persona }, ...validMessages], max_tokens: 1000, temperature: 0.7 }),
    })
    if (!response.ok) return new Response(await response.text(), { status: response.status })
    return new Response(response.body, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
