import type { HttpClient, HttpRequestOptions, HttpResponse } from './types';

/**
 * HTTP client implementation using fetch API
 */
export class FetchHttpClient implements HttpClient {
  /**
   * Make a HTTP request
   */
  async request<T>(url: string, options: HttpRequestOptions = {}): Promise<HttpResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      params,
      body,
      responseType = 'json'
    } = options;

    // Build URL with query parameters
    const requestUrl = params ? this.buildUrl(url, params) : url;

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
    };

    // Add body if present
    if (body !== undefined) {
      if (body instanceof FormData) {
        requestOptions.body = body;
      } else {
        requestOptions.body = JSON.stringify(body);
        // Add content-type if not already set and not FormData
        if (!Object.keys(headers).find(h => h.toLowerCase() === 'content-type')) {
          (requestOptions.headers as Record<string, string>)['Content-Type'] = 'application/json';
        }
      }
    }

    // Make the request
    const response = await fetch(requestUrl, requestOptions);

    // Process response based on responseType
    let data: T;
    switch (responseType) {
      case 'text':
        data = await response.text() as unknown as T;
        break;
      case 'arrayBuffer':
        data = await response.arrayBuffer() as unknown as T;
        break;
      case 'blob':
        data = await response.blob() as unknown as T;
        break;
      default:
        // Default to JSON
        data = (response.status !== 204 ? await response.json() : null) as T;
        break;
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    };
  }

  /**
   * Make a GET request
   */
  get<T>(url: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Make a POST request
   */
  post<T>(url: string, data?: unknown, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: 'POST', body: data });
  }

  /**
   * Make a PUT request
   */
  put<T>(url: string, data?: unknown, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PUT', body: data });
  }

  /**
   * Make a DELETE request
   */
  delete<T>(url: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(url: string, params: Record<string, string | number | boolean | undefined>): string {
    const queryParams = new URLSearchParams();
    
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    }
    
    const queryString = queryParams.toString();
    return queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
  }
} 