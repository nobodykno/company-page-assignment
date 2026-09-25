import request from 'supertest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';

const CMS_URL = process.env.CMS_TEST_URL ?? 'http://localhost:1337';

describe('About Page API', () => {
  it('should return the about page', async () => {
    const response = await request(CMS_URL)
      .get('/api/about-page');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});