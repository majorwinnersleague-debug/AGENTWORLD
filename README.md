# 🤖 AgentWorld

> **Build, save, and chat with custom AI agents — powered by BasmaWorld.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/majorwinnersleague-debug/AGENTWORLD)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-purple)
![Airtable](https://img.shields.io/badge/DB-Airtable-yellow)

---

## 🌐 Live Demo

**[agentworld.vercel.app](https://agentworld.vercel.app)**

Built and maintained by [BasmaWorld](https://basmaworld.com) — Las Vegas, NV.

---

## ✨ What Is AgentWorld?

AgentWorld is a no-code AI agent builder that lets users:

- **Create** custom AI personalities with a name, system prompt, and model selection
- **Save** agents persistently to Airtable — no database setup required
- **Chat** with any agent using real-time streaming responses
- **Choose** from multiple frontier AI models via OpenRouter (Claude, GPT-4o, Llama, and more)

It was built as the AI infrastructure layer for the **BasmaWorld ecosystem** — powering specialist agents for music education, event logistics, creative writing, grant research, legal review, and social media strategy.

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR, routing, API routes |
| **Language** | TypeScript | Type safety throughout |
| **Styling** | Tailwind CSS | Utility-first dark UI |
| **Icons** | Lucide React | Consistent iconography |
| **Database** | Airtable | Agent storage — zero ops |
| **AI Models** | OpenRouter API | Multi-model inference |
| **Streaming** | Edge Runtime + SSE | Real-time token streaming |
| **Deployment** | Vercel | CI/CD + Edge Network |

---

## 📁 Project Structure

```
agentworld/
├── app/
│   ├── layout.tsx              # Root layout — navbar, footer, BasmaWorld branding
│   ├── page.tsx                # Agent gallery — Master Agents + custom agents
│   ├── globals.css             # BasmaWorld brand variables + base styles
│   ├── create/
│   │   └── page.tsx            # Agent creator form with templates
│   ├── chat/
│   │   └── [agentId]/
│   │       └── page.tsx        # Dynamic chat page per agent
│   └── api/
│       ├── agents/
│       │   ├── route.ts        # GET all / POST new agent
│       │   └── [agentId]/
│       │       └── route.ts    # GET single agent
│       └── chat/
│           └── route.ts        # Streaming chat endpoint (Edge Runtime)
├── components/
│   └── ChatInterface.tsx       # Streaming chat UI — SSE consumer
├── lib/
│   ├── airtable.ts             # Airtable CRUD helpers
│   └── types.ts                # Shared types + available models
├── .env.example                # Required environment variables
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An [Airtable](https://airtable.com) account (free)
- An [OpenRouter](https://openrouter.ai) API key (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/majorwinnersleague-debug/AGENTWORLD.git
cd AGENTWORLD
npm install
```

### 2. Set up Airtable

1. Create a new Airtable base called **AgentWorld**
2. Create a table called **Agents** with these fields:

| Field Name | Type |
|---|---|
| `Name` | Single line text |
| `Persona` | Long text |
| `Model` | Single line text |
| `Description` | Single line text |
| `CreatedAt` | Single line text |

3. Copy your base ID from the URL: `airtable.com/appXXXXXXXXXXXXXX/...`

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
AIRTABLE_PAT=your_airtable_personal_access_token
AIRTABLE_AGENTWORLD_BASE=appXXXXXXXXXXXXXX
OPENROUTER_API_KEY=sk-or-v1-...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🤖 The BasmaWorld Master Agents

AgentWorld ships with 3 pre-built specialist agents for the BasmaWorld ecosystem:

### 🎵 The Vocal Coach
> *8 years of jazz & commercial vocal technique*

Trained on Basma Awada's teaching methodology. Covers breath support, mixed voice, runs and riffs, stage presence, and artist identity development. Encourages every student and ends every session with a specific homework task.

**Best for:** Music Academy students, aspiring singers, vocal warm-up guidance

---

### 🎪 Gateway Festival Assistant
> *Logistics expert for the October 24th Gateway Festival*

Knows every deadline, permit requirement, and vendor timeline for the Historic Westside School event. Tracks critical path items and proactively flags anything at risk.

**Best for:** Event planning, permit checklists, vendor outreach, production scheduling

---

### 🎭 Masqued Creative Partner
> *Theatrical cinematic songwriting in the style of the Masqued album*

Writes in the signature Masqued aesthetic — cinematic pop meets theatrical jazz. Helps users write lyrics, develop concepts, and find their authentic artistic voice through the five Masqued pillars.

**Best for:** Songwriting, creative direction, ghostwriting, artist identity development

---

## 🌐 Supported AI Models

| Model | Provider | Best For |
|---|---|---|
| Claude 3 Haiku | Anthropic | Fast everyday agents |
| Claude 3.5 Sonnet | Anthropic | Complex reasoning agents |
| GPT-4o | OpenAI | Versatile general agents |
| GPT-4o Mini | OpenAI | Lightweight fast agents |
| Llama 3.1 8B | Meta | Free open-source option |

All models are accessed via [OpenRouter](https://openrouter.ai) — a single API key for all providers.

---

## 🔐 Security

- All API routes include input validation and sanitization
- Message role injection is prevented (user cannot inject `system` role messages)
- Rate limiting ready to activate via `lib/rate-limit.ts`
- No secrets exposed to client — all API calls server-side
- Edge Runtime for chat endpoint — fastest possible streaming

---

## 🗺️ Future Roadmap

### Phase 2 — Authentication & Personalization
- [ ] NextAuth.js integration — Google OAuth login
- [ ] Per-user agent libraries — agents saved to user accounts
- [ ] Agent sharing — public URLs for sharing agents
- [ ] Agent cloning — duplicate and customize existing agents

### Phase 3 — Gateway Festival Integration
- [ ] **Festival Command Center** — dedicated dashboard for the October 24th Gateway Festival
- [ ] Real-time vendor check-in system powered by the Gateway Festival Assistant agent
- [ ] Automated permit deadline tracker with Telegram/Slack alerts
- [ ] Artist rider management — agents that parse and summarize contract riders
- [ ] Live audience Q&A agent embedded at festival entry points (kiosk mode)
- [ ] Post-festival analytics agent — synthesizes attendance, vendor revenue, social mentions

### Phase 4 — Music Academy Integration
- [ ] Student progress tracking — agents that know each student's XP and skill level
- [ ] Automated lesson recap emails generated by The Vocal Coach agent
- [ ] Practice session logging — students report practice, agent gives feedback
- [ ] Parent communication agent — sends weekly progress updates

### Phase 5 — Platform Expansion
- [ ] Voice chat mode — speak to agents via microphone, hear responses via TTS
- [ ] Agent marketplace — browse and install community-built agents
- [ ] Webhook triggers — agents that fire on Airtable updates, form submissions, etc.
- [ ] Mobile app (React Native) — AgentWorld in your pocket

---

## 🤝 Contributing

AgentWorld is the internal AI infrastructure for BasmaWorld. External contributions are welcome for:
- New agent templates
- UI improvements
- Performance optimizations
- Documentation

Please open an issue before submitting a PR.

---

## 📄 License

MIT © 2026 [BASMA LLC](https://basmaworld.com) — Las Vegas, NV

---

## 🏠 The BasmaWorld Ecosystem

AgentWorld is one part of the larger BasmaWorld platform:

| Product | Description | URL |
|---|---|---|
| **Become A Singer Music Academy** | Gamified online music lessons | [basmaworld.com/academy](https://basmaworld.com/academy) |
| **Major Winners League** | Las Vegas community media | [basmaworld.com/mwl](https://basmaworld.com/mwl) |
| **Hopes Chance** | Free youth resource navigator | [basmaworld.com/hopes](https://basmaworld.com/hopes) |
| **AgentWorld** | Custom AI agent builder | [agentworld.vercel.app](https://agentworld.vercel.app) |
| **Gateway Festival** | Annual Las Vegas music festival | October 24, 2026 |

---

*Built with 💜 in Las Vegas by [Basma Awada](https://basmaworld.com) and Hermes AI.*
