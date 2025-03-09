import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the list users tool
 */
export const registerListUsersTool = (server: McpServer): void => {
	// Define schema for listing users
	const listUsersParams = {};

	// Register the list users tool
	server.tool("list_users", listUsersParams, async () => {
		try {
			const response = await linearApi.listUsers();

			if ("error" in response) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `Error listing users: ${JSON.stringify(response.error)}`,
						},
					],
				};
			}

			const users = response.map((user) => ({
				id: user.id,
				name: user.name,
				displayName: user.displayName,
				email: user.email,
				active: user.active,
			}));

			return {
				content: [
					{
						type: "text",
						text: `Users: ${JSON.stringify(users, null, 2)}`,
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
