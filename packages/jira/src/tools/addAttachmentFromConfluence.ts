import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import * as jiraApi from '../api';
import { z } from "zod";

/**
 * Register the add_attachment_from_confluence tool
 */
export const registerAddAttachmentFromConfluenceTool = (server: McpServer): void => {
  server.tool(
    "add_attachment_from_confluence",
    {
      issueIdOrKey: z.string().describe("Issue ID or key to add attachment to"),
      pageId: z.string().describe("Confluence page ID"),
      attachmentName: z.string().describe("Name of the attachment in Confluence")
    },
    async ({ issueIdOrKey, pageId, attachmentName }) => {
      const response = await jiraApi.addAttachmentFromConfluence(issueIdOrKey, pageId, attachmentName);
      
      return {
        content: [{
          type: "text",
          text: `Attachment added: ${JSON.stringify(response, null, 2)}`
        }]
      };
    }
  );
}; 