
import { render, screen } from '@testing-library/react';

import BlogDetailPage, {
  generateStaticParams,
  generateMetadata,
  revalidate,
} from './page';

import services from '@/services';
import { IBlogResponse } from '@/types/blog';
import { notFound } from 'next/navigation';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    blogService: {
      getBlog: jest.fn(),
      getBlogBySlug: jest.fn(),
    },
  },
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('@/components/footer-view', () => {
  return function MockFooter() {
    return <footer>Footer</footer>;
  };
});

const getBlogMock =
  services.blogService.getBlog as jest.MockedFunction<
    typeof services.blogService.getBlog
  >;

const getBlogBySlugMock =
  services.blogService.getBlogBySlug as jest.MockedFunction<
    typeof services.blogService.getBlogBySlug
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

const blog = blogs[0];

describe('BlogDetailPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.NEXT_PUBLIC_STRAPI_URL =
      'http://localhost:1337';
  });

  describe('BlogDetailPage', () => {
    it('fetches the blog by slug and renders the detail page', async () => {
      getBlogBySlugMock.mockResolvedValue([blog]);

      const page = await BlogDetailPage({
        params: Promise.resolve({
          slug: blog.slug,
        }),
      });

      render(page);

      expect(
        screen.getByRole('heading', {
          name: blog.title,
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByText(`By ${blog.author}`),
      ).toBeInTheDocument();

      expect(
        screen.getByText(blog.content),
      ).toBeInTheDocument();
    });

    it('calls getBlogBySlug with the correct slug', async () => {
      getBlogBySlugMock.mockResolvedValue([blog]);

      const page = await BlogDetailPage({
        params: Promise.resolve({
          slug: blog.slug,
        }),
      });

      render(page);

      expect(getBlogBySlugMock).toHaveBeenCalledTimes(1);

      expect(getBlogBySlugMock).toHaveBeenCalledWith(
        blog.slug,
      );
    });

    it('calls notFound when the blog does not exist', async () => {
      getBlogBySlugMock.mockResolvedValue([]);

      await BlogDetailPage({
        params: Promise.resolve({
          slug: 'unknown-blog',
        }),
      });

      expect(notFound).toHaveBeenCalledTimes(1);
    });

    it('renders error view when fetching the blog fails', async () => {
      getBlogBySlugMock.mockRejectedValueOnce(
        new Error('Failed to load blog'),
      );

      const page = await BlogDetailPage({
        params: Promise.resolve({
          slug: blog.slug,
        }),
      });

      render(page);

      expect(
        screen.getByText('Failed to load blog'),
      ).toBeInTheDocument();
    });
  });

  describe('generateStaticParams', () => {
    it('generates static params from all blogs', async () => {
      getBlogMock.mockResolvedValue(blogs);

      const result = await generateStaticParams();

      expect(getBlogMock).toHaveBeenCalledTimes(1);

      expect(result).toEqual([
        {
          slug: 'getting-started-with-nextjs',
        },
        {
          slug: 'understanding-react-query',
        },
      ]);
    });

    it('returns an empty array when there are no blogs', async () => {
      getBlogMock.mockResolvedValue([]);

      const result = await generateStaticParams();

      expect(result).toEqual([]);
    });
  });

  describe('generateMetadata', () => {
    it('generates metadata for an existing blog', async () => {
      getBlogBySlugMock.mockResolvedValue([blog]);

      const metadata = await generateMetadata({
        params: Promise.resolve({
          slug: blog.slug,
        }),
      });

      const description = blog.content.slice(0, 160);
      const imageUrl =
        `http://localhost:1337${blog.image.url}`;

      expect(getBlogBySlugMock).toHaveBeenCalledTimes(1);

      expect(getBlogBySlugMock).toHaveBeenCalledWith(
        blog.slug,
      );

      expect(metadata).toEqual({
        title: blog.title,
        description,

        alternates: {
          canonical: `/pages/blog/${blog.slug}`,
        },

        openGraph: {
          title: blog.title,
          description,
          url: `/pages/blog/${blog.slug}`,
          type: 'article',
          images: [
            {
              url: imageUrl,
              alt: blog.title,
            },
          ],
        },

        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description,
          images: [imageUrl],
        },
      });
    });

    it('returns not found metadata when the blog does not exist', async () => {
      getBlogBySlugMock.mockResolvedValue([]);

      const metadata = await generateMetadata({
        params: Promise.resolve({
          slug: 'unknown-blog',
        }),
      });

      expect(metadata).toEqual({
        title: 'Blog Not Found',
        alternates: {
          canonical: '/pages/blog/unknown-blog',
        },
      });
    });

    it('limits the metadata description to 160 characters', async () => {
      const longContent = 'A'.repeat(300);

      getBlogBySlugMock.mockResolvedValue([
        {
          ...blog,
          content: longContent,
        },
      ]);

      const metadata = await generateMetadata({
        params: Promise.resolve({
          slug: blog.slug,
        }),
      });

      expect(metadata.description).toHaveLength(160);
      expect(metadata.description).toBe('A'.repeat(160));
    });

    it('uses the correct image URL in metadata', async () => {
      getBlogBySlugMock.mockResolvedValue([blog]);

      const metadata = await generateMetadata({
        params: Promise.resolve({
          slug: blog.slug,
        }),
      });

      expect(metadata.openGraph).toMatchObject({
        images: [
          {
            url: 'http://localhost:1337/uploads/nextjs.jpg',
            alt: blog.title,
          },
        ],
      });

      expect(metadata.twitter).toMatchObject({
        images: [
          'http://localhost:1337/uploads/nextjs.jpg',
        ],
      });
    });
  });

  describe('ISR configuration', () => {
    it('revalidates the page every 60 seconds', () => {
      expect(revalidate).toBe(60);
    });
  });
});
