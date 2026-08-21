import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlogView from './blog-view';
import { IBlogProps } from '@/props/blog-props';

const blogs: IBlogProps[] = [
  {id:1,
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    author: 'John Doe',
    content:
      'Learn how to build modern web applications using Next.js and React.',
    publishedAt: new Date('2026-08-10T10:00:00.000Z'),
  },
  {
    id:2,
    title: 'Understanding React Query',
    slug: 'understanding-react-query',
    author: 'Jane Smith',
    content:
      'React Query makes server state management easier and more efficient.',
    publishedAt: new Date('2026-12-12T10:00:00.000Z'),
  },
];

const renderBlogView = (data: IBlogProps[] = blogs) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BlogView blogs={data} />
    </QueryClientProvider>
  );
};

describe('BlogView', () => {
  it('renders the blog page heading', () => {
    renderBlogView();

    expect(
      screen.getByRole('heading', {
        name: 'Our Blog',
      })
    ).toBeInTheDocument();
  });



  it('renders Read more links', () => {
    renderBlogView();
  
    const links = screen.getAllByRole('link', {
      name: 'Read more →',
    });
  
    expect(links).toHaveLength(blogs.length);
  });

});