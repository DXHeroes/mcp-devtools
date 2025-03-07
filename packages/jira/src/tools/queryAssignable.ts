import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import * as jiraApi from '../api';
import { z } from "zod";

/**
 * Register the query_assignable tool
 */
export const registerQueryAssignableTool = (server: McpServer): void => {
  server.tool(
    "query_assignable",
    {
      project_key: z.string().describe("Project key to query assignable users for")
    },
    async ({ project_key }) => {
      const response = await jiraApi.queryAssignable(project_key);
      
      return {
        content: [{
          type: "text",
          text: `Assignable users: ${JSON.stringify(response, null, 2)}`
        }]
      };
    }
  );
}; 