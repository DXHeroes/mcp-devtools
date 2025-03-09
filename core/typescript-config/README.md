# @mcp-devtools/typescript-config

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Internal Package](https://img.shields.io/badge/scope-internal-lightgrey)

Shared TypeScript configuration for MCP DevTools projects.

## 📋 Overview

This package provides centralized TypeScript configuration for the MCP DevTools ecosystem. Instead of duplicating TypeScript settings across multiple packages, this package allows for a consistent and maintainable TypeScript setup throughout the monorepo.

## ✨ Key Features

- 📝 Common TypeScript compiler options
- 🔄 Standardized settings for all MCP DevTools packages
- 🎯 Single source of truth for TypeScript configuration
- 🛠️ Reduces duplication and maintenance overhead

## 🚀 Usage

### Installation

This package is intended for internal use within the MCP DevTools monorepo, but can be installed via:

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

## 📋 Base Configuration

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

## 🛠️ Advanced Configuration

You can customize the TypeScript configuration in your package by extending the base configuration and adding or overriding options as needed:

```json
{
  "extends": "@mcp-devtools/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./build",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts"]
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
