# MCP DevTools

MCP (Model Context Protocol) DevTools is a collection of packages that enable AI assistants like Claude to interact with external tools and services, particularly focusing on Jira integration.

## Overview

This monorepo contains packages that implement the Model Context Protocol, providing tools that enable AI assistants to access and manipulate data from external services. The primary focus is Jira integration, allowing AI models to create, update, and query Jira tickets directly.

## Packages

### Core Packages

- **[@mcp-devtools/typescript-config](./core/typescript-config/README.md)** - Shared TypeScript configuration
- **[@mcp-devtools/http-client](./core/http-client/README.md)** - HTTP client for API requests

### MCP Servers

- **[@mcp-devtools/jira](./packages/jira/README.md)** - Jira MCP server integration

## Project Structure

```
mcp-devtools/
├── core/                   # Infrastructure and utility packages
│   ├── typescript-config/  # Shared TypeScript configuration
│   └── http-client/        # HTTP client utilities
│
├── packages/               # Functional MCP server packages
│   └── jira/               # Jira integration MCP server
├── package.json            # Root package configuration
└── pnpm-workspace.yaml     # Workspace configuration
```

## Getting Started

This repository uses pnpm workspaces for package management. To get started:

1. Install pnpm if you don't have it:

   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```

## Development

For development with auto-rebuild:

```bash
pnpm dev
```

## Jira Integration Setup

To use the Jira MCP server with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "Jira communication server": {
      "command": "node",
      "args": ["/path/to/node_modules/@mcp-devtools/jira/build/index.js"],
      "env": {
        "JIRA_URL": "https://your-domain.atlassian.net",
        "JIRA_API_MAIL": "your.email@example.com",
        "JIRA_API_KEY": "your-api-token-from-atlassian"
      }
    }
  }
}
```

## Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a workspace script:

```bash
pnpm inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Private - MCP DevTools
