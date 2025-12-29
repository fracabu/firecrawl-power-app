function Header({ theme, onToggleTheme, onOpenSettings, hasApiKey, onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div className="header-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="logo-icon">
            <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.07 2.25-5.84 3.83-7.62.32-.36.63-.69.88-.98.5-.58 1.82-1.94 2.29-2.9V3l1.5 1.5c.6.6 1.09 1.55 1.45 2.35.18.4.33.78.45 1.1.15-.12.3-.26.45-.42.87-.87 1.15-1.84 1.15-3.03V3l1.5 1.5C19.83 7.83 21 11.39 21 15c0 4.42-4.03 8-9 8z" fill="#FF5722"/>
            <path d="M12 23c-2.76 0-5-1.79-5-4 0-2.86 2.33-4.54 3.5-5.5.58-.48 1.09-.96 1.5-1.5.41.54.92 1.02 1.5 1.5C14.67 14.46 17 16.14 17 19c0 2.21-2.24 4-5 4z" fill="#FFCA28"/>
          </svg>
          <span className="logo-text">
            <span className="logo-fire">Firecrawl</span> Power App
          </span>
        </div>
      </div>
      <div className="header-actions">
        <button
          className={`settings-btn ${hasApiKey ? 'has-key' : 'no-key'}`}
          onClick={onOpenSettings}
          title={hasApiKey ? 'API Key configured' : 'No API Key - Click to add'}
        >
          <span className="btn-icon">{hasApiKey ? '🔑' : '⚠️'}</span>
          <span className="btn-text">API Key</span>
        </button>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          <span className="btn-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span className="btn-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
