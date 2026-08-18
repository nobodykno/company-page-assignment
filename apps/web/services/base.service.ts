import { IHeaderDto } from '../types/header';
import handleResponse from '../handler/request-handler';

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
  }

  // Next.js ISR
  if (request.revalidate !== undefined) {
    options.next = {
      revalidate: request.revalidate,
    };
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(request.url, options);

  console.log('HTTP RESPONSE:', {
    url: response.url,
    status: response.status,
    ok: response.ok,
  });

  return handleResponse<T>(response);
};