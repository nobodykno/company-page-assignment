import services from '@/services';

import BlogDetailView from './blog-detail-view';
import { IBlogResponse } from '@/types/blog';
import ErrorView from '@/components/error-view';
/** Generate blog pages at build time */
export async function generateStaticParams() {
  const blogs = await services.blogService.getBlog();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/** Revalidate generated pages every 60 seconds */
export const revalidate = 60;


/** functions to render the view */
export default async function BlogDetailPage({
  searchParams,
}: {
    searchParams: Promise<{ slug?: string }>;
  }) {
    
  let blogDetail: IBlogResponse[];
  const { slug } = await searchParams;

  if (!slug) {
    return <div>Blog not found</div>;
  }


  try {
    blogDetail = await services.blogService.getBlogBySlug(slug);
  } catch (error) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load blogs'
        }
      />
    );
  }

  return <BlogDetailView {...blogDetail[0]} />;
}