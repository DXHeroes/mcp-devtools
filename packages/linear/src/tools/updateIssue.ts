import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the update issue tool
 */
export const registerUpdateIssueTool = (server: McpServer): void => {
	// Define schema for issue update
	const updateIssueParams = {
		issueId: z.string().describe("Issue ID or identifier"),
		title: z.string().optional().describe("New issue title"),
		description: z.string().optional().describe("New issue description"),
		priority: z.number().optional().describe("New issue priority (1-4)"),
		assigneeId: z.string().optional().describe("New assignee user ID"),
		stateId: z.string().optional().describe("New workflow state ID"),
	};

	// Register the update issue tool and its aliases
	const updateIssueTools = [
		"update_issue",
		"edit_issue",
		"update_task",
		"edit_task",
	];

	for (const tool of updateIssueTools) {
		server.tool(
			tool,
			updateIssueParams,
			async ({
				issueId,
				title,
				description,
				priority,
				assigneeId,
				stateId,
			}) => {
				try {
					const response = await linearApi.updateIssue(
						issueId,
						title,
						description,
						priority,
						assigneeId,
						stateId,
					);

					if ("error" in response) {
						return {
							isError: true,
							content: [
								{
									type: "text",
									text: `Error updating issue: ${JSON.stringify(response.error)}`,
								},
							],
						};
					}

					const issue = {
						id: response.issue.id,
						identifier: response.issue.identifier,
						title: response.issue.title,
						description: response.issue.description || "No description",
						priority: response.issue.priority,
						state: response.issue.state?.name || "Unknown",
						assignee: response.issue.assignee?.displayName || "Unassigned",
						team: response.issue.team?.name || "Unknown",
					};

					return {
						content: [
							{
								type: "text",
								text: `Issue updated successfully: ${JSON.stringify(issue, null, 2)}`,
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
	}
};
