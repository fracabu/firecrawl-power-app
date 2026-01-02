<h1 align="center">🔥 Firecrawl Power App</h1>

<p align="center">
  <strong>A sleek, powerful UI to harness the full potential of Firecrawl API</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-italiano">Italiano</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Firecrawl-API-FF4C00?style=for-the-badge" alt="Firecrawl">
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/fracabu/firecrawl-power-app?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/stars/fracabu/firecrawl-power-app?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/fracabu/firecrawl-power-app?style=flat-square" alt="Forks">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
</p>

---
<img width="1600" height="740" alt="image" src="https://github.com/user-attachments/assets/d6442d47-43e5-4fcd-a174-7d960b0f1307" />


## ✨ Features

| Feature | Description | Plan |
|---------|-------------|------|
| 📄 **Scrape** | Extract content from any webpage (Markdown, HTML, Screenshots) | Free |
| 🗺️ **Map** | Discover all URLs on a website | Free |
| 🕷️ **Crawl** | Crawl entire websites with depth control | Free |
| 🔍 **Search** | Search the web with advanced operators | PRO |
| 📊 **Extract** | Extract structured data using AI and JSON schemas | PRO |
| 🤖 **Agent** | Autonomous AI agent for complex data gathering | 5/day free |
| 🌙 **Dark Mode** | Beautiful dark/light theme toggle | Free |
| 🔑 **BYOK** | Bring Your Own Key - use your personal Firecrawl API key | Free |

> **Note:** PRO features require a [paid Firecrawl plan](https://firecrawl.dev/pricing). Free tier includes 500 credits (one-time).

---

## 🎨 Design

Built with the official **Firecrawl design system**:

```css
--primary: #FF4C00;      /* Firecrawl Orange */
--background: #F9F9F9;   /* Light mode */
--surface: #1A1A1A;      /* Dark mode */
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Firecrawl API Key](https://firecrawl.dev) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/fracabu/firecrawl-power-app.git
cd firecrawl-power-app

# Install dependencies
npm install

# Start the app
npm run dev
```

### First Launch

1. Open `http://localhost:5173` in your browser
2. Enter your Firecrawl API key in the modal
3. Start scraping! 🔥

---

## 🔑 API Key Configuration

### Option 1: In-App (Recommended for users)

Simply click the **"API Key"** button in the header and enter your key. It's stored locally in your browser.

### Option 2: Environment Variable (For developers)

```bash
# Create .env file
cp .env.example .env

# Add your API key
FIRECRAWL_API_KEY=fc-your-api-key-here
```

---

## 📦 Project Structure

```
firecrawl-power-app/
├── api/                    # Vercel serverless functions
│   ├── scrape.js
│   ├── map.js
│   ├── search.js
│   ├── crawl.js
│   ├── extract.js
│   └── agent.js
├── server/
│   └── api.js              # Express server (local dev)
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ToolPanel.jsx
│   │   ├── ResultDisplay.jsx
│   │   ├── ApiKeyModal.jsx
│   │   └── tools/
│   │       ├── ScrapeForm.jsx
│   │       ├── MapForm.jsx
│   │       ├── SearchForm.jsx
│   │       ├── CrawlForm.jsx
│   │       ├── ExtractForm.jsx
│   │       └── AgentForm.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## ☁️ Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fracabu/firecrawl-power-app)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

> **Note:** Users will enter their own API keys in the app. No server-side key required!

### Deploy to Other Platforms

The app can be deployed to any platform supporting Node.js:

- **Netlify** - Add `netlify.toml` configuration
- **Railway** - Connect GitHub repo
- **Render** - Create a new Web Service

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Vite + Express) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Firecrawl](https://firecrawl.dev) - The powerful web scraping API
- [Firecrawl MCP](https://docs.firecrawl.dev/mcp-server) - Model Context Protocol server
- [Claude Opus 4.5](https://claude.ai/code) - AI assistant (claude-opus-4-5-20251101)
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool

---

<br>

<h1 align="center" id="-italiano">🇮🇹 Italiano</h1>

<p align="center">
  <strong>Un'interfaccia elegante e potente per sfruttare tutto il potenziale delle API Firecrawl</strong>
</p>

---

## ✨ Funzionalità

| Funzione | Descrizione | Piano |
|----------|-------------|-------|
| 📄 **Scrape** | Estrai contenuti da qualsiasi pagina web (Markdown, HTML, Screenshot) | Free |
| 🗺️ **Map** | Scopri tutti gli URL di un sito web | Free |
| 🕷️ **Crawl** | Scansiona interi siti web con controllo della profondità | Free |
| 🔍 **Search** | Cerca nel web con operatori avanzati | PRO |
| 📊 **Extract** | Estrai dati strutturati usando AI e schemi JSON | PRO |
| 🤖 **Agent** | Agente AI autonomo per raccolta dati complessa | 5/day free |
| 🌙 **Dark Mode** | Bellissimo toggle tema chiaro/scuro | Free |
| 🔑 **BYOK** | Porta la Tua Chiave - usa la tua API key Firecrawl personale | Free |

> **Nota:** Le funzionalità PRO richiedono un [piano Firecrawl a pagamento](https://firecrawl.dev/pricing). Il piano gratuito include 500 crediti (una tantum).

---

## 🚀 Avvio Rapido

### Prerequisiti

- [Node.js](https://nodejs.org/) 18+
- [Chiave API Firecrawl](https://firecrawl.dev) (piano gratuito disponibile)

### Installazione

```bash
# Clona il repository
git clone https://github.com/fracabu/firecrawl-power-app.git
cd firecrawl-power-app

# Installa le dipendenze
npm install

# Avvia l'app
npm run dev
```

### Primo Avvio

1. Apri `http://localhost:5173` nel browser
2. Inserisci la tua chiave API Firecrawl nel modal
3. Inizia a fare scraping! 🔥

---

## 🔑 Configurazione API Key

### Opzione 1: Nell'App (Consigliato per gli utenti)

Clicca semplicemente il pulsante **"API Key"** nell'header e inserisci la tua chiave. Viene salvata localmente nel tuo browser.

### Opzione 2: Variabile d'Ambiente (Per sviluppatori)

```bash
# Crea il file .env
cp .env.example .env

# Aggiungi la tua API key
FIRECRAWL_API_KEY=fc-la-tua-api-key
```

---

## ☁️ Deploy

### Deploy su Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fracabu/firecrawl-power-app)

> **Nota:** Gli utenti inseriranno le proprie API key nell'app. Non è richiesta nessuna chiave lato server!

---

## 🛠️ Script Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo (Vite + Express) |
| `npm run build` | Build per produzione |
| `npm run preview` | Anteprima build di produzione |

---

## 🤝 Contribuire

I contributi sono benvenuti! Sentiti libero di aprire una Pull Request.

1. Fai un fork del repository
2. Crea il tuo branch (`git checkout -b feature/NuovaFunzionalita`)
3. Committa le modifiche (`git commit -m 'Aggiunta NuovaFunzionalita'`)
4. Pusha il branch (`git push origin feature/NuovaFunzionalita`)
5. Apri una Pull Request

---

<p align="center">
  <br>
  <strong>Made with 🔥 and ❤️</strong>
  <br><br>
  <a href="https://firecrawl.dev">
    <img src="https://img.shields.io/badge/Powered%20by-Firecrawl-FF4C00?style=for-the-badge" alt="Powered by Firecrawl">
  </a>
  <a href="https://claude.ai/code">
    <img src="https://img.shields.io/badge/Built%20with-Claude%20Opus%204.5-7C3AED?style=for-the-badge" alt="Built with Claude">
  </a>
</p>
