/**
 * Jira API configuration
 */

/**
 * Jira API URL from environment variables
 */
export const JIRA_URL = process.env.JIRA_URL;

/**
 * Jira API Email from environment variables
 */
export const JIRA_API_MAIL = process.env.JIRA_API_MAIL;

/**
 * Jira API Key from environment variables
 */
export const JIRA_API_KEY = process.env.JIRA_API_KEY;

/**
 * Check if all required environment variables are set
 */
export function validateConfig(): boolean {
  return Boolean(JIRA_URL && JIRA_API_MAIL && JIRA_API_KEY);
}

/**
 * Get authentication headers for Jira API requests
 */
export function getAuthHeaders(): HeadersInit {
  const authHeader = `Basic ${Buffer.from(`${JIRA_API_MAIL}:${JIRA_API_KEY}`).toString('base64')}`;
  return {
    'Authorization': authHeader,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}

/**
 * Get attachment authentication headers for Jira API requests
 * Used for file uploads
 */
export function getAttachmentAuthHeaders(): HeadersInit {
  const authHeader = `Basic ${Buffer.from(`${JIRA_API_MAIL}:${JIRA_API_KEY}`).toString('base64')}`;
  return {
    'Authorization': authHeader,
    'X-Atlassian-Token': 'no-check'
  };
} 