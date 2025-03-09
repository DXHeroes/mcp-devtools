/**
 * Error response from Linear API
 */
export interface LinearErrorResponse {
	error: string | object;
}

/**
 * Linear user
 */
export interface LinearUser {
	id: string;
	name: string;
	email: string;
	displayName: string;
	active: boolean;
	[key: string]: unknown;
}

/**
 * Linear team
 */
export interface LinearTeam {
	id: string;
	name: string;
	key: string;
	[key: string]: unknown;
}

/**
 * Linear workflow state
 */
export interface LinearWorkflowState {
	id: string;
	name: string;
	color: string;
	type: string;
	[key: string]: unknown;
}

/**
 * Linear issue
 */
export interface LinearIssue {
	id: string;
	identifier: string;
	title: string;
	description: string;
	priority: number;
	state: LinearWorkflowState;
	assignee?: LinearUser;
	team: LinearTeam;
	createdAt: string;
	updatedAt: string;
	[key: string]: unknown;
}

/**
 * Linear issue connection (paginated results)
 */
export interface LinearIssueConnection {
	nodes: LinearIssue[];
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string;
	};
	[key: string]: unknown;
}

/**
 * Linear issue create response
 */
export interface LinearIssueCreateResponse {
	success: boolean;
	issue: LinearIssue;
	[key: string]: unknown;
}

/**
 * Linear issue update response
 */
export interface LinearIssueUpdateResponse {
	success: boolean;
	issue: LinearIssue;
	[key: string]: unknown;
}

/**
 * Linear issue delete response
 */
export interface LinearIssueDeleteResponse {
	success: boolean;
	[key: string]: unknown;
}

/**
 * Linear comment
 */
export interface LinearComment {
	id: string;
	body: string;
	user: LinearUser;
	createdAt: string;
	[key: string]: unknown;
}

/**
 * Linear project
 */
export interface LinearProject {
	id: string;
	name: string;
	description: string;
	state: string;
	[key: string]: unknown;
}

/**
 * Linear project connection
 */
export interface LinearProjectConnection {
	nodes: LinearProject[];
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string;
	};
	[key: string]: unknown;
}

/**
 * GraphQL Response Types
 */

export interface IssueSearchResponse {
	issueSearch: LinearIssueConnection;
}

export interface IssueResponse {
	issue: LinearIssue;
}

export interface IssueCreateResponse {
	issueCreate: LinearIssueCreateResponse;
}

export interface IssueUpdateResponse {
	issueUpdate: LinearIssueUpdateResponse;
}

export interface IssueDeleteResponse {
	issueDelete: LinearIssueDeleteResponse;
}

export interface TeamsResponse {
	teams: {
		nodes: LinearTeam[];
	};
}

export interface WorkflowStatesResponse {
	team: {
		states: {
			nodes: LinearWorkflowState[];
		};
	};
}

export interface UsersResponse {
	users: {
		nodes: LinearUser[];
	};
}

export interface ProjectsResponse {
	projects: LinearProjectConnection;
}
