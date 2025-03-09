#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { validateConfig } from "./config.js";
import { registerTools } from "./tools.js";

/**
 * Main function to start the Linear MCP server
 */
async function main(): Promise<void> {
	try {
		// Validate configuration
		if (!validateConfig()) {
			console.error("Missing required environment variable: LINEAR_API_KEY");
			process.exit(1);
		}

		// Initialize server
		const server = new McpServer({
			name: "linear-mcp-server",
			version: "1.0.0",
		});

		// Register all tools
		registerTools(server);

		// Connect to transport
		const transport = new StdioServerTransport();
		await server.connect(transport);

		console.error("Linear MCP Server started");
	} catch (error) {
		console.error("Failed to start Linear MCP Server:", error);
		process.exit(1);
	}
}

// Start the server
main();
