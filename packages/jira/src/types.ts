/**
 * Error response from Jira API
 */
export interface JiraErrorResponse {
  error: string | object;
}

/**
 * Jira attachment
 */
export interface JiraAttachment {
  id: string;
  title: string;
  filename: string;
  mimeType: string;
  size: number;
  content: string;
  [key: string]: unknown;
}

/**
 * Jira attachment response
 */
export interface JiraAttachmentResponse {
  id: string;
  self: string;
  filename: string;
  [key: string]: unknown;
}

/**
 * Jira ticket response
 */
export interface JiraTicketResponse {
  id: string;
  key: string;
  self: string;
  [key: string]: unknown;
}

/**
 * Jira user
 */
export interface JiraUser {
  accountId: string;
  displayName: string;
  emailAddress?: string;
  active: boolean;
  [key: string]: unknown;
}

/**
 * Jira project
 */
export interface JiraProject {
  id: string;
  key: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Jira status
 */
export interface JiraStatus {
  id: string;
  name: string;
  statusCategory: {
    id: number;
    key: string;
    name: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Jira issue
 */
export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    description?: unknown;
    status?: {
      name: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Jira search response
 */
export interface JiraSearchResponse {
  issues: JiraIssue[];
  total: number;
  [key: string]: unknown;
} 