import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as jiraApi from "../api.js";

/**
 * Register the list_projects tool
 */
export const registerListProjectsTool = (server: McpServer): void => {
	server.tool(
		"list_projects",
		{
			maxResults: z
				.number()
				.optional()
				.default(50)
				.describe("Maximum number of projects to return"),
		},
		async ({ maxResults }) => {
			const response = await jiraApi.listProjects(maxResults);

			return {
				content: [
					{
						type: "text",
						text: `Projects: ${JSON.stringify(response, null, 2)}`,
					},
				],
			};
		},
	);
};
