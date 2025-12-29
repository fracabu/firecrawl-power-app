import ScrapeForm from './tools/ScrapeForm'
import MapForm from './tools/MapForm'
import SearchForm from './tools/SearchForm'
import CrawlForm from './tools/CrawlForm'
import ExtractForm from './tools/ExtractForm'
import AgentForm from './tools/AgentForm'

const toolForms = {
  scrape: ScrapeForm,
  map: MapForm,
  search: SearchForm,
  crawl: CrawlForm,
  extract: ExtractForm,
  agent: AgentForm,
}

function ToolPanel({ tool, onExecute, loading }) {
  const FormComponent = toolForms[tool.id]

  return (
    <div className="tool-panel">
      <div className="tool-card">
        <h1 className="tool-title">{tool.icon} {tool.name}</h1>
        <p className="tool-description">{tool.description}</p>
        <FormComponent onExecute={onExecute} loading={loading} />
      </div>
    </div>
  )
}

export default ToolPanel
