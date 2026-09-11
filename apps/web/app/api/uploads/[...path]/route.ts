import env from '@/config/env';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const strapiBaseUrl = env.serverApiUrl?.replace('/api', '');

  if (!strapiBaseUrl) {
    return new Response('Strapi URL is not configured', {
      status: 500,
    });
  }

  const imageUrl = `${strapiBaseUrl}/uploads/${path.join('/')}`;

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return new Response('Image not found', {
      status: response.status,
    });
  }

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type':
        response.headers.get('Content-Type') ??
        'application/octet-stream',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}