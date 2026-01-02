---
title: From 0 to 500 Free Pages Scraped with Firecrawl MCP Server and Claude Code
published: false
description: Firecrawl offers 500 free credits to start. Combined with their MCP server and Claude Code you get AI-powered web scraping without writing code.
tags: showdev, ai, webdev, scraping
---

0 lines of code. That's what I wrote to scrape 500 pages. With Firecrawl's MCP server integrated into Claude Code, I just describe what I need in plain English, and the AI handles the rest. When I discovered this workflow combined with Firecrawl's free tier, my entire approach to web scraping changed forever.

## Firecrawl's Generous Free Tier

Before diving into the technical setup, let me highlight why Firecrawl stands out. Most scraping APIs require a credit card or offer crippled free tiers. Firecrawl is different:

| Plan | Price | Credits | Credit Card Required |
|:-----|:------|:--------|:---------------------|
| **FREE** | **$0** | **500 (one-time)** | **No** |
| Hobby | $16/mo | 3,000/mo | Yes |
| Standard | $83/mo | 100,000/mo | Yes |
| Growth | $333/mo | 500,000/mo | Yes |

500 credits to start, completely free, no strings attached. That's enough to scrape an entire e-commerce category, extract data from dozens of documentation sites, or test your scraping workflow before upgrading.

## The Magic Stack

| Component | What It Does |
|:----------|:-------------|
| **Firecrawl Free Tier** | 500 credits to start, $0, full API access |
| **Firecrawl MCP Server** | Exposes Firecrawl API to AI assistants |
| **Claude Code** | AI that calls MCP tools autonomously |

The result? You talk to Claude, Claude talks to Firecrawl, you get structured data back. No Postman, no curl commands, no boilerplate code.

## Setting Up Firecrawl MCP Server

### 1. Get Your Free API Key

Go to [firecrawl.dev](https://firecrawl.dev) and sign up. You get 500 free credits to start, no credit card required.

### 2. Add MCP Server to Claude Code

In your Claude Code configuration:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-your-key-here"
      }
    }
  }
}
```

### 3. Start Scraping with Natural Language

Now just ask Claude:

- "Scrape this URL and extract the main content"
- "Map all links on this website"
- "Extract product names and prices from this page"
- "Crawl this documentation and summarize each section"

Claude automatically uses Firecrawl MCP tools to fulfill your request.

## Why I Also Built a Visual UI

While MCP + Claude Code is incredibly powerful for ad-hoc scraping, I built **Firecrawl Power App** for cases where I need:

- Visual feedback on what's being scraped
- Persistent history of past scrapes
- Quick access without opening Claude Code
- Sharing results with non-technical teammates

{% github fracabu/firecrawl-power-app %}

![Tool Screenshot](https://github.com/user-attachments/assets/d6442d47-43e5-4fcd-a174-7d960b0f1307)

The app complements the MCP workflow. Use Claude Code for complex, one-off extractions. Use the UI for repetitive tasks and visual exploration.

### App Features

The Power App provides dedicated panels for every Firecrawl operation:

| Feature | Description | Plan |
|:--------|:------------|:-----|
| **Scrape** | Extract content from single pages | Free |
| **Map** | Discover all links on a website | Free |
| **Crawl** | Systematically index entire sites | Free |
| **Search** | Find specific content across the web | PRO |
| **Extract** | AI-powered structured data extraction | PRO |
| **Agent** | Autonomous AI agents for complex tasks | 5/day free |

| Category | Technologies |
|:---------|:-------------|
| Frontend | React, Vite, Custom Design System |
| Backend | Express, Vercel Serverless Functions |
| AI | Firecrawl API (Extraction, Agent) |

## My Results After 3 Months

| Metric | Before | After |
|:-------|:-------|:------|
| **Time to first scrape** | 30+ minutes | 30 seconds |
| **Lines of code written** | 100+ per project | 0 |
| **Monthly pages scraped** | ~200 | 480+ |
| **Cost** | $0 (but hours of work) | $0 (and minutes of work) |

## Pro Tips

1. **Use Claude Code for complex extractions**: When you need to scrape + transform + analyze, let Claude chain the operations. Ask: "Scrape this page, extract the data, and create a CSV file."

2. **Combine Map + targeted Scrape**: First ask Claude to map a site, then selectively scrape only the pages you need. This maximizes your free credits.

3. **Leverage JSON Schemas for precision**: Use the Extract feature with a defined JSON schema to get perfectly structured, machine-readable data without parsing.

## What Would You Scrape with AI + Free Credits?

The combination of MCP servers and free API tiers is opening up possibilities that didn't exist a year ago. What would YOU build? A research assistant? A content aggregator? An automated monitoring system? Share your ideas below!

---

👤 **Francesco Capurso** (@fracabu)
*Self-taught dev | AI agents & Fastify plugins*

🔗 [GitHub](https://github.com/fracabu) | [npm](https://npmjs.com/~fracabu)

⭐ Found this useful? Star the repo!
