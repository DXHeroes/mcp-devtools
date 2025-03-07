import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import * as jiraApi from "../api";

/**
 * Register the create_ticket tool
 */
export const registerCreateTicketTool = (server: McpServer): void => {
	const createTicketParams = {
		project: z.string().describe("Project key"),
		summary: z.string().describe("Ticket summary"),
		description: z.string().describe("Ticket description"),
		issuetype: z.string().describe("Issue type name (Bug, Story, etc.)"),
		parent: z.string().optional().describe("Parent issue key (for subtasks)"),
	};

	server.tool(
		"create_ticket",
		createTicketParams,
		async ({ project, summary, description, issuetype, parent }) => {
			try {
				const response = await jiraApi.createTicket(
					project,
					summary,
					description,
					issuetype,
					parent,
				);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error creating ticket: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				return {
					content: [
						{
							type: "text",
							text: `Ticket created: ${JSON.stringify(response, null, 2)}`,
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
