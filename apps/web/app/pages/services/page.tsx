import services from '@/services';
import ServicesView from './service-view';
import ErrorView from '@/component/error-view';

export const dynamic = 'force-static';

export default async function ServicePage() {
  let servicePageData;

  try {
    const serviceData = await services.getServices();

    servicePageData = {
      services: serviceData,
    };
  } catch (error) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load services'
        }
      />
    );
  }

  return <ServicesView {...servicePageData} />;
}