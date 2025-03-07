# MCP DevTools

MCP (Model Context Protocol) DevTools is a collection of packages that enable AI assistants to interact with external tools and services through the Model Context Protocol.

## Overview

This monorepo contains packages that implement the Model Context Protocol, providing tools that enable AI assistants to access and manipulate data from external services. While initially offering Jira integration, this repository is designed as a general-purpose collection of MCP tools that will expand over time to support various services and use cases.

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

## Using MCP Tools

MCP tools in this repository can be integrated with AI assistants that support the Model Context Protocol. Here's how to use them in different environments:

### Using with Cursor IDE

To use MCP tools with Cursor IDE:

1. Install the desired MCP package locally or globally
2. Configure the MCP server in Cursor settings
3. Access the tool functionality directly through the Cursor IDE interface

For specific tool configuration instructions, refer to the README in each package directory.

## Development

### Getting Started

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

### Development Workflow

For development with auto-rebuild:

```bash
pnpm dev
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a workspace script:

```bash
pnpm inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

### Jira Integration Setup

To use the Jira MCP server with Cursor IDE, configure the server in your Cursor settings:

1. Open Cursor IDE
2. Navigate to Settings (or CTRL+SHIFT+P) > Cursor Settings > MCP
3. Add a new MCP server with the following configuration:

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
