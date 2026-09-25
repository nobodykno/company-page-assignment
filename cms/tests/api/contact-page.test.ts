import request from 'supertest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';

const CMS_URL = process.env.CMS_TEST_URL ?? 'http://localhost:1337';

describe('Contact API', () => {
  it('should create a contact submission', async () => {
    const payload = {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test contact message.',
      },
    };

    const response = await request(CMS_URL)
      .post('/api/contacts')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
  });
});