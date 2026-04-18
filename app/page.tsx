import Link from 'next/link'
import { getAllAgents } from '@/lib/airtable'
import { Bot, Plus, MessageSquare, Cpu } from 'lucide-react'
import { Agent } from '@/lib/types'

export const revalidate = 60

export default async function HomePage() {
  let agents: Agent[] = []
  try { agents = await getAllAgents() } catch { agents = [] }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Agents</span></h1>
        <p className="text-white/50 text-lg">Create custom AI personalities and chat with them instantly.</p>
      </div>
      {agents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
            <Bot size={40} className="text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">No agents yet</h2>
          <p className="text-white/40 mb-8 max-w-sm">Create your first AI agent — give it a name, a personality, and start chatting.</p>
          <Link href="/create" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
            <Plus size={18} />Create Your First Agent
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/create" className="group border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:bg-purple-500/5 min-h-[200px]">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
              <Plus size={24} className="text-purple-400" />
            </div>
            <span className="text-white/50 group-hover:text-white/70 font-medium transition-colors">New Agent</span>
          </Link>
          {agents.map((agent) => (
            <div key={agent.id} className="group border border-white/10 hover:border-purple-500/30 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-6 transition-all flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center">
                  <Bot size={24} className="text-purple-400" />
                </div>
                <span className="flex items-center gap-1 text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">
                  <Cpu size={10} />{agent.model.split('/')[1] || agent.model}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
                {agent.description && <p className="text-white/40 text-sm">{agent.description}</p>}
              </div>
              <Link href={`/chat/${agent.id}`} className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white text-sm font-medium py-2.5 rounded-xl transition-all">
                <MessageSquare size={16} />Start Chatting
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
