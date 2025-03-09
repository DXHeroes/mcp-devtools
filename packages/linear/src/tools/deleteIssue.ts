import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the delete issue tool
 */
export const registerDeleteIssueTool = (server: McpServer): void => {
	// Define schema for issue deletion
	const deleteIssueParams = {
		issueId: z.string().describe("Issue ID or identifier"),
	};

	// Register the delete issue tool and its aliases
	const deleteIssueTools = ["delete_issue", "delete_task"];

	for (const tool of deleteIssueTools) {
		server.tool(tool, deleteIssueParams, async ({ issueId }) => {
			try {
				// If the issueId is an identifier like "ENG-123", first get the actual issue ID
				let actualIssueId = issueId;
				if (/^[A-Z]+-\d+$/.test(issueId)) {
					const getIssueResponse = await linearApi.getIssue(issueId);
					if ("error" in getIssueResponse) {
						return {
							isError: true,
							content: [
								{
									type: "text",
									text: `Error retrieving issue for deletion: ${JSON.stringify(getIssueResponse.error)}`,
								},
							],
						};
					}
					actualIssueId = getIssueResponse.id;
				}

				const response = await linearApi.deleteIssue(actualIssueId);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error deleting issue: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				return {
					content: [
						{
							type: "text",
							text: `Issue ${issueId} deleted successfully.`,
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
