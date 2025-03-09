import { GraphQLClient, gql } from "graphql-request";
import { LINEAR_API_URL, getAuthHeaders } from "./config.js";
import type {
	IssueCreateResponse,
	IssueDeleteResponse,
	IssueResponse,
	IssueSearchResponse,
	IssueUpdateResponse,
	LinearErrorResponse,
	LinearIssue,
	LinearIssueConnection,
	LinearIssueCreateResponse,
	LinearIssueDeleteResponse,
	LinearIssueUpdateResponse,
	LinearProject,
	LinearProjectConnection,
	LinearTeam,
	LinearUser,
	LinearWorkflowState,
	ProjectsResponse,
	TeamsResponse,
	UsersResponse,
	WorkflowStatesResponse,
} from "./types.js";

// Initialize GraphQL client
const graphQLClient = new GraphQLClient(LINEAR_API_URL, {
	headers: getAuthHeaders(),
});

/**
 * Execute a GraphQL query to search issues
 */
export async function searchIssues(
	query: string,
	first: number,
): Promise<LinearIssueConnection | LinearErrorResponse> {
	try {
		const searchQuery = gql`
      query SearchIssues($query: String!, $first: Int!) {
        issueSearch(query: $query, first: $first) {
          nodes {
            id
            identifier
            title
            description
            priority
            state {
              id
              name
              color
              type
            }
            assignee {
              id
              name
              displayName
              email
            }
            team {
              id
              name
              key
            }
            createdAt
            updatedAt
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

		const variables = {
			query,
			first,
		};

		const response = await graphQLClient.request<IssueSearchResponse>(
			searchQuery,
			variables,
		);
		return response.issueSearch as LinearIssueConnection;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Get issue by ID or identifier
 */
export async function getIssue(
	issueId: string,
): Promise<LinearIssue | LinearErrorResponse> {
	try {
		// Determine if the input is an issue ID (e.g., "ABC-123") or a node ID
		const isIdentifier = /^[A-Z]+-\d+$/.test(issueId);

		const query = isIdentifier
			? gql`
          query GetIssueByIdentifier($id: String!) {
            issue(id: $id) {
              id
              identifier
              title
              description
              priority
              state {
                id
                name
                color
                type
              }
              assignee {
                id
                name
                displayName
                email
              }
              team {
                id
                name
                key
              }
              createdAt
              updatedAt
            }
          }
        `
			: gql`
          query GetIssueById($id: String!) {
            issue(id: $id) {
              id
              identifier
              title
              description
              priority
              state {
                id
                name
                color
                type
              }
              assignee {
                id
                name
                displayName
                email
              }
              team {
                id
                name
                key
              }
              createdAt
              updatedAt
            }
          }
        `;

		const variables = { id: issueId };

		const response = await graphQLClient.request<IssueResponse>(
			query,
			variables,
		);
		return response.issue as LinearIssue;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Create a new issue
 */
export async function createIssue(
	teamId: string,
	title: string,
	description?: string,
	priority?: number,
	assigneeId?: string,
	stateId?: string,
): Promise<LinearIssueCreateResponse | LinearErrorResponse> {
	try {
		const mutation = gql`
      mutation CreateIssue(
        $teamId: String!, 
        $title: String!, 
        $description: String,
        $priority: Int,
        $assigneeId: String,
        $stateId: String
      ) {
        issueCreate(input: {
          teamId: $teamId,
          title: $title,
          description: $description,
          priority: $priority,
          assigneeId: $assigneeId,
          stateId: $stateId
        }) {
          success
          issue {
            id
            identifier
            title
            description
            priority
            state {
              id
              name
              color
              type
            }
            assignee {
              id
              name
              displayName
            }
            team {
              id
              name
              key
            }
          }
        }
      }
    `;

		const variables = {
			teamId,
			title,
			description,
			priority,
			assigneeId,
			stateId,
		};

		const response = await graphQLClient.request<IssueCreateResponse>(
			mutation,
			variables,
		);
		return response.issueCreate as LinearIssueCreateResponse;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Update an existing issue
 */
export async function updateIssue(
	issueId: string,
	title?: string,
	description?: string,
	priority?: number,
	assigneeId?: string,
	stateId?: string,
): Promise<LinearIssueUpdateResponse | LinearErrorResponse> {
	try {
		const mutation = gql`
      mutation UpdateIssue(
        $issueId: String!, 
        $title: String, 
        $description: String,
        $priority: Int,
        $assigneeId: String,
        $stateId: String
      ) {
        issueUpdate(
          id: $issueId,
          input: {
            title: $title,
            description: $description,
            priority: $priority,
            assigneeId: $assigneeId,
            stateId: $stateId
          }
        ) {
          success
          issue {
            id
            identifier
            title
            description
            priority
            state {
              id
              name
              color
              type
            }
            assignee {
              id
              name
              displayName
            }
            team {
              id
              name
              key
            }
          }
        }
      }
    `;

		const variables = {
			issueId,
			title,
			description,
			priority,
			assigneeId,
			stateId,
		};

		const response = await graphQLClient.request<IssueUpdateResponse>(
			mutation,
			variables,
		);
		return response.issueUpdate as LinearIssueUpdateResponse;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Delete an issue
 */
export async function deleteIssue(
	issueId: string,
): Promise<LinearIssueDeleteResponse | LinearErrorResponse> {
	try {
		const mutation = gql`
      mutation DeleteIssue($issueId: String!) {
        issueDelete(id: $issueId) {
          success
        }
      }
    `;

		const variables = {
			issueId,
		};

		const response = await graphQLClient.request<IssueDeleteResponse>(
			mutation,
			variables,
		);
		return response.issueDelete as LinearIssueDeleteResponse;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * List teams
 */
export async function listTeams(): Promise<LinearTeam[] | LinearErrorResponse> {
	try {
		const query = gql`
      query ListTeams {
        teams {
          nodes {
            id
            name
            key
          }
        }
      }
    `;

		const response = await graphQLClient.request<TeamsResponse>(query);
		return response.teams.nodes as LinearTeam[];
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * List workflow states for a team
 */
export async function listWorkflowStates(
	teamId: string,
): Promise<LinearWorkflowState[] | LinearErrorResponse> {
	try {
		const query = gql`
      query ListWorkflowStates($teamId: String!) {
        team(id: $teamId) {
          states {
            nodes {
              id
              name
              color
              type
            }
          }
        }
      }
    `;

		const variables = {
			teamId,
		};

		const response = await graphQLClient.request<WorkflowStatesResponse>(
			query,
			variables,
		);
		return response.team.states.nodes as LinearWorkflowState[];
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * List users
 */
export async function listUsers(): Promise<LinearUser[] | LinearErrorResponse> {
	try {
		const query = gql`
      query ListUsers {
        users {
          nodes {
            id
            name
            displayName
            email
            active
          }
        }
      }
    `;

		const response = await graphQLClient.request<UsersResponse>(query);
		return response.users.nodes as LinearUser[];
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * List projects
 */
export async function listProjects(
	first = 10,
): Promise<LinearProjectConnection | LinearErrorResponse> {
	try {
		const query = gql`
      query ListProjects($first: Int!) {
        projects(first: $first) {
          nodes {
            id
            name
            description
            state
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

		const variables = {
			first,
		};

		const response = await graphQLClient.request<ProjectsResponse>(
			query,
			variables,
		);
		return response.projects as LinearProjectConnection;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}
