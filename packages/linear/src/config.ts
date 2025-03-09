/**
 * Linear API configuration
 */

/**
 * Linear API URL
 */
export const LINEAR_API_URL = "https://api.linear.app/graphql";

/**
 * Linear API Key from environment variables
 */
export const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

/**
 * Check if all required environment variables are set
 */
export function validateConfig(): boolean {
	return Boolean(LINEAR_API_KEY);
}

/**
 * Get authentication headers for Linear API requests
 */
export function getAuthHeaders(): HeadersInit {
	return {
		Authorization: `${LINEAR_API_KEY}`,
		"Content-Type": "application/json",
	};
}
