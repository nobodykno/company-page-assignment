import { render, screen } from '@testing-library/react';

import BlogDetailPage from './page';
import services from '@/services';
import { IBlogResponse } from '@/types/blog';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    blogService: {
      getBlogBySlug: jest.fn(),
    },
  },
}));

jest.mock('./../../components/footer-view', () => {
  return function MockFooter() {
    return <footer>Footer</footer>;
  };
});

const getBlogBySlug = services.blogService
  .getBlogBySlug as jest.MockedFunction<
  typeof services.blogService.getBlogBySlug
>;

const blog: IBlogResponse = {
  id: 1,
  title: 'Getting Started with Next.js',
  slug: 'getting-started-with-nextjs',
  author: 'John Doe',
  content:
    'Learn how to build modern web applications using Next.js and React.',
  publishedAt: new Date('2026-08-10T10:00:00.000Z'),
  image: {
    url: '/uploads/nextjs.jpg',
  },
};

describe('BlogDetailPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches the blog by slug and renders the detail page', async () => {
    getBlogBySlug.mockResolvedValue([blog]);

    const page = await BlogDetailPage({
      searchParams: Promise.resolve({
        slug: blog.slug,
      }),
    });

    render(page);

    expect(
      screen.getByRole('heading', {
        name: blog.title,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(`By ${blog.author}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(blog.content)
    ).toBeInTheDocument();
  });

  it('calls getBlogBySlug with the slug', async () => {
    getBlogBySlug.mockResolvedValue([blog]);

    const page = await BlogDetailPage({
      searchParams: Promise.resolve({
        slug: blog.slug,
      }),
    });

    render(page);

    expect(getBlogBySlug).toHaveBeenCalledTimes(1);

    expect(getBlogBySlug).toHaveBeenCalledWith(
      blog.slug
    );
  });

});