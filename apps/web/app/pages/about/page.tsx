import services from '@/services';
import AboutView from './about-view';
import ErrorView from '@/component/error-view';

/** Conditon to implement SSG */
export const dynamic = 'force-static';

/** View for about Page */
export default async function AboutPage() {
  let aboutPageData;

  try {
    const about = await services.getAbout();
    const vision = await services.getVision();
    const teams = await services.teamService.getTeams();

  

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