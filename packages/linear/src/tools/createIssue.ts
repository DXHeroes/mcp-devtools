import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the create issue tool
 */
export const registerCreateIssueTool = (server: McpServer): void => {
	// Define schema for issue creation
	const createIssueParams = {
		teamId: z.string().describe("Team ID"),
		title: z.string().describe("Issue title"),
		description: z.string().optional().describe("Issue description"),
		priority: z.number().optional().describe("Issue priority (1-4)"),
		assigneeId: z.string().optional().describe("Assignee user ID"),
		stateId: z.string().optional().describe("Workflow state ID"),
	};

	// Register the create issue tool and its aliases
	const createIssueTools = ["create_issue", "create_task"];

	for (const tool of createIssueTools) {
		server.tool(
			tool,
			createIssueParams,
			async ({ teamId, title, description, priority, assigneeId, stateId }) => {
				try {
					const response = await linearApi.createIssue(
						teamId,
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
									text: `Error creating issue: ${JSON.stringify(response.error)}`,
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
								text: `Issue created successfully: ${JSON.stringify(issue, null, 2)}`,
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
