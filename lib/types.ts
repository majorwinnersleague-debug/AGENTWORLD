export interface Agent {
  id: string
  name: string
  persona: string
  model: string
  createdAt: string
  description?: string
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface OpenRouterModel {
  id: string
  name: string
  description: string
}

export const AVAILABLE_MODELS: OpenRouterModel[] = [
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', description: 'Fast & smart — great for most agents' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Most intelligent — best for complex agents' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'OpenAI flagship — versatile and powerful' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', description: 'Lightweight & affordable' },
  { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Open source — free to use' },
]
