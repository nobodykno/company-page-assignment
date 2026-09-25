import request from 'supertest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';

const CMS_URL = process.env.CMS_TEST_URL ?? 'http://localhost:1337';

describe('Team Member API', () => {
  it('should return team members', async () => {
    const response = await request(CMS_URL)
      .get('/api/team-members?populate=*');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should return paginated team members', async () => {
    const response = await request(CMS_URL)
      .get(
        '/api/team-members?pagination[page]=1&pagination[pageSize]=10',
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
    expect(response.body.meta).toHaveProperty('pagination');
  });

  it('should return a team member by id', async () => {
    const listResponse = await request(CMS_URL)
      .get('/api/team-members?pagination[page]=1&pagination[pageSize]=1');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.length).toBeGreaterThan(0);

    const teamMemberId = listResponse.body.data[0].id;

    const response = await request(CMS_URL)
      .get(
        `/api/team-members?filters[id][$eq]=${encodeURIComponent(String(teamMemberId))}&populate=*`,
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].id).toBe(teamMemberId);
  });
});