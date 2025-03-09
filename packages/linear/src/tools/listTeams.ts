import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as linearApi from "../api.js";

/**
 * Register the list teams tool
 */
export const registerListTeamsTool = (server: McpServer): void => {
	// Define schema for listing teams
	const listTeamsParams = {};

	// Register the list teams tool
	server.tool("list_teams", listTeamsParams, async () => {
		try {
			const response = await linearApi.listTeams();

			if ("error" in response) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `Error listing teams: ${JSON.stringify(response.error)}`,
						},
					],
				};
			}

			const teams = response.map((team) => ({
				id: team.id,
				name: team.name,
				key: team.key,
			}));

			return {
				content: [
					{
						type: "text",
						text: `Teams: ${JSON.stringify(teams, null, 2)}`,
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
