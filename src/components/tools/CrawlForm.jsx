import { useState } from 'react'

function CrawlForm({ onExecute, loading }) {
  const [url, setUrl] = useState('')
  const [limit, setLimit] = useState('20')
  const [maxDepth, setMaxDepth] = useState('3')
  const [includePaths, setIncludePaths] = useState('')
  const [excludePaths, setExcludePaths] = useState('')
  const [allowExternalLinks, setAllowExternalLinks] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = {
      url,
      limit: parseInt(limit),
      maxDiscoveryDepth: parseInt(maxDepth),
    }

    if (includePaths) {
      params.includePaths = includePaths.split(',').map(p => p.trim())
    }
    if (excludePaths) {
      params.excludePaths = excludePaths.split(',').map(p => p.trim())
    }
    if (allowExternalLinks) {
      params.allowExternalLinks = true
    }

    onExecute(params)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Start URL</label>
        <input
          type="url"
          className="form-input"
          placeholder="https://example.com/docs"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Page Limit</label>
        <input
          type="number"
          className="form-input"
          placeholder="20"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
          Keep this low to avoid token overflow
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Max Discovery Depth</label>
        <input
          type="number"
          className="form-input"
          placeholder="3"
          value={maxDepth}
          onChange={(e) => setMaxDepth(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Include Paths (comma-separated)</label>
        <input
          type="text"
          className="form-input"
          placeholder="/blog/*, /docs/*"
          value={includePaths}
          onChange={(e) => setIncludePaths(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Exclude Paths (comma-separated)</label>
        <input
          type="text"
          className="form-input"
          placeholder="/archive/*, /old/*"
          value={excludePaths}
          onChange={(e) => setExcludePaths(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="allowExternalLinks"
            checked={allowExternalLinks}
            onChange={() => setAllowExternalLinks(!allowExternalLinks)}
          />
          <label htmlFor="allowExternalLinks">Allow external links</label>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={loading || !url}>
          {loading ? 'Crawling...' : '🕷️ Start Crawl'}
        </button>
      </div>
    </form>
  )
}

export default CrawlForm
