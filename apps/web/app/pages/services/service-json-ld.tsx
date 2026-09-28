import { IServicesJsonLdProps } from '@/props/json-ld-props';





export default function ServicesJsonLd({
  services,
}: IServicesJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        image: service.image.map(
          (image) =>
            `${process.env.NEXT_PUBLIC_IMAGE_URL}${image.url}`,
        ),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}