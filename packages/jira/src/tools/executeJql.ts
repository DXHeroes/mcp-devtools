import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as jiraApi from "../api.js";

/**
 * Schema for the execute_jql tool parameters
 */
const executeJqlParams = {
	jql: z.string().describe("JQL query string"),
	maxResults: z
		.number()
		.optional()
		.default(10)
		.describe("Maximum number of results to return"),
};

/**
 * Register the execute_jql tool with the server
 */
export const registerExecuteJqlTool = (server: McpServer): void => {
	server.tool(
		"execute_jql",
		executeJqlParams,
		async ({ jql, maxResults }, extra) => {
			try {
				const response = await jiraApi.executeJQL(jql, maxResults);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error executing JQL: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				return {
					content: [
						{
							type: "text",
							text: `JQL Results: ${JSON.stringify(response, null, 2)}`,
						},
					],
				};
			} catch (error) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `Error: ${error instanceof Error ? error.message : String(error)}`,
						},
					],
				};
			}
		},
	);
};
