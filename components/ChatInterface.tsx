'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Bot, User, RotateCcw } from 'lucide-react'
import { Message, Agent } from '@/lib/types'

export default function ChatInterface({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function sendMessage() {
    const userMessage = input.trim()
    if (!userMessage || streaming) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages([...newMessages, { role: 'assistant', content: '' }])
    setStreaming(true)
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ agentId: agent.id, messages: newMessages }) })
      if (!res.ok || !res.body) throw new Error('Failed to connect')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value, { stream: true }).split('\n').filter(l => l.trim())
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content || ''
            assistantMessage += delta
            setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: assistantMessage }])
          } catch {}
        }
      }
    } catch (err: any) {
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: `Sorry, something went wrong: ${err.message}` }])
    } finally {
      setStreaming(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4"><Bot size={32} className="text-purple-400" /></div>
            <h3 className="text-lg font-semibold mb-2">Chat with {agent.name}</h3>
            <p className="text-white/30 text-sm max-w-sm">{agent.description || 'Send a message to start the conversation.'}</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-purple-600/20 border border-purple-500/20' : 'bg-white/5 border border-white/10'}`}>
              {msg.role === 'user' ? <User size={16} className="text-purple-400" /> : <Bot size={16} className="text-white/60" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-600/20 border border-purple-500/20 text-white' : 'bg-white/5 border border-white/10 text-white/80'}`}>
              {msg.content || <span className="flex gap-1"><span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" /><span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{animationDelay:'300ms'}} /></span>}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="flex items-end gap-3">
          {messages.length > 0 && <button onClick={() => setMessages([])} className="p-2.5 text-white/20 hover:text-white/60 hover:bg-white/5 rounded-xl transition-all"><RotateCcw size={16} /></button>}
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={`Message ${agent.name}...`} rows={1} disabled={streaming} className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors resize-none disabled:opacity-50" />
          <button onClick={sendMessage} disabled={!input.trim() || streaming} className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-30 text-white rounded-xl transition-all">
            {streaming ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-xs text-white/20 mt-2 text-center">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
