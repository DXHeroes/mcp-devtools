import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the get issue tool
 */
export const registerGetIssueTool = (server: McpServer): void => {
	// Define schema for issue retrieval
	const getIssueParams = {
		issueId: z
			.string()
			.describe("Issue identifier (e.g., 'ENG-123' or issue ID)"),
	};

	// Register the get issue tool and its aliases
	const getIssueTools = ["get_issue", "read_issue", "get_task", "read_task"];

	for (const tool of getIssueTools) {
		server.tool(tool, getIssueParams, async ({ issueId }) => {
			try {
				const response = await linearApi.getIssue(issueId);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error retrieving issue: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				const issue = {
					id: response.id,
					identifier: response.identifier,
					title: response.title,
					description: response.description || "No description",
					priority: response.priority,
					state: response.state?.name || "Unknown",
					assignee: response.assignee?.displayName || "Unassigned",
					team: response.team?.name || "Unknown",
					created: response.createdAt,
					updated: response.updatedAt,
				};

				return {
					content: [
						{
							type: "text",
							text: `Issue details: ${JSON.stringify(issue, null, 2)}`,
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
