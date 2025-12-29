import { useState } from 'react'

function ScrapeForm({ onExecute, loading }) {
  const [url, setUrl] = useState('')
  const [formats, setFormats] = useState({
    markdown: true,
    screenshot: false,
    html: false,
    links: false,
    rawHtml: false,
  })
  const [onlyMainContent, setOnlyMainContent] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [waitFor, setWaitFor] = useState('')
  const [mobile, setMobile] = useState(false)

  const handleFormatChange = (format) => {
    setFormats(prev => ({ ...prev, [format]: !prev[format] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectedFormats = Object.entries(formats)
      .filter(([_, selected]) => selected)
      .map(([format]) => format)

    const params = {
      url,
      formats: selectedFormats,
      onlyMainContent,
    }

    if (waitFor) params.waitFor = parseInt(waitFor)
    if (mobile) params.mobile = true

    onExecute(params)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">URL</label>
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
        <label className="form-label">Output Formats</label>
        <div className="checkbox-group">
          {Object.entries(formats).map(([format, checked]) => (
            <div key={format} className="checkbox-item">
              <input
                type="checkbox"
                id={`format-${format}`}
                checked={checked}
                onChange={() => handleFormatChange(format)}
              />
              <label htmlFor={`format-${format}`}>
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="onlyMainContent"
            checked={onlyMainContent}
            onChange={() => setOnlyMainContent(!onlyMainContent)}
          />
          <label htmlFor="onlyMainContent">Only main content</label>
        </div>
      </div>

      <div className="collapsible">
        <div
          className="collapsible-header"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>Advanced Options</span>
          <span>{showAdvanced ? '▲' : '▼'}</span>
        </div>
        {showAdvanced && (
          <div className="collapsible-content">
            <div className="form-group">
              <label className="form-label">Wait for (ms)</label>
              <input
                type="number"
                className="form-input"
                placeholder="2000"
                value={waitFor}
                onChange={(e) => setWaitFor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="mobile"
                  checked={mobile}
                  onChange={() => setMobile(!mobile)}
                />
                <label htmlFor="mobile">Mobile viewport</label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={loading || !url}>
          {loading ? 'Processing...' : '🔥 Scrape'}
        </button>
      </div>
    </form>
  )
}

export default ScrapeForm
