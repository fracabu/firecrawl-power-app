# Firecrawl MCP Server - Documentazione Completa

Guida completa a tutte le funzionalità disponibili con il server MCP Firecrawl.

---

## Indice

1. [Scrape - Estrazione Singola Pagina](#1-scrape---estrazione-singola-pagina)
2. [Map - Mappatura Sito Web](#2-map---mappatura-sito-web)
3. [Search - Ricerca Web](#3-search---ricerca-web)
4. [Crawl - Scansione Sito Completo](#4-crawl---scansione-sito-completo)
5. [Extract - Estrazione Dati Strutturati](#5-extract---estrazione-dati-strutturati)
6. [Agent - Agente Autonomo](#6-agent---agente-autonomo)

---

## 1. Scrape - Estrazione Singola Pagina

**Tool:** `firecrawl_scrape`

Lo strumento più potente e veloce per estrarre contenuti da una singola pagina web.

### Parametri Principali

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `url` | string | URL della pagina da analizzare (obbligatorio) |
| `formats` | array | Formati di output desiderati |
| `onlyMainContent` | boolean | Estrae solo il contenuto principale |
| `includeTags` | array | Tag HTML da includere |
| `excludeTags` | array | Tag HTML da escludere |
| `waitFor` | number | Millisecondi di attesa per caricamento |
| `mobile` | boolean | Simula dispositivo mobile |
| `maxAge` | number | Cache in millisecondi (velocizza 500%) |

### Formati Disponibili

| Formato | Descrizione |
|---------|-------------|
| `markdown` | Contenuto convertito in Markdown |
| `html` | HTML pulito della pagina |
| `rawHtml` | HTML grezzo originale |
| `screenshot` | Screenshot della pagina (PNG) |
| `links` | Lista di tutti i link nella pagina |
| `summary` | Riassunto del contenuto |
| `branding` | Identità visiva (colori, font, stili) |
| `json` | Estrazione strutturata con schema |

### Esempi di Utilizzo

#### Screenshot di una pagina
```json
{
  "url": "https://example.com",
  "formats": ["screenshot"]
}
```

#### Screenshot full-page con viewport custom
```json
{
  "url": "https://example.com",
  "formats": [
    {
      "type": "screenshot",
      "fullPage": true,
      "viewport": {"width": 1920, "height": 1080}
    }
  ]
}
```

#### Contenuto Markdown + Links
```json
{
  "url": "https://example.com/blog",
  "formats": ["markdown", "links"],
  "onlyMainContent": true
}
```

#### Estrazione Brand Identity
```json
{
  "url": "https://example.com",
  "formats": ["branding"]
}
```

#### Con azioni automatiche (click, scroll, wait)
```json
{
  "url": "https://example.com",
  "formats": ["markdown"],
  "actions": [
    {"type": "wait", "milliseconds": 2000},
    {"type": "click", "selector": "#load-more"},
    {"type": "scroll", "direction": "down"},
    {"type": "screenshot"}
  ]
}
```

---

## 2. Map - Mappatura Sito Web

**Tool:** `firecrawl_map`

Scopre tutti gli URL indicizzati su un sito web.

### Parametri

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `url` | string | URL del sito da mappare (obbligatorio) |
| `search` | string | Filtra URL contenenti questa stringa |
| `limit` | number | Numero massimo di URL |
| `includeSubdomains` | boolean | Include sottodomini |
| `sitemap` | string | `include`, `skip`, o `only` |
| `ignoreQueryParameters` | boolean | Ignora parametri query |

### Esempi

#### Mappa base di un sito
```json
{
  "url": "https://example.com"
}
```

#### Trova solo pagine blog
```json
{
  "url": "https://example.com",
  "search": "blog",
  "limit": 50
}
```

#### Include sottodomini
```json
{
  "url": "https://example.com",
  "includeSubdomains": true,
  "sitemap": "include"
}
```

---

## 3. Search - Ricerca Web

**Tool:** `firecrawl_search`

Cerca sul web e opzionalmente estrae contenuti dai risultati.

### Parametri

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `query` | string | Query di ricerca (obbligatorio) |
| `limit` | number | Numero di risultati |
| `sources` | array | `web`, `images`, `news` |
| `scrapeOptions` | object | Opzioni per estrarre contenuto |

### Operatori di Ricerca Supportati

| Operatore | Funzione | Esempio |
|-----------|----------|---------|
| `""` | Match esatto | `"Firecrawl"` |
| `-` | Esclude keyword | `-spam` |
| `site:` | Solo da un sito | `site:github.com` |
| `inurl:` | URL contiene | `inurl:api` |
| `intitle:` | Titolo contiene | `intitle:tutorial` |
| `related:` | Siti correlati | `related:firecrawl.dev` |

### Esempi

#### Ricerca semplice
```json
{
  "query": "migliori framework JavaScript 2025",
  "limit": 10,
  "sources": [{"type": "web"}]
}
```

#### Ricerca con estrazione contenuto
```json
{
  "query": "React tutorial",
  "limit": 5,
  "scrapeOptions": {
    "formats": ["markdown"],
    "onlyMainContent": true
  }
}
```

#### Ricerca immagini
```json
{
  "query": "logo design inspiration",
  "sources": [{"type": "images"}],
  "limit": 20
}
```

#### Ricerca news
```json
{
  "query": "AI news",
  "sources": [{"type": "news"}],
  "limit": 10
}
```

---

## 4. Crawl - Scansione Sito Completo

**Tool:** `firecrawl_crawl`

Scansiona un intero sito web ed estrae contenuti da tutte le pagine.

### Parametri

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `url` | string | URL di partenza (obbligatorio) |
| `limit` | number | Numero massimo pagine |
| `maxDiscoveryDepth` | number | Profondità massima |
| `includePaths` | array | Pattern URL da includere |
| `excludePaths` | array | Pattern URL da escludere |
| `allowExternalLinks` | boolean | Segue link esterni |
| `deduplicateSimilarURLs` | boolean | Rimuove URL simili |

### Esempi

#### Crawl base
```json
{
  "url": "https://example.com/docs",
  "limit": 50,
  "maxDiscoveryDepth": 3
}
```

#### Crawl solo sezione blog
```json
{
  "url": "https://example.com",
  "includePaths": ["/blog/*"],
  "excludePaths": ["/blog/archive/*"],
  "limit": 100
}
```

### Controllo Stato

**Tool:** `firecrawl_check_crawl_status`

```json
{
  "id": "crawl-job-id-here"
}
```

---

## 5. Extract - Estrazione Dati Strutturati

**Tool:** `firecrawl_extract`

Estrae informazioni strutturate usando LLM.

### Parametri

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `urls` | array | Lista URL da analizzare (obbligatorio) |
| `prompt` | string | Descrizione di cosa estrarre |
| `schema` | object | Schema JSON per i dati |
| `enableWebSearch` | boolean | Abilita ricerca web aggiuntiva |

### Esempi

#### Estrai info prodotto
```json
{
  "urls": ["https://shop.example.com/product/123"],
  "prompt": "Estrai nome prodotto, prezzo e descrizione",
  "schema": {
    "type": "object",
    "properties": {
      "nome": {"type": "string"},
      "prezzo": {"type": "number"},
      "descrizione": {"type": "string"},
      "disponibile": {"type": "boolean"}
    },
    "required": ["nome", "prezzo"]
  }
}
```

#### Estrai contatti aziendali
```json
{
  "urls": ["https://company.com/about", "https://company.com/contact"],
  "prompt": "Trova email, telefono e indirizzo dell'azienda",
  "schema": {
    "type": "object",
    "properties": {
      "email": {"type": "string"},
      "telefono": {"type": "string"},
      "indirizzo": {"type": "string"}
    }
  }
}
```

---

## 6. Agent - Agente Autonomo

**Tool:** `firecrawl_agent`

Agente AI che cerca, naviga ed estrae dati autonomamente dal web.

### Parametri

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `prompt` | string | Descrizione dei dati da trovare (obbligatorio, max 10000 caratteri) |
| `urls` | array | URL opzionali su cui focalizzarsi |
| `schema` | object | Schema JSON per output strutturato |

### Vantaggi rispetto a Extract

- Non richiede URL specifici
- Cerca e naviga autonomamente
- Più veloce per task complessi
- Maggiore affidabilità

### Esempi

#### Ricerca autonoma
```json
{
  "prompt": "Trova i fondatori di OpenAI e le loro biografie"
}
```

#### Ricerca con schema
```json
{
  "prompt": "Trova le top 5 startup AI italiane fondate nel 2024",
  "schema": {
    "type": "object",
    "properties": {
      "startups": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "nome": {"type": "string"},
            "fondatori": {"type": "string"},
            "funding": {"type": "string"},
            "settore": {"type": "string"}
          }
        }
      }
    }
  }
}
```

#### Con URL specifici
```json
{
  "urls": ["https://docs.example.com", "https://example.com/pricing"],
  "prompt": "Confronta le funzionalità e i prezzi dei diversi piani"
}
```

### Controllo Stato Agent

**Tool:** `firecrawl_agent_status`

```json
{
  "id": "agent-job-id-here"
}
```

---

## Opzioni Avanzate Comuni

### Proxy e Geolocalizzazione

```json
{
  "proxy": "stealth",
  "location": {
    "country": "IT",
    "languages": ["it"]
  }
}
```

### Azioni Automatiche

| Azione | Descrizione |
|--------|-------------|
| `wait` | Attende millisecondi specificati |
| `click` | Clicca su un elemento (selector CSS) |
| `scroll` | Scorre la pagina (up/down) |
| `write` | Inserisce testo in un campo |
| `press` | Preme un tasto |
| `screenshot` | Cattura screenshot |
| `scrape` | Estrae contenuto corrente |
| `executeJavascript` | Esegue codice JS |

### Cache e Performance

Usa `maxAge` per velocizzare le richieste ripetute:
```json
{
  "url": "https://example.com",
  "maxAge": 86400000
}
```
(86400000 ms = 24 ore)

---

## Best Practices

1. **Singola pagina**: Usa `scrape`
2. **Scoprire URL**: Usa `map` prima di `crawl`
3. **Ricerca aperta**: Usa `search` o `agent`
4. **Dati strutturati**: Usa `extract` con schema JSON
5. **Task complessi senza URL**: Usa `agent`
6. **Performance**: Aggiungi sempre `maxAge` per caching

---

## Crediti e Limiti

Ogni operazione consuma crediti Firecrawl:
- Scrape: ~1 credito per pagina
- Crawl: ~1 credito per pagina scansionata
- Search: ~1 credito per ricerca
- Extract/Agent: crediti variabili in base alla complessità

---

*Documentazione generata per Firecrawl MCP Server*
