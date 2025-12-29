import { useState } from 'react'

function ExtractForm({ onExecute, loading }) {
  const [urls, setUrls] = useState('')
  const [prompt, setPrompt] = useState('')
  const [schema, setSchema] = useState('')
  const [enableWebSearch, setEnableWebSearch] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlList = urls.split('\n').map(u => u.trim()).filter(u => u)

    const params = {
      urls: urlList,
    }

    if (prompt) params.prompt = prompt

    if (schema) {
      try {
        params.schema = JSON.parse(schema)
      } catch (err) {
        alert('Invalid JSON schema')
        return
      }
    }

    if (enableWebSearch) params.enableWebSearch = true

    onExecute(params)
  }

  const sampleSchema = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number" },
    "description": { "type": "string" }
  },
  "required": ["name", "price"]
}`

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">URLs (one per line)</label>
        <textarea
          className="form-input"
          placeholder="https://example.com/page1&#10;https://example.com/page2"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          required
          rows={4}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Extraction Prompt</label>
        <textarea
          className="form-input"
          placeholder="e.g. Extract product name, price, and description"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          JSON Schema (optional)
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

      <div className="form-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="enableWebSearch"
            checked={enableWebSearch}
            onChange={() => setEnableWebSearch(!enableWebSearch)}
          />
          <label htmlFor="enableWebSearch">Enable web search for context</label>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={loading || !urls}>
          {loading ? 'Extracting...' : '📊 Extract Data'}
        </button>
      </div>
    </form>
  )
}

export default ExtractForm
