# @mcp-devtools/http-client

Simple HTTP client for MCP servers with fetch-based implementation.

## Overview

This package provides a lightweight, fetch-based HTTP client designed specifically for use with MCP (Model Context Protocol) servers. It encapsulates common HTTP request patterns and error handling for interacting with RESTful APIs.

## Features

- Simple, promise-based API
- Support for common HTTP methods (GET, POST, PUT, DELETE)
- JSON parsing and stringification
- Request/response type definitions
- Customizable headers and authentication
- Error handling for HTTP and network errors

## Installation

```bash
pnpm add @mcp-devtools/http-client
```

## Usage

```typescript
import { FetchHttpClient } from "@mcp-devtools/http-client";

// Create client instance
const client = new FetchHttpClient({
  baseUrl: "https://api.example.com",
  defaultHeaders: {
    Authorization: "Bearer YOUR_TOKEN",
  },
});

// GET request
const getData = async () => {
  const response = await client.get("/items");
  return response.data;
};

// POST request
const createItem = async (item) => {
  const response = await client.post("/items", { data: item });
  return response.data;
};

// PUT request
const updateItem = async (id, item) => {
  const response = await client.put(`/items/${id}`, { data: item });
  return response.data;
};

// DELETE request
const deleteItem = async (id) => {
  const response = await client.delete(`/items/${id}`);
  return response.data;
};
```

## API Reference

### FetchHttpClient

Main client class that handles HTTP requests.

#### Constructor

```typescript
new FetchHttpClient(options?: HttpClientOptions)
```

Options:

- `baseUrl`: Base URL for all requests
- `defaultHeaders`: Default headers to include with all requests
- `timeout`: Request timeout in milliseconds

#### Methods

- `get(url, options?)`: Perform GET request
- `post(url, options?)`: Perform POST request
- `put(url, options?)`: Perform PUT request
- `delete(url, options?)`: Perform DELETE request
- `request(method, url, options?)`: Base request method

### Types

The package includes TypeScript definitions for requests and responses:

- `HttpClientOptions`: Client configuration options
- `HttpRequestOptions`: Options for individual requests
- `HttpResponse<T>`: Typed response object

## License

Private - MCP DevTools
