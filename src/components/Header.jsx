function Header({ theme, onToggleTheme, onOpenSettings, hasApiKey }) {
  return (
    <header className="header">
      <div className="header-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 2C10 2 6 8 6 14C6 20 10 26 16 30C22 26 26 20 26 14C26 8 22 2 16 2Z"
            fill="currentColor"
            className="logo-fire"
          />
          <path
            d="M16 6C12 6 10 10 10 14C10 18 12 22 16 26C20 22 22 18 22 14C22 10 20 6 16 6Z"
            fill="#FF8844"
          />
          <path
            d="M16 10C14 10 13 12 13 14C13 16 14 18 16 20C18 18 19 16 19 14C19 12 18 10 16 10Z"
            fill="#FFCC00"
          />
        </svg>
        <span>
          <span className="logo-fire">Fire</span>crawl Power App
        </span>
      </div>
      <div className="header-actions">
        <button
          className={`settings-btn ${hasApiKey ? 'has-key' : 'no-key'}`}
          onClick={onOpenSettings}
          title={hasApiKey ? 'API Key configured' : 'No API Key - Click to add'}
        >
          {hasApiKey ? '🔑' : '⚠️'} API Key
        </button>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
