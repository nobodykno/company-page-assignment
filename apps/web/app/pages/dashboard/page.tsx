
import Dashboard from './dashboard-view';
import services from '@/services';
export const dynamic = 'force-static';

export default async function DashboardPage() {



  const siteSetting = await services.getSiteSetting();
  const about = await services.getAbout();
  const servicesName = await services.getServices();

 

  const siteData = {
    name: siteSetting.companyName,
    footerText: siteSetting.footerText,
    about: about.about,
    services:servicesName
  };


  return <Dashboard  {...siteData} />;
}