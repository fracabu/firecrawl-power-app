import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ToolPanel from './components/ToolPanel'
import ResultDisplay from './components/ResultDisplay'
import ApiKeyModal from './components/ApiKeyModal'

const tools = [
  { id: 'scrape', name: 'Scrape', icon: '📄', description: 'Extract content from a single page' },
  { id: 'map', name: 'Map', icon: '🗺️', description: 'Discover all URLs on a website' },
  { id: 'search', name: 'Search', icon: '🔍', description: 'Search the web and extract content' },
  { id: 'crawl', name: 'Crawl', icon: '🕷️', description: 'Crawl entire websites' },
  { id: 'extract', name: 'Extract', icon: '📊', description: 'Extract structured data with AI' },
  { id: 'agent', name: 'Agent', icon: '🤖', description: 'Autonomous web data gathering' },
]

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('firecrawl_api_key') || ''
  })
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTool, setActiveTool] = useState('scrape')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Show modal on first visit if no API key
  useEffect(() => {
    if (!apiKey) {
      setShowApiKeyModal(true)
    }
  }, [])

  // Close sidebar on tool select (mobile)
  const handleSelectTool = (toolId) => {
    setActiveTool(toolId)
    setSidebarOpen(false)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleExecute = async (toolId, params) => {
    if (!apiKey) {
      setShowApiKeyModal(true)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/${toolId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Request failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const currentTool = tools.find(t => t.id === activeTool)

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setShowApiKeyModal(true)}
        hasApiKey={!!apiKey}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        tools={tools}
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
        isOpen={sidebarOpen}
      />
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        {!apiKey && (
          <div className="api-key-banner">
            <span>No API key configured.</span>
            <button onClick={() => setShowApiKeyModal(true)}>
              Add API Key
            </button>
          </div>
        )}
        <div className="content-wrapper">
          <ToolPanel
            tool={currentTool}
            onExecute={(params) => handleExecute(activeTool, params)}
            loading={loading}
          />
          <ResultDisplay
            result={result}
            error={error}
            loading={loading}
            toolId={activeTool}
          />
        </div>
      </main>
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={setApiKey}
      />
    </div>
  )
}

export default App
