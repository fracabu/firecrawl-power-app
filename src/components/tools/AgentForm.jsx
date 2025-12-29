import { useState } from 'react'

function AgentForm({ onExecute, loading }) {
  const [prompt, setPrompt] = useState('')
  const [urls, setUrls] = useState('')
  const [schema, setSchema] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = { prompt }

    if (urls) {
      params.urls = urls.split('\n').map(u => u.trim()).filter(u => u)
    }

    if (schema) {
      try {
        params.schema = JSON.parse(schema)
      } catch (err) {
        alert('Invalid JSON schema')
        return
      }
    }

    onExecute(params)
  }

  const sampleSchema = `{
  "type": "object",
  "properties": {
    "companies": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "funding": { "type": "string" },
          "description": { "type": "string" }
        }
      }
    }
  }
}`

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">What do you want to find?</label>
        <textarea
          className="form-input"
          placeholder="e.g. Find the top 5 AI startups founded in 2024 with their funding amounts and descriptions"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
          rows={4}
        />
        <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
          The agent will autonomously search, navigate, and extract data from the web
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Focus URLs (optional, one per line)</label>
        <textarea
          className="form-input"
          placeholder="https://example.com/page1&#10;https://example.com/page2"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={3}
        />
        <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
          Leave empty to let the agent search freely
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">
          Output Schema (optional)
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginLeft: '12px', padding: '4px 8px', fontSize: '12px' }}
            onClick={() => setSchema(sampleSchema)}
          >
            Load Example
          </button>
        </label>
        <textarea
          className="form-input"
          placeholder="JSON schema for structured output..."
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          rows={8}
          style={{ fontFamily: 'monospace' }}
        />
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={loading || !prompt}>
          {loading ? 'Agent working...' : '🤖 Launch Agent'}
        </button>
      </div>
    </form>
  )
}

export default AgentForm
