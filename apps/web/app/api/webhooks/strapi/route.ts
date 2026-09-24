import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    console.log('Strapi webhook payload:', body);

    const { model, entry } = body;
    const slug = entry?.slug;
    const id = entry?.id;

    switch (model) {
    case 'blog-post':
      revalidateTag('blogs', 'max');
      revalidatePath('/pages/blog');

      if (slug) {
        revalidateTag(`blog-${slug}`, 'max');
        revalidatePath(`/pages/blog/${slug}`);
      }
      break;

    case 'team-member':
      if (id) {
        revalidateTag(`team-member-${id}`, 'max');
        revalidatePath(`/pages/team-member-detail/${id}`);
      }
      break;

    default:
      break;
    }

    return NextResponse.json({
      success: true,
      message: 'ISR revalidation triggered',
    });
  } catch {
    return NextResponse.json(
      { message: 'Invalid webhook payload' },
      { status: 400 },
    );
  }
}