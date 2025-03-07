# @mcp-devtools/jira

MCP server for interacting with Jira through AI assistants like Claude.

## Overview

This package provides a Model Context Protocol (MCP) server that enables AI assistants to interact with Jira. It exposes several tools for querying Jira issues, creating tickets, updating tickets, and more, making it possible for AI assistants to programmatically interact with your Jira instance.

## Features

- Execute JQL queries to search for issues
- Create new Jira tickets
- Edit existing tickets
- Query assignable users
- Manage ticket statuses
- Add attachments to tickets
- List projects and their metadata
- Delete tickets

## Installation

```bash
pnpm add @mcp-devtools/jira
```

Alternatively, you can use the binary directly:

```bash
npx @mcp-devtools/jira
```

## Configuration

The server requires the following environment variables:

- `JIRA_URL`: Your Jira instance URL (e.g., `https://your-domain.atlassian.net`)
- `JIRA_API_MAIL`: Email address associated with your Atlassian account
- `JIRA_API_KEY`: API token generated from https://id.atlassian.com/manage-profile/security/api-tokens

## Usage with Claude Desktop

To use the Jira MCP server with Claude Desktop, add the server configuration to your Claude Desktop config file:

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
        "JIRA_API_KEY": "your-api-token"
      }
    }
  }
}
```

## Available Tools

The server exposes the following tools:

- `mcp__execute_jql`: Run JQL queries against Jira
- `mcp__get_only_ticket_name_and_description`: Get ticket summaries and descriptions based on JQL
- `mcp__get_ticket`: Get detailed ticket information
- `mcp__read_ticket`: Alias for get_ticket
- `mcp__get_task`: Alias for get_ticket
- `mcp__read_task`: Alias for get_ticket
- `mcp__create_ticket`: Create a new Jira ticket
- `mcp__list_projects`: List available Jira projects
- `mcp__delete_ticket`: Delete a Jira ticket
- `mcp__edit_ticket`: Update an existing ticket
- `mcp__get_all_statuses`: List all available statuses
- `mcp__assign_ticket`: Assign a ticket to a user
- `mcp__query_assignable`: Find assignable users for a project
- `mcp__add_attachment_from_public_url`: Add attachment from public URL
- `mcp__add_attachment_from_confluence`: Add attachment from Confluence

## Debugging

Since MCP servers communicate over stdio, traditional debugging can be challenging. Use the MCP Inspector tool to help with debugging:

```bash
pnpm inspector
```

This will provide a URL to open debugging tools in your browser.

## License

Private - MCP DevTools
