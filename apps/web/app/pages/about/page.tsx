import services from '@/services';
import AboutView from './about-view';
import ErrorView from '@/components/error-view';
import { Metadata } from 'next';

/** Conditon to implement SSG */
export const dynamic = 'force-static';


export async function generateMetadata(): Promise<Metadata> {
  const about = await services.getAbout();

  return {
    title: 'About | Digital Solutions',
    description: about.about.slice(0, 160),
  };
}

/** View for about Page */
export default async function AboutPage() {
  let aboutPageData;

  try {

    const [about, vision, teams] = await Promise.all([
      services.getAbout(),
      services.getVision(),
      services.teamService.getTeams(),
    ]);
    
    aboutPageData = {
      about: about.about,
      vision: vision.vision,
      team: teams,
    };
  } catch (error) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load about section'
        }
      />
    );
  }

  return <AboutView {...aboutPageData} />;
}