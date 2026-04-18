const AIRTABLE_PAT = process.env.AIRTABLE_PAT!
const AIRTABLE_BASE = process.env.AIRTABLE_AGENTWORLD_BASE!
const TABLE = 'Agents'
const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE}`
const headers = {
  Authorization: `Bearer ${AIRTABLE_PAT}`,
  'Content-Type': 'application/json',
}

export async function createAgent(data: { name: string; persona: string; model: string; description?: string }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      records: [{ fields: { Name: data.name, Persona: data.persona, Model: data.model, Description: data.description || '', CreatedAt: new Date().toISOString() } }],
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  const json = await res.json()
  const r = json.records[0]
  return { id: r.id, name: r.fields.Name, persona: r.fields.Persona, model: r.fields.Model, description: r.fields.Description, createdAt: r.fields.CreatedAt }
}

export async function getAllAgents() {
  const res = await fetch(`${BASE_URL}?sort[0][field]=CreatedAt&sort[0][direction]=desc`, { headers, next: { revalidate: 60 } } as any)
  if (!res.ok) throw new Error('Failed to fetch agents')
  const json = await res.json()
  return json.records.map((r: any) => ({ id: r.id, name: r.fields.Name, persona: r.fields.Persona, model: r.fields.Model, description: r.fields.Description || '', createdAt: r.fields.CreatedAt }))
}

export async function getAgentById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { headers })
  if (!res.ok) throw new Error(`Agent ${id} not found`)
  const r = await res.json()
  return { id: r.id, name: r.fields.Name, persona: r.fields.Persona, model: r.fields.Model, description: r.fields.Description || '', createdAt: r.fields.CreatedAt }
}
