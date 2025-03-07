import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import * as jiraApi from "../api";

/**
 * Register the assign_ticket tool
 */
export const registerAssignTicketTool = (server: McpServer): void => {
	server.tool(
		"assign_ticket",
		{
			accountId: z.string().describe("Assignee's account ID"),
			issueIdOrKey: z.string().describe("Issue ID or key to assign"),
		},
		async ({ accountId, issueIdOrKey }) => {
			const response = await jiraApi.assignTicket(accountId, issueIdOrKey);

			return {
				content: [
					{
						type: "text",
						text: `Ticket assigned: ${response === null ? "Successfully" : JSON.stringify(response, null, 2)}`,
					},
				],
			};
		},
	);
};
