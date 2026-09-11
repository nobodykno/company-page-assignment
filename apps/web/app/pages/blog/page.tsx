import services from '@/services';


import { IBlogProps } from '@/props/blog-props';
import ErrorView from '@/components/error-view';
import BlogView from './blog-view';
import { CACHE_DURATION } from '@/constants/cache';

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