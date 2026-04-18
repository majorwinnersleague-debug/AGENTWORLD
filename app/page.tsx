import Link from 'next/link'
import { getAllAgents } from '@/lib/airtable'
import { Bot, Plus, MessageSquare, Cpu, Mic, Calendar, Palette } from 'lucide-react'
import { Agent } from '@/lib/types'

export const revalidate = 60

// Map agent names to icons + accent colors for the Master Agents
function getAgentStyle(name: string): { icon: React.ReactNode; accent: string; gradient: string } {
  const n = name.toLowerCase()
  if (n.includes('vocal') || n.includes('coach')) {
    return {
      icon: <Mic size={24} className="text-[#F59E0B]" />,
      accent: 'border-[#F59E0B]/30 hover:border-[#F59E0B]/60',
      gradient: 'from-[#F59E0B]/20 to-[#EF4444]/10',
    }
  }
  if (n.includes('gateway') || n.includes('festival')) {
    return {
      icon: <Calendar size={24} className="text-[#22C55E]" />,
      accent: 'border-[#22C55E]/30 hover:border-[#22C55E]/60',
      gradient: 'from-[#22C55E]/20 to-[#14B8A6]/10',
    }
  }
  if (n.includes('masqued') || n.includes('creative')) {
    return {
      icon: <Palette size={24} className="text-[#EC4899]" />,
      accent: 'border-[#EC4899]/30 hover:border-[#EC4899]/60',
      gradient: 'from-[#EC4899]/20 to-[#8B5CF6]/10',
    }
  }
  return {
    icon: <Bot size={24} className="text-[#8B5CF6]" />,
    accent: 'border-purple-500/30 hover:border-purple-500/60',
    gradient: 'from-[#8B5CF6]/20 to-[#EC4899]/10',
  }
}

export default async function HomePage() {
  let agents: Agent[] = []
  try {
    agents = await getAllAgents()
  } catch {
    agents = []
  }

  const masterAgents = agents.filter(a =>
    ['vocal coach', 'gateway festival', 'masqued'].some(k => a.name.toLowerCase().includes(k))
  )
  const customAgents = agents.filter(a =>
    !['vocal coach', 'gateway festival', 'masqued'].some(k => a.name.toLowerCase().includes(k))
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* ── Hero Header ── */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20
                        text-[#8B5CF6] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          BasmaWorld AI Ecosystem
        </div>
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Your{' '}
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent">
            AI Agents
          </span>
        </h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto">
          Custom AI personalities for every part of the BasmaWorld ecosystem.
          Create, save, and chat instantly.
        </p>
      </div>

      {agents.length === 0 ? (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20
                          border border-white/10 flex items-center justify-center mb-8">
            <Bot size={44} className="text-[#8B5CF6]" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">No agents yet</h2>
          <p className="text-white/30 mb-8 max-w-sm">
            Add the 3 BasmaWorld Master Agents to Airtable, or create your own custom agent below.
          </p>
          <Link
            href="/create"
            className="flex items-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]
                       text-white font-medium px-6 py-3 rounded-xl transition-all
                       hover:shadow-lg hover:shadow-purple-900/40"
          >
            <Plus size={18} />
            Create Your First Agent
          </Link>
        </div>
      ) : (
        <div className="space-y-12">

          {/* ── Master Agents Section ── */}
          {masterAgents.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-[#8B5CF6]/40 to-transparent" />
                <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest px-3">
                  ✦ BasmaWorld Master Agents
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-[#8B5CF6]/40 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {masterAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} isMaster />
                ))}
              </div>
            </section>
          )}

          {/* ── Custom Agents Section ── */}
          <section>
            {customAgents.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3">
                    My Custom Agents
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Create New Card */}
              <Link
                href="/create"
                className="group border-2 border-dashed border-white/10 hover:border-[#8B5CF6]/50
                           rounded-2xl p-6 flex flex-col items-center justify-center gap-3
                           transition-all hover:bg-[#8B5CF6]/5 min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 group-hover:bg-[#8B5CF6]/20
                                flex items-center justify-center transition-colors">
                  <Plus size={24} className="text-[#8B5CF6]" />
                </div>
                <span className="text-white/40 group-hover:text-white/70 font-medium transition-colors text-sm">
                  New Agent
                </span>
              </Link>

              {customAgents.map(agent => (
                <AgentCard key={agent.id} agent={agent} isMaster={false} />
              ))}
            </div>
          </section>

        </div>
      )}
    </div>
  )
}

function AgentCard({ agent, isMaster }: { agent: Agent; isMaster: boolean }) {
  const style = getAgentStyle(agent.name)
  const modelShortName = agent.model.split('/')[1] || agent.model

  return (
    <div className={`group border bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-6
                     transition-all flex flex-col gap-4 ${style.accent}
                     ${isMaster ? 'shadow-lg shadow-black/20' : ''}`}>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient}
                         border border-white/10 flex items-center justify-center flex-shrink-0`}>
          {style.icon}
        </div>
        <div className="flex flex-col items-end gap-1">
          {isMaster && (
            <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10
                             border border-[#F59E0B]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              ✦ Master
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-white/20 bg-white/5 px-2 py-1 rounded-full">
            <Cpu size={10} />
            {modelShortName}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1.5 leading-tight">{agent.name}</h3>
        {agent.description && (
          <p className="text-white/40 text-sm leading-relaxed">{agent.description}</p>
        )}
      </div>

      {/* Chat Button */}
      <Link
        href={`/chat/${agent.id}`}
        className={`flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition-all
                    ${isMaster
                      ? `bg-gradient-to-r ${style.gradient} border border-white/10 text-white hover:border-white/20`
                      : 'bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] border border-[#8B5CF6]/20 hover:border-[#8B5CF6] text-[#8B5CF6] hover:text-white'
                    }`}
      >
        <MessageSquare size={16} />
        Start Chatting
      </Link>
    </div>
  )
}
