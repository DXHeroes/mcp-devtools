# @mcp-devtools/typescript-config

Shared TypeScript configuration for MCP DevTools projects.

## Overview

This package provides centralized TypeScript configuration for the MCP DevTools ecosystem. Instead of duplicating TypeScript settings across multiple packages, this package allows for a consistent and maintainable TypeScript setup throughout the monorepo.

## Features

- Common TypeScript compiler options
- Standardized settings for all MCP DevTools packages
- Single source of truth for TypeScript configuration
- Reduces duplication and maintenance overhead

## Usage

### Installation

```bash
pnpm add @mcp-devtools/typescript-config -D
```

### Configuration

In your `tsconfig.json` file, extend the base configuration:

```json
{
  "extends": "@mcp-devtools/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./build",
    "rootDir": "./src"
    // Additional package-specific options here
  },
  "include": ["src/**/*"]
}
```

## Base Configuration

The base configuration includes the following settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": ["node_modules", "**/node_modules", "**/build", "**/dist"]
}
```

## License

Private - MCP DevTools
