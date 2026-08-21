import ErrorView from '@/component/error-view';
import Dashboard from './dashboard-view';
import services from '@/services';

export const dynamic = 'force-static';

export default async function DashboardPage() {
  let siteData;

  try {
    const siteSetting = await services.getSiteSetting();
    const about = await services.getAbout();
    const servicesName = await services.getServices();
    const teams = await services.getTeams();

    console.log('about',siteSetting);

    siteData = {
      name: siteSetting.companyName,
      footerText: siteSetting.footerText,
      about: about.about,
      services: servicesName,
      companyBanner:siteSetting.companyBanner.url,
      teams,
    };
  } catch (error) {
    console.log(error);
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