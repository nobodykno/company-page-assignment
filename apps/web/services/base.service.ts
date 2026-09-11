import handleResponse from '@/handler/request-handler';
import { IHeaderDto } from '@/types/header';

export const httpService = async <T>(
  request: IHeaderDto,
  body?: string | object
): Promise<T> => {
  const options: RequestInit & {
    next?: {
      revalidate?: number;
    };
  } = {
    method: request.method,
    signal: request.signal,
  };
  // Next.js data caching
  if (request.cache) {
    options.cache = request.cache;
  }  if (request.revalidate !== undefined) {
    options.next = {
      revalidate: request.revalidate,
    };
  }

  if (body) {
    options.body = JSON.stringify(body);

    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  const baseUrl =
    typeof window === 'undefined'
      ? process.env.STRAPI_URL
      : process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL is not configured');
  }

  /*
   * request.url may already contain the server URL.
   * Therefore only replace the base URL when needed.
   */
  let url = request.url;

  if (typeof window !== 'undefined') {
    const serverUrl = process.env.STRAPI_URL;

    if (serverUrl && url.startsWith(serverUrl)) {
      url = url.replace(serverUrl, baseUrl!);
    }
  }

  const response = await fetch(url, options);

  return handleResponse<T>(response);
};