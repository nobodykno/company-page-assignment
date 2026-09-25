import request from 'supertest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';

const CMS_URL = process.env.CMS_TEST_URL ?? 'http://localhost:1337';

describe('Site Setting API', () => {
  it('should return site settings', async () => {
    const response = await request(CMS_URL)
      .get('/api/site-setting?populate=*');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});