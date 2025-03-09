import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the search issues tool
 */
export const registerSearchIssuesTool = (server: McpServer): void => {
	// Define schema for issue search
	const searchIssuesParams = {
		query: z.string().describe("Search query string"),
		maxResults: z
			.number()
			.optional()
			.default(10)
			.describe("Maximum number of results to return"),
	};

	// Register the search issues tool
	server.tool(
		"search_issues",
		searchIssuesParams,
		async ({ query, maxResults }) => {
			try {
				const response = await linearApi.searchIssues(query, maxResults);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error searching issues: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				const issues = response.nodes.map((issue) => ({
					id: issue.id,
					identifier: issue.identifier,
					title: issue.title,
					description: issue.description || "No description",
					priority: issue.priority,
					state: issue.state?.name || "Unknown",
					assignee: issue.assignee?.displayName || "Unassigned",
					team: issue.team?.name || "Unknown",
				}));

				return {
					content: [
						{
							type: "text",
							text: `Found ${issues.length} issues: ${JSON.stringify(issues, null, 2)}`,
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

	// Register execute_graphql alias
	server.tool(
		"execute_graphql",
		searchIssuesParams,
		async ({ query, maxResults }) => {
			try {
				const response = await linearApi.searchIssues(query, maxResults);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error executing GraphQL query: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				const issues = response.nodes.map((issue) => ({
					id: issue.id,
					identifier: issue.identifier,
					title: issue.title,
					description: issue.description || "No description",
					priority: issue.priority,
					state: issue.state?.name || "Unknown",
					assignee: issue.assignee?.displayName || "Unassigned",
					team: issue.team?.name || "Unknown",
				}));

				return {
					content: [
						{
							type: "text",
							text: `Found ${issues.length} issues: ${JSON.stringify(issues, null, 2)}`,
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
};
