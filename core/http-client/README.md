# @mcp-devtools/http-client

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Internal Package](https://img.shields.io/badge/scope-internal-lightgrey)

Simple HTTP client for MCP servers with fetch-based implementation.

## 📋 Overview

This package provides a lightweight, fetch-based HTTP client designed specifically for use with MCP (Model Context Protocol) servers. It encapsulates common HTTP request patterns and error handling for interacting with RESTful APIs.

## ✨ Key Features

- 🔄 Simple, promise-based API
- 🌐 Support for common HTTP methods (GET, POST, PUT, DELETE)
- 📦 JSON parsing and stringification
- 📝 Request/response type definitions
- 🔧 Customizable headers and authentication
- ⚠️ Error handling for HTTP and network errors

## 🚀 Usage

This package is intended for internal use within the MCP DevTools monorepo, but can be used as follows:

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

## 📘 API Reference

### FetchHttpClient

Main client class that handles HTTP requests.

#### Constructor

```typescript
new FetchHttpClient(options?: HttpClientOptions)
```

Options:

| Option           | Type                   | Description                                  | Required            |
| ---------------- | ---------------------- | -------------------------------------------- | ------------------- |
| `baseUrl`        | string                 | Base URL for all requests                    | No                  |
| `defaultHeaders` | Record<string, string> | Default headers to include with all requests | No                  |
| `timeout`        | number                 | Request timeout in milliseconds              | No (default: 30000) |

#### Methods

| Method                           | Description            | Parameters                                                      |
| -------------------------------- | ---------------------- | --------------------------------------------------------------- |
| `get(url, options?)`             | Perform GET request    | `url`: string, `options?`: HttpRequestOptions                   |
| `post(url, options?)`            | Perform POST request   | `url`: string, `options?`: HttpRequestOptions                   |
| `put(url, options?)`             | Perform PUT request    | `url`: string, `options?`: HttpRequestOptions                   |
| `delete(url, options?)`          | Perform DELETE request | `url`: string, `options?`: HttpRequestOptions                   |
| `request(method, url, options?)` | Base request method    | `method`: string, `url`: string, `options?`: HttpRequestOptions |

### Types

The package includes TypeScript definitions for requests and responses:

```typescript
interface HttpClientOptions {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}

interface HttpRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: any;
  timeout?: number;
}

interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
```

## 🔍 Error Handling

The client provides built-in error handling for common HTTP and network errors:

```typescript
try {
  const response = await client.get("/items");
  // Handle successful response
} catch (error) {
  if (error.response) {
    // HTTP error with response
    console.error(
      `Error ${error.response.status}: ${error.response.statusText}`
    );
  } else if (error.request) {
    // Network error (no response)
    console.error("Network error, unable to reach server");
  } else {
    // Other error
    console.error("Error:", error.message);
  }
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
