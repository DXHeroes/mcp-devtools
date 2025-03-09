import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the list projects tool
 */
export const registerListProjectsTool = (server: McpServer): void => {
	// Define schema for listing projects
	const listProjectsParams = {
		maxResults: z
			.number()
			.optional()
			.default(10)
			.describe("Maximum number of results to return"),
	};

	// Register the list projects tool
	server.tool("list_projects", listProjectsParams, async ({ maxResults }) => {
		try {
			const response = await linearApi.listProjects(maxResults);

			if ("error" in response) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `Error listing projects: ${JSON.stringify(response.error)}`,
						},
					],
				};
			}

			const projects = response.nodes.map((project) => ({
				id: project.id,
				name: project.name,
				description: project.description || "No description",
				state: project.state,
			}));

			return {
				content: [
					{
						type: "text",
						text: `Projects: ${JSON.stringify(projects, null, 2)}`,
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
};
