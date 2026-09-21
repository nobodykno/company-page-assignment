
import { render, screen } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import BlogPage, { metadata, revalidate } from './page';
import services from '@/services';

import { IBlogResponse } from '@/types/blog';
import { IPaginatedResult } from '@/types/pagination';
import { PAGE_SIZE } from '@/constants/pagination';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    blogService: {
      getBlogPaginated: jest.fn(),
    },
  },
}));

const getBlogPaginatedMock =
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
    pageSize: PAGE_SIZE.BLOG_LIST,
    pageCount: 1,
    total: blogs.length,
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

  describe('BlogPage', () => {
    it('fetches blogs and renders them', async () => {
      getBlogPaginatedMock.mockResolvedValue(
        paginatedBlogs,
      );

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

    it('calls the blog service with the correct pagination parameters', async () => {
      getBlogPaginatedMock.mockResolvedValue(
        paginatedBlogs,
      );

      await renderPage();

      expect(getBlogPaginatedMock).toHaveBeenCalledTimes(1);

      expect(getBlogPaginatedMock).toHaveBeenCalledWith(
        1,
        PAGE_SIZE.BLOG_LIST,
      );
    });

    it('passes the fetched blog data to the page', async () => {
      getBlogPaginatedMock.mockResolvedValue(
        paginatedBlogs,
      );

      await renderPage();

      expect(
        screen.getByRole('heading', {
          name: 'Getting Started with Next.js',
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText('Author: John Doe'),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          name: 'Understanding React Query',
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText('Author: Jane Smith'),
      ).toBeInTheDocument();
    });

    it('renders the error view when fetching blogs fails', async () => {
      getBlogPaginatedMock.mockRejectedValueOnce(
        new Error('Failed to load blogs'),
      );

      await renderPage();

      expect(
        screen.getByText('Failed to load blogs'),
      ).toBeInTheDocument();
    });
  });

  describe('BlogPage Metadata', () => {
    it('contains the correct SEO metadata', () => {
      expect(metadata).toEqual({
        title: 'Blog | Digital Solutions',
        description:
          'Explore the latest insights, trends, and practical tips in technology, digital solutions, and business growth.',
        openGraph: {
          title: 'Blog | Digital Solutions',
          description:
            'Explore the latest insights, trends, and practical tips in technology, digital solutions, and business growth.',
          type: 'website',
        },
      });
    });

    it('contains the correct page title', () => {
      expect(metadata.title).toBe(
        'Blog | Digital Solutions',
      );
    });

    it('contains the correct description', () => {
      expect(metadata.description).toBe(
        'Explore the latest insights, trends, and practical tips in technology, digital solutions, and business growth.',
      );
    });

    it('contains the correct Open Graph metadata', () => {
      expect(metadata.openGraph).toEqual({
        title: 'Blog | Digital Solutions',
        description:
          'Explore the latest insights, trends, and practical tips in technology, digital solutions, and business growth.',
        type: 'website',
      });
    });
  });

  describe('ISR configuration', () => {
    it('revalidates the page every 60 seconds', () => {
      expect(revalidate).toBe(60);
    });
  });
});

