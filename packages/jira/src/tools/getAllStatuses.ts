import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as jiraApi from "../api.js";

/**
 * Register the get_all_statuses tool
 */
export const registerGetAllStatusesTool = (server: McpServer): void => {
	server.tool(
		"get_all_statuses",
		{
			maxResults: z
				.number()
				.optional()
				.default(50)
				.describe("Maximum number of statuses to return"),
		},
		async ({ maxResults }) => {
			const response = await jiraApi.getAllStatus(maxResults);

			return {
				content: [
					{
						type: "text",
						text: `Statuses: ${JSON.stringify(response, null, 2)}`,
					},
				],
			};
		},
	);
};
