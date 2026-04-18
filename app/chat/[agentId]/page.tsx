import { getAgentById } from '@/lib/airtable'
import ChatInterface from '@/components/ChatInterface'
import { notFound } from 'next/navigation'
import { Bot, Cpu } from 'lucide-react'

export default async function ChatPage({ params }: { params: { agentId: string } }) {
  let agent
  try { agent = await getAgentById(params.agentId) } catch { notFound() }
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center">
            <Bot size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="font-semibold">{agent.name}</h2>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Cpu size={10} /><span>{agent.model.split('/')[1]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1" />
              <span className="text-green-400">Online</span>
            </div>
          </div>
        </div>
      </div>
      <ChatInterface agent={agent} />
    </div>
  )
}
