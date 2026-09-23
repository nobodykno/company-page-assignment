
import type { Metadata } from 'next';

import services from '@/services';

import { IBlogProps } from '@/props/blog-props';
import { IPaginatedResult } from '@/types/pagination';

import ErrorView from '@/components/error-view';
import BlogView from './blog-view';

import { PAGE_SIZE } from '@/constants/pagination';


/** SEO metadata */
export const metadata: Metadata = {
  title: 'Blog | Digital Solutions',
  description:
    'Explore the latest insights, trends, and practical tips in technology, digital solutions, and business growth.',
  openGraph: {
    title: 'Blog | Digital Solutions',
    description:
      'Explore the latest insights, trends, and practical tips in technology, digital solutions, and business growth.',
    type: 'website',
  },
};

/** ISR - revalidate page every 60 seconds */
export const revalidate = 60;

export default async function BlogPage() {
  let blogs: IPaginatedResult<IBlogProps>;

  try {
    blogs = await services.blogService.getBlogPaginated(
      1,
      PAGE_SIZE.BLOG_LIST,
    );
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

  return (

  
    <BlogView
      initialBlogs={blogs.data}
      initialPagination={blogs.pagination}
    />

  );
}

