# @mcp-devtools/jira

![npm version](https://img.shields.io/npm/v/@mcp-devtools/jira.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Beta Status](https://img.shields.io/badge/status-beta-orange)

MCP server for interacting with Jira through AI assistants like Claude in the Cursor IDE.

## ✨ Highlights

- 🔍 **Comprehensive Jira Integration**: Access full Jira functionality through AI assistants
- 🔄 **Two-Way Communication**: Query, create, and update Jira tickets seamlessly
- 🛠 **Rich Tool Set**: Execute JQL, manage tickets, assign users, and more
- 📊 **Flexible Configuration**: Multiple configuration methods to suit your workflow
- 🚀 **Simple Setup**: Quick integration with Cursor IDE and compatible MCP tools

## 📋 Overview

This package provides a Model Context Protocol (MCP) server that enables AI assistants to interact with Jira. It exposes several tools for querying Jira issues, creating tickets, updating tickets, and more, making it possible for AI assistants to programmatically interact with your Jira instance.

## 🎮 Quick Start

To use MCP DevTools with Cursor IDE:

### Configure in Cursor Settings (Recommended)

1. Open Cursor IDE Settings

   - Use keyboard shortcut `CTRL+SHIFT+P` (or `CMD+SHIFT+P` on macOS)
   - Type "Settings" and select "Cursor Settings"
   - Navigate to the "MCP" section

2. Add a New MCP Server

   - Click the "Add Server" button
   - Configure as follows:
     - **Server name**: `Jira`
     - **Type**: `command`
     - **Command**:
       ```
       env JIRA_URL=https://[YOUR_WORKSPACE].atlassian.net JIRA_API_MAIL=[YOUR_EMAIL] JIRA_API_KEY=[YOUR_API_KEY] npx -y @mcp-devtools/jira
       ```
   - Replace `[YOUR_WORKSPACE]`, `[YOUR_EMAIL]`, and `[YOUR_API_KEY]` with your specific values

3. Save Configuration
   - Click "Save" to apply the settings

## 🛠 Features

- Execute JQL queries to search for issues
- Create new Jira tickets with custom fields
- Edit existing tickets (summary, description, labels, etc.)
- Query assignable users for projects
- Manage ticket statuses and transitions
- Add attachments to tickets from URLs or Confluence
- List projects and their metadata
- Delete tickets

## ⚙️ Configuration

### Environment Variables

The server requires the following environment variables:

| Variable        | Description                                                                                          | Required |
| --------------- | ---------------------------------------------------------------------------------------------------- | -------- |
| `JIRA_URL`      | Your Jira instance URL (e.g., `https://your-domain.atlassian.net`)                                   | Yes      |
| `JIRA_API_MAIL` | Email address associated with your Atlassian account                                                 | Yes      |
| `JIRA_API_KEY`  | API token generated from [Atlassian ID](https://id.atlassian.com/manage-profile/security/api-tokens) | Yes      |

### Usage with Cursor IDE

To use with Cursor IDE, configure the MCP server in your settings:

1. Navigate to Settings > Cursor Settings > MCP
2. Add a new MCP server with:
   - Server name: `Jira`
   - Type: `command`
   - Command:
     ```
     env JIRA_URL=https://your-domain.atlassian.net JIRA_API_MAIL=your.email@example.com JIRA_API_KEY=your-api-token npx -y @mcp-devtools/jira
     ```

### Usage with Claude Desktop

To use with Claude Desktop, add the server configuration to your Claude Desktop config file:

- On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

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

## 📘 Available Tools & Examples

### JQL Queries

```
# Execute a JQL query
execute jql "project = SCRUM AND status = 'In Progress'"

# Get tasks assigned to me
get my tasks

# Search for high priority tasks
search tasks "priority = High"
```

### Ticket Management

```
# Get detailed ticket information
get task SCRUM-123

# Create a new task
create task "Bug Fix: Login Issue" in SCRUM with description "Users unable to login after password reset"

# Update a ticket
update task SCRUM-123 summary "Updated: Login Issue Fixed"

# Change ticket status
update task SCRUM-123 status "Done"

# Assign a ticket
assign task SCRUM-123 to john.doe@example.com
```

### Project Management

```
# List all projects
list projects

# Get available statuses
get all statuses

# Find assignable users
find assignable users for SCRUM
```

## 📋 Tool Reference

| Tool                             | Description                         | Parameters                                                                                                                                                    | Aliases                                | Implementation                                                             |
| -------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `execute_jql`                    | Run JQL queries against Jira        | `jql` (string, required), `maxResults` (number, optional)                                                                                                     | None                                   | [executeJql.ts](src/tools/executeJql.ts)                                   |
| `get_ticket`                     | Get detailed ticket information     | `jql` (string, required), `maxResults` (number, optional)                                                                                                     | `read_ticket`, `get_task`, `read_task` | [getTicket.ts](src/tools/getTicket.ts)                                     |
| `create_ticket`                  | Create a new Jira ticket            | `project` (string, required), `summary` (string, required), `description` (string, required), `issuetype` (string, required), `parent` (string, optional)     | None                                   | [createTicket.ts](src/tools/createTicket.ts)                               |
| `list_projects`                  | List available Jira projects        | `maxResults` (number, optional)                                                                                                                               | None                                   | [listProjects.ts](src/tools/listProjects.ts)                               |
| `delete_ticket`                  | Delete a Jira ticket                | `issueIdOrKey` (string, required)                                                                                                                             | None                                   | [deleteTicket.ts](src/tools/deleteTicket.ts)                               |
| `edit_ticket`                    | Update an existing ticket           | `issueIdOrKey` (string, required), `summary` (string, optional), `description` (string, optional), `labels` (string[], optional), `parent` (string, optional) | None                                   | [editTicket.ts](src/tools/editTicket.ts)                                   |
| `get_all_statuses`               | List all available statuses         | `maxResults` (number, optional)                                                                                                                               | None                                   | [getAllStatuses.ts](src/tools/getAllStatuses.ts)                           |
| `assign_ticket`                  | Assign a ticket to a user           | `issueIdOrKey` (string, required), `accountId` (string, required)                                                                                             | None                                   | [assignTicket.ts](src/tools/assignTicket.ts)                               |
| `query_assignable`               | Find assignable users for a project | `project_key` (string, required)                                                                                                                              | None                                   | [queryAssignable.ts](src/tools/queryAssignable.ts)                         |
| `add_attachment_from_public_url` | Add attachment from public URL      | `issueIdOrKey` (string, required), `imageUrl` (string, required)                                                                                              | None                                   | [addAttachmentFromUrl.ts](src/tools/addAttachmentFromUrl.ts)               |
| `add_attachment_from_confluence` | Add attachment from Confluence      | `issueIdOrKey` (string, required), `pageId` (string, required), `attachmentName` (string, required)                                                           | None                                   | [addAttachmentFromConfluence.ts](src/tools/addAttachmentFromConfluence.ts) |

For detailed information on each parameter and response format, see the examples below.

## 🛠 Advanced Usage

### Custom JQL Queries

You can execute complex JQL queries to find exactly the tickets you need:

```
execute jql "project = SCRUM AND assignee = currentUser() AND status != Done ORDER BY priority DESC"
```

### Creating Tickets with Custom Fields

To create tickets with custom fields, use the `create_ticket` tool with additional parameters:

```
create task "New Feature" in SCRUM with description "Implement user profile editing" and type "Story" and priority "High"
```

### Bulk Operations

For operations on multiple tickets, use JQL to select them:

```
# Find all high priority bugs
execute jql "project = SCRUM AND issuetype = Bug AND priority = High"

# Update them all (requires iteration through results)
```

## 🔍 Debugging

Since MCP servers communicate over stdio, traditional debugging can be challenging. Use the MCP Inspector tool to help with debugging:

```bash
# Run the inspector
npx @modelcontextprotocol/inspector @mcp-devtools/jira
```

Alternatively, if you have cloned the MCP DevTools repository:

```bash
pnpm inspector
```

This will provide a URL to open debugging tools in your browser.

## 🤝 Contributing

Contributions are welcome! See the [Contributing Guide](../../CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
