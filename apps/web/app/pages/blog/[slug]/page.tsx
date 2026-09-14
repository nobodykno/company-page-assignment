import services from '@/services';

import BlogDetailView from './blog-detail-view';
import { IBlogResponse } from '@/types/blog';
import ErrorView from '@/components/error-view';
import { Metadata } from 'next/types';
import NotFoundView from '@/components/not-found-view';
/** Generate blog pages at build time */
export async function generateStaticParams() {
  const blogs = await services.blogService.getBlog();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blogs = await services.blogService.getBlogBySlug(slug);
  const blog = blogs[0];

  if (!blog) {
    return {
      title: 'Blog Not Found',
      alternates: {
        canonical: `/pages/blog/${slug}`,
      },
    };
  }

  const description = blog.content.slice(0, 160);
  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.image.url}`;

  return {
    title: blog.title,
    description,

    alternates: {
      canonical: `/pages/blog/${blog.slug}`,
    },

    openGraph: {
      title: blog.title,
      description,
      url: `/pages/blog/${blog.slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description,
      images: [imageUrl],
    },
  };
}

/** Revalidate generated pages every 60 seconds */
export const revalidate = 60;


/** functions to render the view */
/** functions to render the view */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let blogDetail: IBlogResponse[];

  const { slug } = await params;

  try {
    blogDetail = await services.blogService.getBlogBySlug(slug);
  } catch (error) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load blog'
        }
      />
    );
  }

  if (!blogDetail.length) {
    return  (
      <NotFoundView title='Blog' message='Blog not found' />
    );
  }

  return <BlogDetailView {...blogDetail[0]} />;
}