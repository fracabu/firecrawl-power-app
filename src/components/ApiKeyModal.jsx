import { useState, useEffect } from 'react'

function ApiKeyModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    const savedKey = localStorage.getItem('firecrawl_api_key') || ''
    setApiKey(savedKey)
  }, [isOpen])

  const handleSave = () => {
    localStorage.setItem('firecrawl_api_key', apiKey)
    onSave(apiKey)
    onClose()
  }

  const handleClear = () => {
    localStorage.removeItem('firecrawl_api_key')
    setApiKey('')
    onSave('')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>API Key Settings</h2>
          <button className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-body">
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Enter your Firecrawl API key. Get one at{' '}
            <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
              firecrawl.dev
            </a>
          </p>
          <div className="form-group">
            <label className="form-label">API Key</label>
            <input
              type="password"
              className="form-input"
              placeholder="fc-xxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Your key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear Key
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Key
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyModal
