

/**
 * 
 * @param response interceptor code
 * @returns 
 */
const handleResponse = async <T>(
  response: Response,
): Promise<T> => {
    
  const data= await response.json();
    
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
    
  return (data.data ?? data) as T;
};
    
export default handleResponse;