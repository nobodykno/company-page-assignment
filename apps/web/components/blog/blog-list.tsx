
import { IBlogProps } from '@/props/blog-props';
import BlogCard from './blog-card';
import BlogSkeleton from './blog-skeleton';


interface BlogListProps {
  blogs: IBlogProps[];
  isFetchingNextPage: boolean;
  skeletonCount: number;
}

export default function BlogList({
  blogs,
  isFetchingNextPage,
  skeletonCount,
}: BlogListProps){
  if (blogs.length === 0) {
    return (
      <p
        className="text-[var(--color-text-secondary)]"
        role="status"
      >
        No blogs found.
      </p>
    );
  }

  return (
    <>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}

      {isFetchingNextPage && (
        <BlogSkeleton count={skeletonCount} />
      )}
    </>
  );
}