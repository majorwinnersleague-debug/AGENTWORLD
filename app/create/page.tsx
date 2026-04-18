'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Wand2, ChevronDown, Loader2, CheckCircle } from 'lucide-react'
import { AVAILABLE_MODELS } from '@/lib/types'

const TEMPLATES = [
  { label: '🎵 Vocal Coach', persona: 'You are an expert vocal coach specializing in jazz and pop technique. You give warm, encouraging feedback and practical exercises. You always ask about the student\'s goals first.' },
  { label: '💼 Business Advisor', persona: 'You are a sharp business strategist with 20 years of entrepreneurship experience. You ask clarifying questions before giving advice and always tie recommendations to ROI.' },
  { label: '✍️ Ghostwriter', persona: 'You are a professional ghostwriter who perfectly matches the user\'s voice. You ask for 3 examples of their writing before producing anything. You never sound generic.' },
  { label: '🧘 Life Coach', persona: 'You are a compassionate life coach who uses motivational interviewing. You reflect back what users say, ask powerful questions, and never give unsolicited advice.' },
]

export default function CreateAgentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', description: '', persona: '', model: 'anthropic/claude-3-haiku' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/agents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed') }
      const agent = await res.json()
      setSuccess(true)
      setTimeout(() => router.push(`/chat/${agent.id}`), 1000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <Wand2 size={24} className="text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Create an Agent</h1>
          <p className="text-white/40 text-sm">Give your AI a name, personality, and model</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Agent Name *</label>
          <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Vocal Coach, Business Advisor..." className="w-full bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Short Description</label>
          <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="e.g. Expert in jazz vocal technique" className="w-full bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-white/70">System Prompt / Persona *</label>
            <span className="text-xs text-white/30">{form.persona.length}/2000</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {TEMPLATES.map(t => (
              <button key={t.label} type="button" onClick={() => setForm({...form, persona: t.persona})} className="text-xs bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-white/50 hover:text-white/80 px-3 py-1.5 rounded-lg transition-all">{t.label}</button>
            ))}
          </div>
          <textarea required value={form.persona} onChange={e => setForm({...form, persona: e.target.value})} placeholder="You are an expert in... You always... You never..." rows={6} maxLength={2000} className="w-full bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors resize-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">AI Model *</label>
          <div className="relative">
            <select value={form.model} onChange={e => setForm({...form, model: e.target.value})} className="w-full appearance-none bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors cursor-pointer">
              {AVAILABLE_MODELS.map(m => <option key={m.id} value={m.id} className="bg-[#1a1a1a]">{m.name} — {m.description}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          </div>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
        <button type="submit" disabled={loading || success} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all">
          {success ? <><CheckCircle size={18} />Agent Created! Launching chat...</> : loading ? <><Loader2 size={18} className="animate-spin" />Creating...</> : <><Bot size={18} />Create Agent & Start Chatting</>}
        </button>
      </form>
    </div>
  )
}
