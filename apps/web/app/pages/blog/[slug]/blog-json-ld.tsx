import { IBlogResponse } from '@/types/blog';

interface BlogJsonLdProps {
  blog: IBlogResponse;
}

export default function BlogJsonLd({ blog }: BlogJsonLdProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${blog.image.url}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.content.slice(0, 160),
    image: imageUrl,
    url: `/pages/blog/${blog.slug}`,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    datePublished: new Date(blog.publishedAt).toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}