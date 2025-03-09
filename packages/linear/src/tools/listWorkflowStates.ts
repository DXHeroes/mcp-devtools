import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the list workflow states tool
 */
export const registerListWorkflowStatesTool = (server: McpServer): void => {
	// Define schema for listing workflow states
	const listWorkflowStatesParams = {
		teamId: z.string().describe("Team ID"),
	};

	// Register the list workflow states tool
	server.tool(
		"list_workflow_states",
		listWorkflowStatesParams,
		async ({ teamId }) => {
			try {
				const response = await linearApi.listWorkflowStates(teamId);

				if ("error" in response) {
					return {
						isError: true,
						content: [
							{
								type: "text",
								text: `Error listing workflow states: ${JSON.stringify(response.error)}`,
							},
						],
					};
				}

				const states = response.map((state) => ({
					id: state.id,
					name: state.name,
					color: state.color,
					type: state.type,
				}));

				return {
					content: [
						{
							type: "text",
							text: `Workflow states: ${JSON.stringify(states, null, 2)}`,
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
