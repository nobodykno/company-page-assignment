import request from 'supertest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';

const CMS_URL = process.env.CMS_TEST_URL ?? 'http://localhost:1337';

describe('Blog Post API', () => {
  it('should return blog posts', async () => {
    const response = await request(CMS_URL)
      .get('/api/blog-posts?populate=*');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should return paginated blog posts', async () => {
    const response = await request(CMS_URL)
      .get(
        '/api/blog-posts?populate=*&pagination[page]=1&pagination[pageSize]=10',
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
    expect(response.body.meta).toHaveProperty('pagination');
  });

  it('should return a blog post by slug', async () => {
    const listResponse = await request(CMS_URL)
      .get(
        '/api/blog-posts?pagination[page]=1&pagination[pageSize]=1',
      );

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.length).toBeGreaterThan(0);

    const slug = listResponse.body.data[0].slug;

    const response = await request(CMS_URL)
      .get(
        `/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].slug).toBe(slug);
  });
});