/**
 * Config file for APIs
 */
import env from './env';

const API_BASE_URL =
  typeof window === 'undefined'
    ? env.serverApiUrl
    : env.apiUrl;

if (!API_BASE_URL) {
  throw new Error('API base URL is not configured');
}

export const API = {
  SITE_SETTINGS: {
    GET_SITE: {
      url: `${API_BASE_URL}/site-setting?populate=*`,
      method: 'GET',
    },

    GET_ABOUT: {
      url: `${API_BASE_URL}/about-page`,
      method: 'GET',
    },

    GET_SERVICES: {
      url: `${API_BASE_URL}/services?populate=*`,
      method: 'GET',
    },

    GET_TEAM: {
      url: `${API_BASE_URL}/team-members?populate=*`,
      method: 'GET',
    },

    GET_TEAM_DETAIL: (id: number) => ({
      url: `${API_BASE_URL}/team-members?filters[id][$eq]=${encodeURIComponent(String(id))}&populate=*`,
      method: 'GET',
    }),

    GET_BLOG_PAGINATED: (page: number, pageSize: number) => ({
      url: `${API_BASE_URL}/blog-posts?populate=*&pagination[page]=${encodeURIComponent(String(page))}&pagination[pageSize]=${encodeURIComponent(String(pageSize))}`,
      method: 'GET',
    }),

    GET_TEAM_PAGINATED: (page: number, pageSize: number) => ({
      url: `${API_BASE_URL}/team-members?populate=*&pagination[page]=${encodeURIComponent(String(page))}&pagination[pageSize]=${encodeURIComponent(String(pageSize))}`,
      method: 'GET',
    }),

    GET_VISION: {
      url: `${API_BASE_URL}/vision`,
      method: 'GET',
    },

    GET_BLOG: {
      url: `${API_BASE_URL}/blog-posts?populate=*`,
      method: 'GET',
    },

    GET_BLOG_BY_SLUG: (slug: string) => ({
      url: `${API_BASE_URL}/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      method: 'GET',
    }),

    POST_CONTACT_FORM: {
      url: `${API_BASE_URL}/contacts`,
      method: 'POST',
    },
  },
};