# @mcp-devtools/linear

![npm version](https://img.shields.io/npm/v/@mcp-devtools/linear.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status Badge](https://img.shields.io/badge/status-beta-orange)

Talk to Linear - Model Context Protocol (MCP) Server for Linear integration with AI assistants.

## ✨ Highlights

- 🔍 **Issue Management** - Create, read, update, and delete Linear issues
- 🔄 **Workflow Integration** - Access workflow states, teams, and projects
- 👥 **User Management** - List users and assign issues
- 🔎 **Powerful Search** - Find issues using Linear's GraphQL API
- ⚡ **Fast Setup** - Simple environment configuration

## 🚀 Quick Start

### Installation

To use the Linear MCP server with Cursor IDE:

1. Open Cursor Settings → MCP
2. Click "Add New MCP Server"
3. Fill in the following details:
   - **Name**: `Linear`
   - **Type**: `command`
   - **Command**:
     ```
     env LINEAR_API_KEY=[YOUR_API_KEY] npx -y @mcp-devtools/linear
     ```

> **Required Environment Variables**:
>
> - `LINEAR_API_KEY`: Your Linear API key (Create one in Linear at Settings → Security & access → Personal API keys)

### Using Linear Tools

Once configured, you can interact with Linear through your AI assistant in Cursor:

```
# Search for issues
search_issues "bug in authentication"

# Get detailed information about a specific issue
get_issue ENG-123

# Create a new issue
create_issue teamId="TEAM_ID" title="Fix login bug" description="Users can't login properly"

# List teams
list_teams

# List workflow states for a team
list_workflow_states teamId="TEAM_ID"
```

## 📋 Tool Reference

| Tool                   | Description                             | Parameters                                                                                                                                                                     | Aliases                                  |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `search_issues`        | Search for issues using a query string  | `query` (string), `maxResults` (number, optional)                                                                                                                              | `execute_graphql`                        |
| `get_issue`            | Get detailed information about an issue | `issueId` (string)                                                                                                                                                             | `read_issue`, `get_task`, `read_task`    |
| `create_issue`         | Create a new issue                      | `teamId` (string), `title` (string), `description` (string, optional), `priority` (number, optional), `assigneeId` (string, optional), `stateId` (string, optional)            | `create_task`                            |
| `update_issue`         | Update an existing issue                | `issueId` (string), `title` (string, optional), `description` (string, optional), `priority` (number, optional), `assigneeId` (string, optional), `stateId` (string, optional) | `edit_issue`, `update_task`, `edit_task` |
| `delete_issue`         | Delete an issue                         | `issueId` (string)                                                                                                                                                             | `delete_task`                            |
| `list_teams`           | List all teams                          | -                                                                                                                                                                              | -                                        |
| `list_workflow_states` | List workflow states for a team         | `teamId` (string)                                                                                                                                                              | -                                        |
| `list_users`           | List all users                          | -                                                                                                                                                                              | -                                        |
| `list_projects`        | List projects                           | `maxResults` (number, optional)                                                                                                                                                | -                                        |

## 🛠️ Examples

### Searching for Issues

```
# Basic search by keyword
search_issues "authentication bug"

# Search with limited results
search_issues "priority is high" maxResults=5

# Advanced search using Linear's query syntax
search_issues "assignee:@me status:Todo"
```

### Managing Issues

```
# Create an issue
create_issue teamId="TEAM_ID" title="Update documentation" description="The API documentation needs to be updated with the new endpoints"

# Update an issue
update_issue issueId="ENG-123" title="Updated title" priority=2

# Delete an issue
delete_issue issueId="ENG-123"
```

### Team and User Management

```
# Get a list of all teams
list_teams

# Get workflow states for a team
list_workflow_states teamId="TEAM_ID"

# List all users
list_users
```

## ⚙️ Configuration

### Environment Variables

| Variable         | Description         | Required | Default |
| ---------------- | ------------------- | -------- | ------- |
| `LINEAR_API_KEY` | Your Linear API key | Yes      | -       |

### Using with Linear GraphQL API

The Linear MCP server uses Linear's GraphQL API. For advanced queries, you can use the `execute_graphql` alias, which works the same as `search_issues`.

## 🆘 Troubleshooting

### Common Issues

1. **Authentication Error**

   - Ensure your Linear API key is valid and has the necessary permissions
   - Check that you've correctly set the `LINEAR_API_KEY` environment variable

2. **Issues Not Found**

   - Verify that issue identifiers are in the correct format (e.g., "ENG-123")
   - Make sure your search queries follow Linear's search syntax

3. **Permission Issues**
   - Ensure your API key has permission to perform the requested actions
   - Some operations may require admin-level permissions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
