# MCP DevTools

MCP (Model Context Protocol) DevTools is a collection of packages that enable AI assistants to interact with external tools and services through the Model Context Protocol.

## Overview

This monorepo contains packages that implement the Model Context Protocol, providing tools that enable AI assistants to access and manipulate data from external services. While initially offering Jira integration, this repository is designed as a general-purpose collection of MCP tools that will expand over time to support various services and use cases.

> **Note**: This project is currently in beta (0.x.x versions). APIs may change between minor versions during the beta phase.

## Packages

### Core Packages (Internal Use Only)

- **[@mcp-core/typescript-config](./core/typescript-config/README.md)** - Shared TypeScript configuration
- **[@mcp-core/http-client](./core/http-client/README.md)** - HTTP client for API requests

These core packages are for internal use only and are not published to npm.

### MCP Servers (Published Packages)

- **[@mcp-devtools/jira](./packages/jira/README.md)** - Jira MCP server integration

Only the MCP server packages under the `@mcp-devtools` scope are published to npm.

## Using MCP Tools

MCP tools in this repository can be integrated with AI assistants that support the Model Context Protocol. Here's how to use them in different environments:

To use MCP tools with Cursor IDE:

1. Configure the MCP server in Cursor settings
2. Access the tool functionality directly through the Cursor IDE chat

### Jira Configuration

#### 1. General configuration via Cursor Settings (RECOMMENDED)

To use the Jira MCP server with Cursor IDE, configure the server in your Cursor settings:

1. Open Cursor IDE
2. Navigate to Settings (or CTRL+SHIFT+P) > Cursor Settings > MCP
3. Add a new MCP server with the following configuration:

- Server name: `Jira`
- Type: `command`
- Command: `env JIRA_URL=https://[YOUR_WORKSPACE].atlassian.net JIRA_API_MAIL=[YOUR_EMAIL] JIRA_API_KEY=[YOUR_API_KEY] npx -y @mcp-devtools/jira`

#### 2. Project-wide configuration via .cursor/mcp.json (NOT RECOMMENDED)

> [!WARNING]  
> This approach is not recommended as it might leak your secrets to other users when committing to the git repository.

For project-specific Jira configuration, you can create a `.cursor/mcp.json` file in your project root.
This allows you to maintain separate MCP server configurations for different projects:

```json
{
  "mcpServers": {
    "@mcp-devtools/jira": {
      "command": "env JIRA_URL=https://[YOUR_WORKSPACE].atlassian.net JIRA_API_MAIL=[YOUR_EMAIL] JIRA_API_KEY=[YOUR_API_KEY] npx",
      "args": ["-y", "@mcp-devtools/jira"]
    }
  }
}
```

### Using Jira MCP in Chat

Once configured, you can interact with Jira through chat commands:

```bash
get task [ticket id]
# example
get task SCRUM-1
```

Available commands:

- `get task [ticket id]` - Retrieve details of a specific Jira ticket
- `search tasks [query]` - Search for Jira tickets matching a query
- `update task [ticket id] [field] [value]` - Update a field on a ticket
- `get my tasks` - List tickets assigned to you

For more detailed information on all available commands, refer to the [Jira package documentation](./packages/jira/README.md).

## Project Structure

```

mcp-devtools/
├── core/ # Infrastructure and utility packages
│ ├── typescript-config/ # Shared TypeScript configuration
│ └── http-client/ # HTTP client utilities
│
├── packages/ # Functional MCP server packages
│ └── jira/ # Jira integration MCP server
├── package.json # Root package configuration
└── pnpm-workspace.yaml # Workspace configuration

```

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

### Publishing to NPM

This repository is set up with automated release management using release-please and GitHub Actions for publishing packages to npmjs.org.

#### Beta Status

All published packages are currently in beta status (0.x.x versions) and use the `beta` npm tag. During this phase:

- Breaking changes may occur in minor version updates
- Install the packages using: `npm install @mcp-devtools/package-name@beta`
- When the project reaches stability, we will release version 1.0.0

### Debugging

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

### Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation. Please format your commit messages following this pattern:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect the code's meaning (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:

```
feat(jira): add comment creation endpoint
fix(http-client): resolve timeout issue
docs: update README with new setup instructions
```

Breaking changes should be indicated by adding an exclamation mark after the type/scope and describing the breaking change in the body of the commit message:

```
feat!: redesign http-client API

BREAKING CHANGE: The http-client API has been completely redesigned to improve usability.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **Connection Problems**

   - Ensure your Jira API credentials are correct
   - Check network connectivity to your Jira instance
   - Verify that the JIRA_URL includes the correct workspace name

2. **Permission Errors**

   - Ensure your Jira account has appropriate permissions for the actions you're attempting
   - API tokens may need specific permissions enabled in your Atlassian account

3. **Command Not Found**
   - If using npx, ensure you're connected to npm registry
   - For local installations, check that your package installation was successful

For more troubleshooting help, open an issue on our GitHub repository.

## Roadmap

Future development plans for MCP DevTools include:

- Additional service integrations (GitHub, Confluence, etc.)
- Enhanced security features
- Support for custom authentication methods
- Expanded querying capabilities
- Performance optimizations

## Community and Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support
- **Contributing**: See our contributing guidelines above

We welcome feedback and contributions from the community to help improve these tools.
