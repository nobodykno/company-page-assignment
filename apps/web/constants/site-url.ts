
const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL ??
'http://localhost:3000';

export const SITEURLS = {
  HOME: `${baseUrl}/`,
  ABOUT: `${baseUrl}/pages/about`,
  SERVICES: `${baseUrl}/pages/services`,
  BLOG: `${baseUrl}/pages/blog`,
  CONTACT: `${baseUrl}/pages/contact-page`,
  
  BLOG_DETAIL_BASE: `${baseUrl}/pages/blog/`,
  TEAM_MEMBER_DETAIL_BASE: `${baseUrl}/pages/team-member-detail/`,
} as const;