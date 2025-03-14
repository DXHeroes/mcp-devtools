# MCP DevTools

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
[![Beta Status](https://img.shields.io/badge/status-beta-orange)](https://github.com/modelcontextprotocol/mcp-devtools)

MCP (Model Context Protocol) DevTools is a collection of packages that enable AI assistants to interact with external tools and services through the Model Context Protocol.

## ✨ Highlights

- 🔌 **Seamless Integration**: Connect AI assistants to external services and tools
- 🛠 **Extensible Framework**: Easily create new integrations with the Model Context Protocol
- 🔍 **Powerful Interactions**: Enable AI to access and manipulate data from external services
- 📊 **Robust Integrations**: Comprehensive functionality for Jira and Linear
- 🚀 **Developer-Friendly**: Simple setup with detailed documentation for the best developer experience

> **Note**: This project is currently in beta (0.x.x versions). APIs may change between minor versions during the beta phase.

## 📦 Available Packages

| Package                                             | Description                   | Status                                                                                                                      |
| --------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [@mcp-devtools/jira](./packages/jira/README.md)     | Jira MCP server integration   | [![npm version](https://img.shields.io/npm/v/@mcp-devtools/jira.svg)](https://www.npmjs.com/package/@mcp-devtools/jira)     |
| [@mcp-devtools/linear](./packages/linear/README.md) | Linear MCP server integration | [![npm version](https://img.shields.io/npm/v/@mcp-devtools/linear.svg)](https://www.npmjs.com/package/@mcp-devtools/linear) |

## 🚀 Quick Start

### Configuration in Cursor IDE

#### Jira Integration

1. Open Cursor Settings → MCP
2. Click "Add New MCP Server"
3. Fill in the following details:
   - **Name**: `Jira`
   - **Type**: `command`
   - **Command**:
     `env JIRA_URL=https://[YOUR_WORKSPACE].atlassian.net JIRA_API_MAIL=[YOUR_EMAIL] JIRA_API_KEY=[YOUR_API_KEY] npx -y @mcp-devtools/jira`

> **Required Environment Variables**:
>
> - `JIRA_URL`: Your Jira instance URL (e.g., `https://your-company.atlassian.net`)
> - `JIRA_API_MAIL`: Your Atlassian account email
> - `JIRA_API_KEY`: Your Atlassian API key ([Create one here](https://id.atlassian.com/manage-profile/security/api-tokens))

#### Linear Integration

1. Open Cursor Settings → MCP
2. Click "Add New MCP Server"
3. Fill in the following details:
   - **Name**: `Linear`
   - **Type**: `command`
   - **Command**:
     `env LINEAR_API_KEY=[YOUR_API_KEY] npx -y @mcp-devtools/linear`

> **Required Environment Variables**:
>
> - `LINEAR_API_KEY`: Your Linear API key (Create one in Linear app: Settings → API → Create Key)

### Using Tools

Once configured, you can interact with tools through natural language commands in Cursor.

#### Jira Examples:

```
# Fetch a specific ticket
get ticket SCRUM-123

# Search for tickets
execute jql "project = SCRUM AND status = 'In Progress'"

# Get ticket details
read ticket SCRUM-123

# Create a new ticket
create ticket project=SCRUM summary="Fix login bug" description="Users can't log in" issuetype=Bug
```

#### Linear Examples:

```
# Get a specific issue
get_issue SS-33

# Search for issues
search_issues "priority is high" with limit 5

# Create a new issue
create_issue for team "eng" titled "Fix API response format" with description "The API is returning incorrect data format" and priority 1

# List teams
list_teams
```

For a complete list of available commands, refer to the package documentation:

- [Jira Package Documentation](./packages/jira/README.md)
- [Linear Package Documentation](./packages/linear/README.md)

## 📖 Documentation

- [Jira Package Documentation](./packages/jira/README.md)
- [Linear Package Documentation](./packages/linear/README.md)
- [Getting Started Guide](./docs/getting-started.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🧩 Repository Structure

```
mcp-devtools/
├── core/                 # Infrastructure and utility packages
│   ├── typescript-config/  # Shared TypeScript configuration
│   └── http-client/        # HTTP client utilities
│
├── packages/             # Functional MCP server packages
│   ├── jira/               # Jira integration MCP server
│   │   └── README.md         # Package documentation
│   └── linear/             # Linear integration MCP server
│       └── README.md         # Package documentation
│
└── ...
```

## 🛠 Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development with auto-rebuild
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Please check our [Contributing Guidelines](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support

## Project Structure

```
mcp-devtools/
├── core/ # Infrastructure and utility packages
│ ├── typescript-config/ # Shared TypeScript configuration
│ └── http-client/ # HTTP client utilities
│
├── packages/ # Functional MCP server packages
│ ├── jira/ # Jira integration MCP server
│ └── linear/ # Linear integration MCP server
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

   - Ensure your API credentials are correct
   - Check network connectivity to your service instances
   - Verify URLs and workspace names

2. **Permission Errors**

   - Ensure your accounts have appropriate permissions for the actions you're attempting
   - API tokens may need specific permissions enabled in your account settings

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
