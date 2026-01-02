import { useState } from 'react'

function SearchForm({ onExecute, loading }) {
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState('10')
  const [sources, setSources] = useState({
    web: true,
    news: false,
  })
  const [scrapeResults, setScrapeResults] = useState(false)

  const handleSourceChange = (source) => {
    setSources(prev => ({ ...prev, [source]: !prev[source] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectedSources = Object.entries(sources)
      .filter(([_, selected]) => selected)
      .map(([type]) => type)

    const params = {
      query,
      limit: parseInt(limit),
    }

    // Only add sources if not just 'web' (default)
    if (selectedSources.length > 0 && !(selectedSources.length === 1 && selectedSources[0] === 'web')) {
      params.sources = selectedSources
    }

    if (scrapeResults) {
      params.scrapeOptions = {
        formats: ['markdown'],
        onlyMainContent: true,
      }
    }

    onExecute(params)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Search Query</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. TV 65 pollici QLED 2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Sources</label>
        <div className="checkbox-group">
          {Object.entries(sources).map(([source, checked]) => (
            <div key={source} className="checkbox-item">
              <input
                type="checkbox"
                id={`source-${source}`}
                checked={checked}
                onChange={() => handleSourceChange(source)}
              />
              <label htmlFor={`source-${source}`}>
                {source.charAt(0).toUpperCase() + source.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Results Limit</label>
        <input
          type="number"
          className="form-input"
          placeholder="10"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="scrapeResults"
            checked={scrapeResults}
            onChange={() => setScrapeResults(!scrapeResults)}
          />
          <label htmlFor="scrapeResults">Scrape content from results</label>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={loading || !query}>
          {loading ? 'Searching...' : '🔍 Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchForm
