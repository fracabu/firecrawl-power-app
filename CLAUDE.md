# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Firecrawl Power App is a React-based UI for the Firecrawl API. It provides a visual interface to all Firecrawl tools: Scrape, Map, Search, Crawl, Extract, and Agent.

**Prerequisites:** Node.js 18+, Firecrawl API key (free tier available at https://firecrawl.dev)

## Development Commands

```bash
# Run both client and server concurrently (main dev command)
npm run dev

# Run only the React frontend (Vite dev server on port 5173)
npm run client

# Run only the Express backend (API server on port 3001)
npm run server

# Build for production
npm run build

# Preview production build
npm run preview
```

After running `npm run dev`, open `http://localhost:5173` in your browser.

## Architecture

### Frontend (React + Vite)
- **Entry**: `src/main.jsx` → `src/App.jsx`
- **App.jsx**: Main orchestrator - manages state for active tool, API key, results, theme
- **Components**:
  - `Sidebar.jsx` / `Header.jsx`: Navigation and settings
  - `ToolPanel.jsx`: Routes to the correct tool form based on `activeTool` state
  - `ResultDisplay.jsx`: Renders API responses (JSON, markdown, screenshots)
  - `ApiKeyModal.jsx`: Manages Firecrawl API key storage in localStorage
- **Tool Forms** (`src/components/tools/`): Each Firecrawl tool has its own form component (ScrapeForm, MapForm, SearchForm, CrawlForm, ExtractForm, AgentForm). Forms handle their own field state and call `onExecute(params)` on submit.

### Backend (Express - Local Development)
- **Single file**: `server/api.js`
- Proxies requests from frontend to Firecrawl API (`https://api.firecrawl.dev/v1`)
- API key passed via `X-API-Key` header from client, falls back to `FIRECRAWL_API_KEY` env var
- Endpoints mirror Firecrawl API: `/api/scrape`, `/api/map`, `/api/search`, `/api/crawl`, `/api/extract`, `/api/agent`
- Status endpoints: `/api/crawl/:id`, `/api/agent/:id`
- Health check: `/api/health`

### Backend (Vercel Serverless - Production)
- **Directory**: `api/` contains individual serverless functions for each endpoint
- Each function (e.g., `api/scrape.js`) is a standalone Vercel serverless function
- Same API key handling as Express backend
- Configured via `vercel.json` with rewrites for `/api/*` routes

### Request Flow
1. User fills form in tool component
2. Form calls `onExecute(params)` → `App.handleExecute()`
3. Frontend POSTs to `/api/{tool}` with API key header
4. Vite proxy forwards `/api/*` to Express server (port 3001)
5. Express calls Firecrawl API with Bearer auth
6. Response flows back through to `ResultDisplay`

## Configuration

- **Vite proxy**: `vite.config.js` - proxies `/api` to backend (port 3001)
- **Environment**: Copy `.env.example` to `.env` for `FIRECRAWL_API_KEY` (optional server-side fallback)
- **Theme**: Stored in localStorage, applied via `data-theme` attribute on `<html>`
- **API Key**: Stored in localStorage as `firecrawl_api_key`
- **Design System**: Uses Firecrawl brand colors (`--primary: #FF4C00`)

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Central state management, tool definitions, API calls |
| `server/api.js` | All backend routes, Firecrawl API proxy logic (local dev) |
| `api/*.js` | Vercel serverless functions (production) |
| `src/App.css` | All styles including CSS variables for theming |
| `vite.config.js` | Dev server config, API proxy settings |
| `vercel.json` | Production deployment config and API rewrites |
| `FIRECRAWL_DOCUMENTATION.md` | Complete Firecrawl API reference (in Italian) |

## TODO

- [ ] **Verificare Agent 5 richieste gratis/giorno** - La documentazione Firecrawl menziona 5 richieste Agent gratuite al giorno. Se confermato, aggiornare:
  - Badge PRO in sidebar (potrebbe diventare "5/day free")
  - Nota nel ToolPanel per Agent
  - README (tabella features)
