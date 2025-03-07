import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import * as jiraApi from "../api";

// Define interfaces for safer type checking
interface TicketDescription {
	content?: Array<{
		content?: Array<{
			text?: string;
		}>;
	}>;
}

/**
 * Register the ticket retrieval tools
 */
export const registerGetTicketTools = (server: McpServer): void => {
	// Define schema for ticket retrieval
	const getTicketParams = {
		jql: z.string().describe("JQL query string"),
		maxResults: z
			.number()
			.optional()
			.default(10)
			.describe("Maximum number of results to return"),
	};

	// Register all ticket retrieval tools
	const getTicketTools = [
		"get_only_ticket_name_and_description",
		"get_ticket",
		"read_ticket",
		"get_task",
		"read_task",
	];

	for (const tool of getTicketTools) {
		server.tool(tool, getTicketParams, async ({ jql, maxResults }) => {
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

				// Return only the ticket name and description
				const tickets = response.issues.map((issue) => {
					const descObj = issue.fields.description as
						| TicketDescription
						| undefined;
					const description =
						descObj?.content?.[0]?.content?.[0]?.text || "No description";

					return {
						key: issue.key,
						summary: issue.fields.summary,
						description,
					};
				});

				return {
					content: [
						{
							type: "text",
							text: `Found ${tickets.length} tickets: ${JSON.stringify(tickets, null, 2)}`,
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
		});
	}
};
