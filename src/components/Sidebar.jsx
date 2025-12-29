function Sidebar({ tools, activeTool, onSelectTool, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-title">Tools</div>
      {tools.map(tool => (
        <div
          key={tool.id}
          className={`sidebar-item ${activeTool === tool.id ? 'active' : ''}`}
          onClick={() => onSelectTool(tool.id)}
        >
          <span className="sidebar-item-icon">{tool.icon}</span>
          <span>{tool.name}</span>
        </div>
      ))}
    </aside>
  )
}

export default Sidebar
