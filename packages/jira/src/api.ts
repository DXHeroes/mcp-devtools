import {
	JIRA_URL,
	getAttachmentAuthHeaders,
	getAuthHeaders,
} from "./config.js";
// Using Node.js built-in fetch API
import type {
	JiraAttachmentResponse,
	JiraErrorResponse,
	JiraIssue,
	JiraProject,
	JiraSearchResponse,
	JiraStatus,
	JiraTicketResponse,
	JiraUser,
} from "./types.js";

/**
 * Execute a JQL query
 */
export async function executeJQL(
	jql: string,
	maxResults: number,
): Promise<JiraSearchResponse | JiraErrorResponse> {
	try {
		const params = new URLSearchParams({
			jql,
			maxResults: maxResults.toString(),
		});

		const response = await fetch(
			`${JIRA_URL}/rest/api/3/search?${params.toString()}`,
			{
				method: "GET",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Query assignable users for a project
 */
export async function queryAssignable(
	project_key: string,
): Promise<JiraUser[] | JiraErrorResponse> {
	try {
		const params = new URLSearchParams({
			project: project_key,
		});

		const response = await fetch(
			`${JIRA_URL}/rest/api/3/user/assignable/search?${params.toString()}`,
			{
				method: "GET",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Get a Jira ticket
 */
export async function getTicket(
	issueIdOrKey: string,
): Promise<JiraIssue | JiraErrorResponse> {
	try {
		const response = await fetch(
			`${JIRA_URL}/rest/api/3/issue/${issueIdOrKey}`,
			{
				method: "GET",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Create a new Jira ticket
 */
export async function createTicket(
	project: string,
	summary: string,
	description: string,
	issuetype: string,
	parentID?: string,
): Promise<JiraTicketResponse | JiraErrorResponse> {
	try {
		const jiraDescription = {
			type: "doc",
			version: 1,
			content: [
				{
					type: "paragraph",
					content: [
						{
							text: description,
							type: "text",
						},
					],
				},
			],
		};

		// Create the data object with proper type handling
		const data: {
			fields: {
				project: { key: string };
				summary: string;
				description: unknown;
				issuetype: { name: string };
				parent?: { key: string };
			};
		} = {
			fields: {
				project: { key: project },
				summary,
				description: jiraDescription,
				issuetype: { name: issuetype },
			},
		};

		// Add parent if provided
		if (parentID) {
			data.fields.parent = { key: parentID };
		}

		const response = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
			method: "POST",
			headers: getAuthHeaders(),
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * List all Jira projects
 */
export async function listProjects(
	number_of_results: number,
): Promise<JiraProject[] | JiraErrorResponse> {
	try {
		const params = new URLSearchParams({
			maxResults: number_of_results.toString(),
		});

		const response = await fetch(
			`${JIRA_URL}/rest/api/3/project/search?${params.toString()}`,
			{
				method: "GET",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Delete a Jira ticket
 */
export async function deleteTicket(
	issueIdOrKey: string,
): Promise<null | JiraErrorResponse> {
	try {
		const response = await fetch(
			`${JIRA_URL}/rest/api/3/issue/${issueIdOrKey}`,
			{
				method: "DELETE",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return null;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Edit a Jira ticket
 */
export async function editTicket(
	issueIdOrKey?: string,
	summary?: string,
	description?: string,
	labels?: string[],
	parent?: string,
): Promise<null | JiraErrorResponse> {
	try {
		if (!issueIdOrKey) {
			return { error: "Issue ID or key is required" };
		}

		const jiraDescription = description
			? {
					type: "doc",
					version: 1,
					content: [
						{
							type: "paragraph",
							content: [
								{
									text: description,
									type: "text",
								},
							],
						},
					],
				}
			: undefined;

		const parentToSend = parent ? { key: parent } : undefined;

		// Create the fields object with only the provided fields
		const fields: Record<string, unknown> = {};

		if (summary) fields.summary = summary;
		if (labels) fields.labels = labels;
		if (parent) fields.parent = parentToSend;
		if (description) fields.description = jiraDescription;

		const response = await fetch(
			`${JIRA_URL}/rest/api/3/issue/${issueIdOrKey}`,
			{
				method: "PUT",
				headers: getAuthHeaders(),
				body: JSON.stringify({ fields }),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return null;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Get all Jira statuses
 */
export async function getAllStatus(
	number_of_results: number,
): Promise<JiraStatus[] | JiraErrorResponse> {
	try {
		const params = new URLSearchParams({
			maxResults: number_of_results.toString(),
		});

		const response = await fetch(
			`${JIRA_URL}/rest/api/3/status?${params.toString()}`,
			{
				method: "GET",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Assign a ticket to a user
 */
export async function assignTicket(
	accountId: string,
	issueIdOrKey: string,
): Promise<null | JiraErrorResponse> {
	try {
		const response = await fetch(
			`${JIRA_URL}/rest/api/3/issue/${issueIdOrKey}/assignee`,
			{
				method: "PUT",
				headers: getAuthHeaders(),
				body: JSON.stringify({ accountId }),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return null;
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Add an attachment to a ticket from a public URL
 */
export async function addAttachment(
	issueIdOrKey: string,
	imageUrl: string,
): Promise<JiraAttachmentResponse | JiraErrorResponse> {
	try {
		// Download the image
		const imageResponse = await fetch(imageUrl);

		if (!imageResponse.ok) {
			return {
				error: `Failed to download image: ${imageResponse.status}`,
			};
		}

		const imageBuffer = await imageResponse.arrayBuffer();
		const imageFileName = imageUrl.split("/").pop() || "attachment";

		// Create form data
		const formData = new FormData();
		const blob = new Blob([imageBuffer]);
		formData.append("file", blob, imageFileName);

		// Upload to Jira
		const response = await fetch(
			`${JIRA_URL}/rest/api/3/issue/${issueIdOrKey}/attachments`,
			{
				method: "POST",
				headers: getAttachmentAuthHeaders(),
				body: formData,
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Add an attachment from Confluence to a ticket
 */
export async function addAttachmentFromConfluence(
	issueIdOrKey: string,
	pageId: string,
	attachmentName: string,
): Promise<JiraAttachmentResponse | JiraErrorResponse> {
	try {
		// Get attachment from Confluence
		const response = await fetch(
			`${JIRA_URL}/wiki/rest/api/content/${pageId}/child/attachment`,
			{
				method: "GET",
				headers: getAuthHeaders(),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		const data = await response.json();
		const attachment = data.results.find(
			(att: { title: string; download?: string }) =>
				att.title === attachmentName,
		);

		if (!attachment) {
			return {
				error: `Attachment "${attachmentName}" not found on page ${pageId}`,
			};
		}

		if (!attachment.download) {
			return {
				error: `Download link not found for attachment "${attachmentName}"`,
			};
		}

		// Download the attachment content
		const attachmentResponse = await fetch(attachment.download, {
			method: "GET",
			headers: getAuthHeaders(),
		});

		if (!attachmentResponse.ok) {
			return {
				error: `Failed to download attachment: ${attachmentResponse.status}`,
			};
		}

		const attachmentBuffer = await attachmentResponse.arrayBuffer();

		// Create form data
		const formData = new FormData();
		const blob = new Blob([attachmentBuffer]);
		formData.append("file", blob, attachment.title);

		// Upload to Jira
		const uploadResponse = await fetch(
			`${JIRA_URL}/rest/api/3/issue/${issueIdOrKey}/attachments`,
			{
				method: "POST",
				headers: getAttachmentAuthHeaders(),
				body: formData,
			},
		);

		if (!uploadResponse.ok) {
			const errorData = await uploadResponse.json();
			return {
				error: errorData || `HTTP error: ${response.status}`,
			};
		}

		return await uploadResponse.json();
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}
