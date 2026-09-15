import { render, screen } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import BlogPage from './page';
import services from '@/services';
import { IBlogResponse } from '@/types/blog';
import { IPaginatedResult } from '@/types/pagination';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    blogService: {
      getBlogPaginated: jest.fn(),
    },
  },
}));

const getBlogPaginated =
  services.blogService.getBlogPaginated as jest.MockedFunction<
    typeof services.blogService.getBlogPaginated
  >;

const blogs: IBlogResponse[] = [
  {
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
  },
  {
    id: 2,
    title: 'Understanding React Query',
    slug: 'understanding-react-query',
    author: 'Jane Smith',
    content:
      'React Query makes server state management easier and more efficient.',
    publishedAt: new Date('2026-08-12T10:00:00.000Z'),
    image: {
      url: '/uploads/react-query.jpg',
    },
  },
];

const paginatedBlogs: IPaginatedResult<IBlogResponse> = {
  data: blogs,
  pagination: {
    page: 1,
    pageSize: 2,
    pageCount: 1,
    total: 2,
  },
};

const renderPage = async () => {
  const page = await BlogPage();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {page}
    </QueryClientProvider>,
  );
};

describe('BlogPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches blogs and renders them', async () => {
    getBlogPaginated.mockResolvedValue(paginatedBlogs);

    await renderPage();

    expect(
      screen.getByRole('heading', {
        name: 'Getting Started with Next.js',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Understanding React Query',
      }),
    ).toBeInTheDocument();
  });

  it('calls the blog service', async () => {
    getBlogPaginated.mockResolvedValue(paginatedBlogs);

    await renderPage();

    expect(getBlogPaginated).toHaveBeenCalledTimes(1);
  });
});