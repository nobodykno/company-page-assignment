import ErrorView from '@/components/error-view';
import Dashboard from './dashboard-view';
import services from '@/services';
import { Metadata } from 'next';
/** Steps to render SSG */
export const dynamic = 'force-static';


/** Generate SEO metadata */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const [siteSetting, about] = await Promise.all([
      services.getSiteSetting(),
      services.getAbout(),
    ]);

    return {
      title: siteSetting.companyName,
      description: about.about.slice(0, 160),
      alternates: {
        canonical: '/pages/dashboard',
      },
      openGraph: {
        title: siteSetting.companyName,
        description: about.about.slice(0, 160),
        url: '/pages/dashboard',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: siteSetting.companyName,
        description: about.about.slice(0, 160),
      },
    };
  } catch {
    return {
      title: 'Digital Solutions',
      description: 'Digital Solutions company website',
      alternates: {
        canonical: '/pages/dashboard',
      },
    };
  }
}


/** Function to render dashboard page */
export default async function DashboardPage() {
  let siteData;

  try {
    const [siteSetting, about, servicesName, teams] = await Promise.all([
      services.getSiteSetting(),
      services.getAbout(),
      services.getServices(),
      services.teamService.getTeams(),
    ]);

    siteData = {
      name: siteSetting.companyName,
      footerText: siteSetting.footerText,
      about: about.about,
      services: servicesName,
      companyBanner:siteSetting.companyBanner.url,
      teams,
    };
  } catch (error) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load dashboard section'
        }
      />
    );
  }

  return <Dashboard {...siteData} />;
}