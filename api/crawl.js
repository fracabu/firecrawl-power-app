const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = req.headers['x-api-key'] || process.env.FIRECRAWL_API_KEY

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required. Please add your Firecrawl API key in settings.' })
  }

  try {
    const response = await fetch(`${FIRECRAWL_API_URL}/crawl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Firecrawl API error')
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
