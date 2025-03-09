import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  registerCreateIssueTool,
  registerSearchIssuesTool,
  registerGetIssueTool,
  registerListProjectsTool,
  registerListTeamsTool,
  registerListUsersTool,
  registerListWorkflowStatesTool,
  registerDeleteIssueTool,
  registerUpdateIssueTool
} from './tools/index.js';

/**
 * Register all tools for the Linear MCP server
 */
export function registerTools(server: McpServer): void {
  // Register all tools
  registerSearchIssuesTool(server);
  registerGetIssueTool(server);
  registerCreateIssueTool(server);
  registerUpdateIssueTool(server);
  registerDeleteIssueTool(server);
  registerListTeamsTool(server);
  registerListWorkflowStatesTool(server);
  registerListUsersTool(server);
  registerListProjectsTool(server);
} 