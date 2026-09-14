const getRequiredEnv = (
  value: string | undefined,
  name: string
): string => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value.replace(/\/$/, '');
};

const env = {
  apiUrl: getRequiredEnv(
    process.env.NEXT_PUBLIC_API_URL,
    'NEXT_PUBLIC_API_URL'
  ),

  serverApiUrl: getRequiredEnv(
    process.env.NEXT_PUBLIC_STRAPI_URL,
    'NEXT_PUBLIC_STRAPI_URL'
  ),

  imageUrl: getRequiredEnv(
    process.env.NEXT_PUBLIC_IMAGE_URL,
    'NEXT_PUBLIC_IMAGE_URL'
  ),
};

export default env;