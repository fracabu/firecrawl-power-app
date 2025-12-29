import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load .env file from project root
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

const app = express()
const PORT = 3001

// Firecrawl API configuration
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1'

app.use(cors())
app.use(express.json())

// Helper function to call Firecrawl API
async function callFirecrawl(endpoint, method, body, apiKey) {
  if (!apiKey) {
    throw new Error('API key required. Please add your Firecrawl API key in settings.')
  }

  const response = await fetch(`${FIRECRAWL_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Firecrawl API error')
  }

  return data
}

// Get API key from request header or fallback to env
function getApiKey(req) {
  return req.headers['x-api-key'] || process.env.FIRECRAWL_API_KEY
}

// Scrape endpoint
app.post('/api/scrape', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl('/scrape', 'POST', req.body, apiKey)
    res.json(result.data || result)
  } catch (error) {
    console.error('Scrape error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Map endpoint
app.post('/api/map', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl('/map', 'POST', req.body, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Map error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Search endpoint
app.post('/api/search', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl('/search', 'POST', req.body, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Search error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Crawl endpoint
app.post('/api/crawl', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl('/crawl', 'POST', req.body, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Crawl error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Check crawl status
app.get('/api/crawl/:id', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl(`/crawl/${req.params.id}`, 'GET', null, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Crawl status error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Extract endpoint
app.post('/api/extract', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl('/extract', 'POST', req.body, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Extract error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Agent endpoint
app.post('/api/agent', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl('/agent', 'POST', req.body, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Agent error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Check agent status
app.get('/api/agent/:id', async (req, res) => {
  try {
    const apiKey = getApiKey(req)
    const result = await callFirecrawl(`/agent/${req.params.id}`, 'GET', null, apiKey)
    res.json(result)
  } catch (error) {
    console.error('Agent status error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`🔥 Firecrawl Power App API running on http://localhost:${PORT}`)
})
