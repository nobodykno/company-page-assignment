import services from '@/services';
import ErrorView from '@/component/error-view';
import BlogDetailView from './blog-detail-view';
import { IBlogResponse } from '@/types/blog';

export const revalidate = 60;

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