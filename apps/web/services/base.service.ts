
import { TIMEOUT_DURATION } from '@/constants/cache';
import handleResponse, {
  handlePaginatedResponse,
} from '@/handler/request-handler';
import { IHeaderDto } from '@/types/header';
import { IPaginatedResult } from '@/types/pagination';



type RequestBody = string | object | FormData;

type RequestOptions = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

const createRequestOptions = (
  request: IHeaderDto,
  body?: RequestBody
): RequestOptions => {
  const options: RequestOptions = {
    method: request.method,
    signal: request.signal,
  };

  if (request.cache) {
    options.cache = request.cache;
  }

  if (request.revalidate !== undefined) {
    options.next = {
      revalidate: request.revalidate,
      tags: request.tags,
    };
  }

  if (body !== undefined) {
    if (request.isFormData) {
      options.body = body as FormData;
    } else {
      options.body =
        typeof body === 'string'
          ? body
          : JSON.stringify(body);

      options.headers = {
        'Content-Type': 'application/json',
      };
    }
  }

  return options;
};

const resolveBaseUrl = (): string => {
  const baseUrl =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_STRAPI_URL
      : process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL is not configured');
  }

  return baseUrl;
};

const resolveRequestUrl = (requestUrl: string): string => {
  const baseUrl = resolveBaseUrl();

  if (typeof window === 'undefined') {
    return requestUrl;
  }

  const serverUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (serverUrl && requestUrl.startsWith(serverUrl)) {
    return requestUrl.replace(serverUrl, baseUrl);
  }

  return requestUrl;
};

const createTimeoutController = (
  signal?: AbortSignal
): {
  signal: AbortSignal;
  timeoutId?: ReturnType<typeof setTimeout>;
} => {
  if (signal) {
    return {
      signal,
    };
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_DURATION.TIMEOUT_DURATION);

  return {
    signal: controller.signal,
    timeoutId,
  };
};

const performFetch = async <T>(
  request: IHeaderDto,
  body: RequestBody | undefined,
  onResponse: (response: Response) => Promise<T>
): Promise<T> => {
  const timeoutController = createTimeoutController(request.signal);

  const options = {
    ...createRequestOptions(request, body),
    signal: timeoutController.signal,
  };

  const url = resolveRequestUrl(request.url);

  try {
    const response = await fetch(url, options);

    return await onResponse(response);
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      throw new Error(
        'Request timed out or was cancelled.'
      );
    }

    throw error;
  } finally {
    if (timeoutController.timeoutId) {
      clearTimeout(timeoutController.timeoutId);
    }
  }
};

export const httpService = async <T>(
  request: IHeaderDto,
  body?: RequestBody
): Promise<T> => performFetch(request, body, handleResponse<T>);

// For list endpoints called with page/pageSize params, where the
// caller needs Strapi's pagination meta (page count, total) back
// alongside the items - not just the bare array handleResponse returns.
export const httpServicePaginated = async <T>(
  request: IHeaderDto,
  body?: RequestBody
): Promise<IPaginatedResult<T>> =>
  performFetch(request, body, handlePaginatedResponse<T>);
