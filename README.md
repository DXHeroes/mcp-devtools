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

### Publishing to NPM

This repository is set up with automated release management using release-please and GitHub Actions for publishing packages to npmjs.org.

> **Note**: Only packages with the `@mcp-devtools` prefix are published to npm. Core packages (`@mcp-core/*`) are for internal use only.

#### Beta Status

All published packages are currently in beta status (0.x.x versions) and use the `beta` npm tag. During this phase:

- Breaking changes may occur in minor version updates
- Install the packages using: `npm install @mcp-devtools/package-name@beta`
- When the project reaches stability, we will release version 1.0.0

#### Automated Versioning with Release Please

Release-please automatically creates and maintains release PRs based on [conventional commits](https://www.conventionalcommits.org/):

- When you push changes to the `main` branch with conventional commit messages, release-please analyzes them and updates a release PR
- Commit types like `feat:`, `fix:`, and `chore:` are used to determine version bumps (semver)
- Once the release PR is merged, packages are automatically published to npm

The conventional commit types are mapped to semantic versioning as follows:

- `feat:` - Minor version bump (new feature)
- `fix:` - Patch version bump (bug fix)
- `feat!:` or `fix!:` - Major version bump (breaking change)
- `docs:`, `chore:`, `style:`, `refactor:`, `perf:`, `test:` - No version bump

Example commit messages:

```
feat: add new API endpoint for Jira comments
fix: resolve authentication issue with Jira API
feat!: redesign http-client interface (BREAKING CHANGE)
```

#### Manual Publishing Options

There are two additional ways to trigger a release:

1. **Create a GitHub Release**: When you create a new release in GitHub, the packages will be published with the release tag version.

2. **Manual Trigger**: You can manually trigger the npm-publish workflow from the GitHub Actions tab and specify a version:
   - `patch`, `minor`, or `major` for semantic versioning bumps
   - A specific version like `1.2.3`

To publish, you need to:

1. Ensure you have the `NPM_TOKEN` secret set up in your GitHub repository settings
2. Make sure all packages you want to publish have the correct information in their package.json files
3. Packages are published with public access (`--access public`)

#### Setting up for local publishing (for maintainers)

If you need to publish packages locally for testing:

1. Login to npm:

   ```bash
   npm login
   ```

2. Once authenticated, you can publish packages using:
   ```bash
   pnpm -r publish --access public --tag beta
   ```

Note: It's recommended to use the GitHub Actions workflow for official releases.

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
