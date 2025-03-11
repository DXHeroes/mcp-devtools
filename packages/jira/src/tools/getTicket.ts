import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as jiraApi from "../api.js";

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
		issueIdOrKey: z.string().describe("The issue ID or key of the ticket"),
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
		server.tool(tool, getTicketParams, async ({ issueIdOrKey }) => {
			try {
				const response = await jiraApi.getTicket(issueIdOrKey);

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

				const ticket = {
					key: response.fields.key,
					summary: response.fields.summary,
					description: response.fields.description,
					attachment: response.fields.attachment?.map((attachment) => ({
						id: attachment.id,
						filename: attachment.filename,
						size: attachment.size,
						content: attachment.content,
					})),
				};

				return {
					content: [
						{
							type: "text",
							text: `Found ticket: ${JSON.stringify(ticket, null, 2)}`,
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
