#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { validateConfig } from './config';
import { registerTools } from './tools';

/**
 * Main function to start the Jira MCP server
 */
async function main(): Promise<void> {
  try {
    // Validate configuration
    if (!validateConfig()) {
      console.error('Missing required environment variables: JIRA_URL, JIRA_API_MAIL, or JIRA_API_KEY');
      process.exit(1);
    }

    // Initialize server
    const server = new McpServer({
      name: "jira-mcp-server",
      version: "1.0.0"
    });

    // Register all tools
    registerTools(server);

    // Connect to transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('Jira MCP Server started');
  } catch (error) {
    console.error('Failed to start Jira MCP Server:', error);
    process.exit(1);
  }
}

// Start the server
main();
