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


jest.mock('./../../components/footer-view', () => {
  return function MockFooter() {
    return <footer>Footer</footer>;
  };
});

describe('BlogDetailView', () => {
  it('renders the blog title', async () => {
    const component = await BlogDetailView(blogDetail);

    render(component);

    expect(
      screen.getByRole('heading', {
        name: blogDetail.title,
      })
    ).toBeInTheDocument();
  });

  it('renders the blog author', async () => {
    const component = await BlogDetailView(blogDetail);

    render(component);

    expect(
      screen.getByText(`By ${blogDetail.author}`)
    ).toBeInTheDocument();
  });

  it('renders the blog content', async () => {
    const component = await BlogDetailView(blogDetail);

    render(component);

    expect(
      screen.getByText(blogDetail.content)
    ).toBeInTheDocument();
  });

  it('renders the published date', async () => {
    const component = await BlogDetailView(blogDetail);

    render(component);

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