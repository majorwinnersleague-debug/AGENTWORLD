import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Bot, Plus, Sparkles, Music } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentWorld — Build Your Own AI Agents | BasmaWorld',
  description:
    'Create, save, and chat with custom AI agents powered by Claude, GPT-4o, and more. Built by BasmaWorld.',
  openGraph: {
    title: 'AgentWorld by BasmaWorld',
    description: 'Build your own AI agents',
    url: 'https://agentworld.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen flex flex-col`}>

        {/* ── Navbar ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <span>
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">
                  Agent
                </span>
                <span className="text-white">World</span>
              </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block"
              >
                My Agents
              </Link>
              <Link
                href="https://basmaworld.com"
                target="_blank"
                className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block"
              >
                BasmaWorld
              </Link>
              <Link
                href="/create"
                className="flex items-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]
                           hover:from-[#7C3AED] hover:to-[#6D28D9]
                           text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-lg shadow-purple-900/30"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Agent</span>
                <span className="sm:hidden">New</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Main Content ── */}
        <main className="pt-16 flex-1">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-white/10 py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4">

            {/* Top row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <Link href="https://basmaworld.com" target="_blank" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
                  <Music size={16} className="text-white" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors font-semibold">
                  BasmaWorld
                </span>
              </Link>

              <div className="flex items-center gap-6 text-sm text-white/30">
                <Link href="https://basmaworld.com/academy" target="_blank" className="hover:text-white/60 transition-colors">
                  Music Academy
                </Link>
                <Link href="https://basmaworld.com/mwl" target="_blank" className="hover:text-white/60 transition-colors">
                  MWL
                </Link>
                <Link href="https://basmaworld.com/hopes" target="_blank" className="hover:text-white/60 transition-colors">
                  Hopes Chance
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/20">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#F59E0B]" />
                <span>
                  <span className="text-white/40 font-medium">Powered by BasmaWorld</span>
                  {' '}· AI infrastructure by OpenRouter · © 2026 BASMA LLC
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Las Vegas, NV</span>
                <span>·</span>
                <Link href="https://basmaworld.com" target="_blank" className="hover:text-white/40 transition-colors">
                  basmaworld.com
                </Link>
              </div>
            </div>

          </div>
        </footer>

      </body>
    </html>
  )
}
