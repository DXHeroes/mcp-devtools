import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import * as jiraApi from "../api";

/**
 * Register the edit_ticket tool
 */
export const registerEditTicketTool = (server: McpServer): void => {
	server.tool(
		"edit_ticket",
		{
			issueIdOrKey: z.string().describe("Issue ID or key to edit"),
			summary: z.string().optional().describe("New summary"),
			description: z.string().optional().describe("New description"),
			labels: z.array(z.string()).optional().describe("Labels to set"),
			parent: z.string().optional().describe("New parent issue key"),
		},
		async ({ issueIdOrKey, summary, description, labels, parent }) => {
			const response = await jiraApi.editTicket(
				issueIdOrKey,
				summary,
				description,
				labels,
				parent,
			);

			return {
				content: [
					{
						type: "text",
						text: `Ticket updated: ${response === null ? "Successfully" : JSON.stringify(response, null, 2)}`,
					},
				],
			};
		},
	);
};
