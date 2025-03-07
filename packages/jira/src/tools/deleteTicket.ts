import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import * as jiraApi from "../api";

/**
 * Register the delete_ticket tool
 */
export const registerDeleteTicketTool = (server: McpServer): void => {
	server.tool(
		"delete_ticket",
		{
			issueIdOrKey: z.string().describe("Issue ID or key to delete"),
		},
		async ({ issueIdOrKey }) => {
			const response = await jiraApi.deleteTicket(issueIdOrKey);

			return {
				content: [
					{
						type: "text",
						text: `Ticket deleted: ${response === null ? "Successfully" : JSON.stringify(response, null, 2)}`,
					},
				],
			};
		},
	);
};
