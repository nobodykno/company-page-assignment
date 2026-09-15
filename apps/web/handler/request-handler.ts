

/**
 * 
 * @param response interceptor code
 * @returns 
 */

import { IApiError } from '@/types/error';
import { IPaginatedResult, IPaginationMeta } from '@/types/pagination';




const getErrorMessage = (
  data: unknown,
  status: number
): string => {
  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  const errorData = data as IApiError;

  return (
    errorData.error?.message ||
    errorData.message ||
    `Request failed with status ${status}`
  );
};





const handleResponse = async <T>(
  response: Response
): Promise<T> => {
  const contentType = response.headers.get('content-type') ?? '';

  const isJson = contentType.includes('application/json');

  const data: unknown = isJson
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, response.status)
    );
  }

  if (typeof data === 'string') {
    return data as T;
  }

  const jsonData = data as { data?: T };

  return (jsonData.data ?? data) as T;
};


export const handlePaginatedResponse = async <T>(
  response: Response
): Promise<IPaginatedResult<T>> => {
  const contentType = response.headers.get('content-type') ?? '';

  const isJson = contentType.includes('application/json');

  const data: unknown = isJson
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, response.status)
    );
  }

  const jsonData = data as {
    data?: T[];
    meta?: {
      pagination?: IPaginationMeta;
    };
  };

  const items = jsonData.data ?? [];

  return {
    data: items,
    pagination:
      jsonData.meta?.pagination ?? {
        page: 1,
        pageSize: items.length,
        pageCount: 1,
        total: items.length,
      },
  };
};



export default handleResponse;

;
    
