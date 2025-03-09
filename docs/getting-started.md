# Getting Started with MCP DevTools

This guide will help you get started with MCP DevTools quickly and efficiently.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Cursor IDE](https://cursor.sh/) for the best experience
- Access credentials for the services you want to integrate (e.g., Jira API key)

## Installation

MCP DevTools packages are designed to be used via `npx` without explicit installation, but you can install them globally or locally if preferred:

```bash
# Using npx (recommended)
npx -y @mcp-devtools/jira

# Or install globally
npm install -g @mcp-devtools/jira

# Or install locally
npm install @mcp-devtools/jira
```

## Setup in Cursor IDE

1. **Open Cursor IDE Settings**

   - Use keyboard shortcut `CTRL+SHIFT+P` (or `CMD+SHIFT+P` on macOS)
   - Type "Settings" and select "Cursor Settings"
   - Navigate to the "MCP" section

2. **Add a New MCP Server**

   - Click the "Add Server" button
   - Configure as follows:
     - **Server name**: `Jira`
     - **Type**: `command`
     - **Command**:
       ```
       env JIRA_URL=https://[YOUR_WORKSPACE].atlassian.net JIRA_API_MAIL=[YOUR_EMAIL] JIRA_API_KEY=[YOUR_API_KEY] npx -y @mcp-devtools/jira
       ```
     - Replace `[YOUR_WORKSPACE]`, `[YOUR_EMAIL]`, and `[YOUR_API_KEY]` with your specific values

3. **Save Configuration**
   - Click "Save" to apply the settings

## Basic Usage

Once configured, you can interact with the integrated services through the Cursor IDE chat interface.

### Jira Command Examples

```
# Get a specific Jira task
get task PROJECT-123

# Search for tasks
search tasks "priority = High"

# Get tasks assigned to you
get my tasks

# Update a task status
update task PROJECT-123 status "In Progress"
```

## Verify Installation

To verify that your MCP server is working correctly:

1. Open the Cursor IDE chat
2. Type: `get task [VALID_TICKET_ID]` (replace with an actual ticket ID from your Jira workspace)
3. You should receive a response with the ticket details

## Troubleshooting

If you encounter issues:

1. **Check your credentials**

   - Ensure your Jira API key and email are correct
   - Verify that your Jira URL is formatted correctly

2. **Restart Cursor IDE**

   - Sometimes a simple restart resolves connection issues

3. **Examine logs**

   - Check the Cursor logs for any error messages
   - You can use the MCP Inspector for more detailed debugging (run `pnpm inspector` in the project directory)

4. **Network connectivity**
   - Ensure you have internet access and can reach your Jira instance

## Next Steps

- Learn more about configuration and usage in the [Jira Package Documentation](../packages/jira/README.md)
- Consider [contributing](../CONTRIBUTING.md) to the project if you have ideas for improvements
