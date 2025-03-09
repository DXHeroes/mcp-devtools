# Contributing to MCP DevTools

Thank you for your interest in contributing to MCP DevTools! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [pnpm](https://pnpm.io/) for package management

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/mcp-devtools.git
   cd mcp-devtools
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build the packages:
   ```bash
   pnpm build
   ```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, following the [coding standards](#coding-standards)

3. For development with auto-rebuild:

   ```bash
   pnpm dev
   ```

4. Test your changes:

   ```bash
   pnpm test
   ```

5. Lint your code:

   ```bash
   pnpm lint
   ```

6. Commit your changes following the [commit guidelines](#commit-guidelines)

## Pull Request Process

1. Update the README.md and documentation with details of changes, if applicable
2. Ensure all tests pass and code linting is clean
3. Submit a pull request to the `main` branch of the original repository
4. The maintainers will review your PR and provide feedback
5. Once approved, your PR will be merged

## Coding Standards

- Follow the existing code style
- Use TypeScript for all new code
- Ensure code is properly typed
- Follow the principle of [clean code](https://github.com/ryanmcdermott/clean-code-javascript)
- Use meaningful variable and function names
- Write comments for non-obvious code
- Keep functions small and focused on a single responsibility

### TypeScript Style Guide

- Use interfaces for object types
- Use proper access modifiers for class members
- Avoid using `any` type where possible
- Use arrow functions for callbacks
- Use async/await instead of Promise chains when appropriate

## Commit Guidelines

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

## Testing

- Write tests for all new features and bug fixes
- Ensure all existing tests pass before submitting a PR
- Follow the existing testing patterns in the codebase
- Aim for high test coverage, especially for critical functionality

To run tests:

```bash
# Run all tests
pnpm test

# Run specific tests
pnpm test -- --grep="pattern"
```

## Documentation

- Update documentation for any changed functionality
- Document all public APIs
- Ensure README.md is kept up-to-date
- Add JSDoc comments to functions and classes
- Include code examples where appropriate

## Release Process

This repository is set up with automated release management using release-please and GitHub Actions for publishing packages to npmjs.org.

### Beta Status

All published packages are currently in beta status (0.x.x versions) and use the `beta` npm tag. During this phase:

- Breaking changes may occur in minor version updates
- Install the packages using: `npm install @mcp-devtools/package-name@beta`
- When the project reaches stability, we will release version 1.0.0

## Need Help?

If you need help with contributing, please:

- Check the existing [issues](https://github.com/modelcontextprotocol/mcp-devtools/issues) on GitHub
- Open a new issue if your question isn't already addressed
- Reach out to the maintainers through the project's communication channels

Thank you for contributing to MCP DevTools!
