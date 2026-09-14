import type { MetadataRoute } from 'next';

import services from '@/services';
import { SITEURLS } from '@/constants/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await services.blogService.getBlog();
  const teamMembers = await services.teamService.getTeams();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITEURLS.HOME,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: SITEURLS.ABOUT,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: SITEURLS.SERVICES,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: SITEURLS.BLOG,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: SITEURLS.CONTACT,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const blogRoutes = blogs.map((blog) => ({
    url: `${SITEURLS.BLOG_DETAIL_BASE}${blog.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const teamRoutes = teamMembers.map((member) => ({
    url: `${SITEURLS.TEAM_MEMBER_DETAIL_BASE}${member.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...teamRoutes,
  ];
}