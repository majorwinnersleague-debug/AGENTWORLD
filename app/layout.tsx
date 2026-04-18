import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Bot, Plus, Sparkles } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentWorld — Build Your Own AI Agents',
  description: 'Create, save, and chat with custom AI agents powered by Claude, GPT-4o, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen`}>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Bot className="text-purple-400" size={24} />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AgentWorld</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">My Agents</Link>
              <Link href="/create" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                <Plus size={16} />New Agent
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-16 min-h-screen">{children}</main>
        <footer className="border-t border-white/10 py-6 text-center text-white/30 text-sm">
          <div className="flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-purple-400" />
            <span>AgentWorld by BasmaWorld · Powered by OpenRouter</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
