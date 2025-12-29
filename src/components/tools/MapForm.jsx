import { useState } from 'react'

function MapForm({ onExecute, loading }) {
  const [url, setUrl] = useState('')
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('100')
  const [includeSubdomains, setIncludeSubdomains] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = { url }
    if (search) params.search = search
    if (limit) params.limit = parseInt(limit)
    if (includeSubdomains) params.includeSubdomains = true

    onExecute(params)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Website URL</label>
        <input
          type="url"
          className="form-input"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Search filter (optional)</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. blog, docs, api"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Limit</label>
        <input
          type="number"
          className="form-input"
          placeholder="100"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="includeSubdomains"
            checked={includeSubdomains}
            onChange={() => setIncludeSubdomains(!includeSubdomains)}
          />
          <label htmlFor="includeSubdomains">Include subdomains</label>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={loading || !url}>
          {loading ? 'Mapping...' : '🗺️ Map Website'}
        </button>
      </div>
    </form>
  )
}

export default MapForm
