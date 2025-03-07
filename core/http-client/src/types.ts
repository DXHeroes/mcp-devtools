/**
 * Supported HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * HTTP request options
 */
export interface HttpRequestOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  responseType?: 'json' | 'text' | 'arrayBuffer' | 'blob';
}

/**
 * HTTP response
 */
export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

/**
 * Error response from the server
 */
export interface ErrorResponse {
  error: string | object;
}

/**
 * HTTP client interface
 */
export interface HttpClient {
  /**
   * Make a HTTP request
   */
  request<T = unknown>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  
  /**
   * Make a GET request
   */
  get<T = unknown>(url: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>>;
  
  /**
   * Make a POST request
   */
  post<T = unknown>(url: string, data?: unknown, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>>;
  
  /**
   * Make a PUT request
   */
  put<T = unknown>(url: string, data?: unknown, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>>;
  
  /**
   * Make a DELETE request
   */
  delete<T = unknown>(url: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>>;
} 