import { render, screen } from '@testing-library/react';

import BlogDetailView from './blog-detail-view';
import { IBlogDetailProps } from '@/props/blog-detail-props';

const blogDetail: IBlogDetailProps = {
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

describe('BlogDetailView', () => {
  it('renders the blog title', () => {
    render(<BlogDetailView {...blogDetail} />);

    expect(
      screen.getByRole('heading', {
        name: blogDetail.title,
      })
    ).toBeInTheDocument();
  });

  it('renders the blog author', () => {
    render(<BlogDetailView {...blogDetail} />);

    expect(
      screen.getByText(`By ${blogDetail.author}`)
    ).toBeInTheDocument();
  });

  it('renders the blog content', () => {
    render(<BlogDetailView {...blogDetail} />);

    expect(
      screen.getByText(blogDetail.content)
    ).toBeInTheDocument();
  });

  it('renders the published date', () => {
    render(<BlogDetailView {...blogDetail} />);

    const formattedDate =
      blogDetail.publishedAt.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

    expect(
      screen.getByText(formattedDate)
    ).toBeInTheDocument();
  });
});