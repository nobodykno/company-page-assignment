import services from '@/services';
import BlogView from './blog-view';
import ErrorView from '@/component/error-view';
import { IBlogProps } from '@/props/blog-props';

/** Steps to implement ISG */
export const revalidate = 60;

/** Function to render the view */

export default async function BlogPage() {
  let blogs: IBlogProps[];

  try {
    blogs = await services.blogService.getBlog();
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

  return <BlogView blogs={blogs} />;
}