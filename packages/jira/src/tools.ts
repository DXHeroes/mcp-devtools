import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  registerExecuteJqlTool,
  registerGetTicketTools,
  registerCreateTicketTool,
  registerListProjectsTool,
  registerDeleteTicketTool,
  registerEditTicketTool,
  registerGetAllStatusesTool,
  registerAssignTicketTool,
  registerQueryAssignableTool,
  registerAddAttachmentFromUrlTool,
  registerAddAttachmentFromConfluenceTool
} from './tools/index.js';

/**
 * Register all tools for the Jira MCP server
 */
export function registerTools(server: McpServer): void {
  // Register all tools
  registerExecuteJqlTool(server);
  registerGetTicketTools(server);
  registerCreateTicketTool(server);
  registerListProjectsTool(server);
  registerDeleteTicketTool(server);
  registerEditTicketTool(server);
  registerGetAllStatusesTool(server);
  registerAssignTicketTool(server);
  registerQueryAssignableTool(server);
  registerAddAttachmentFromUrlTool(server);
  registerAddAttachmentFromConfluenceTool(server);
} 