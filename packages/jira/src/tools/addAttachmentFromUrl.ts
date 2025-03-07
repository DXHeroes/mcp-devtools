import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import * as jiraApi from '../api';
import { z } from "zod";

/**
 * Register the add_attachment_from_public_url tool
 */
export const registerAddAttachmentFromUrlTool = (server: McpServer): void => {
  server.tool(
    "add_attachment_from_public_url",
    {
      issueIdOrKey: z.string().describe("Issue ID or key to add attachment to"),
      imageUrl: z.string().describe("Public URL of the image to attach")
    },
    async ({ issueIdOrKey, imageUrl }) => {
      const response = await jiraApi.addAttachment(issueIdOrKey, imageUrl);
      
      return {
        content: [{
          type: "text",
          text: `Attachment added: ${JSON.stringify(response, null, 2)}`
        }]
      };
    }
  );
}; 