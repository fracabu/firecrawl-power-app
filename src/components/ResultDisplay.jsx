import { useState } from 'react'

function ResultDisplay({ result, error, loading, toolId }) {
  const [activeTab, setActiveTab] = useState('json')

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="result-panel">
        <div className="result-card">
          <div className="loading">
            <div className="spinner"></div>
            <span>Processing...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="result-panel">
        <div className="result-card">
          <div className="result-header">
            <span className="result-title">Error</span>
          </div>
          <div className="result-content">
            <div className="code-block" style={{ color: '#ff4444' }}>
              {error}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="result-panel">
        <div className="result-card">
          <div className="empty-state">
            <div className="empty-state-icon">🚀</div>
            <p>Execute a tool to see results here</p>
          </div>
        </div>
      </div>
    )
  }

  const hasScreenshot = result.screenshot
  const hasMarkdown = result.markdown
  const hasLinks = result.links && result.links.length > 0

  return (
    <div className="result-panel">
      <div className="result-card">
        <div className="result-header">
          <span className="result-title">Result</span>
          <div className="result-actions">
            <button
              className="btn btn-secondary"
              onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
            >
              📋 Copy JSON
            </button>
          </div>
        </div>

        <div className="tabs">
          <div
            className={`tab ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            JSON
          </div>
          {hasScreenshot && (
            <div
              className={`tab ${activeTab === 'screenshot' ? 'active' : ''}`}
              onClick={() => setActiveTab('screenshot')}
            >
              Screenshot
            </div>
          )}
          {hasMarkdown && (
            <div
              className={`tab ${activeTab === 'markdown' ? 'active' : ''}`}
              onClick={() => setActiveTab('markdown')}
            >
              Markdown
            </div>
          )}
          {hasLinks && (
            <div
              className={`tab ${activeTab === 'links' ? 'active' : ''}`}
              onClick={() => setActiveTab('links')}
            >
              Links ({result.links.length})
            </div>
          )}
        </div>

        <div className="result-content">
          {activeTab === 'json' && (
            <pre className="code-block">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}

          {activeTab === 'screenshot' && hasScreenshot && (
            <div>
              <img
                src={result.screenshot}
                alt="Screenshot"
                className="screenshot-preview"
              />
              <div style={{ marginTop: '12px' }}>
                <a
                  href={result.screenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  🔗 Open Full Size
                </a>
              </div>
            </div>
          )}

          {activeTab === 'markdown' && hasMarkdown && (
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => copyToClipboard(result.markdown)}
                style={{ marginBottom: '12px' }}
              >
                📋 Copy Markdown
              </button>
              <pre className="code-block">{result.markdown}</pre>
            </div>
          )}

          {activeTab === 'links' && hasLinks && (
            <div className="code-block">
              {result.links.map((link, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)' }}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay
