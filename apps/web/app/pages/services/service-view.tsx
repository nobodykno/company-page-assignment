import env from '@/config/env';
import { IServiceProps } from '@/props/service-props';
/**
 * 
 * @param service  accept the data from the page to render the view
 * @returns the service page view
 */

export default function ServicesView({
  services,
}: IServiceProps) {
  return (
    <main aria-labelledby="services-title" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* Header */}
      <section aria-labelledby="services-title" className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 id="services-title" className="text-[var(--font-size-title)] font-bold">
            Our Services
          </h1>

          <p aria-label="Services description" className="mt-3 max-w-2xl text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
            Explore our services and find the right solution for your
            business.
          </p>
        </div>
      </section>

      {/* Services */}
      <section aria-label="Available services" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service ) => (
            <article
              key={service.title}
              className="overflow-hidden rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              {/* Image */}
              <div aria-label="Service pricing" className="h-48 bg-[var(--color-border)]">
                {service.image && service.image.length ? (
                  <img
                    src={`${env.imageUrl}`+service.image[0].url}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[var(--color-text-secondary)]">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 aria-label={service.title} className="text-[var(--font-size-xl)] font-semibold">
                  {service.title}
                </h2>

                <p className="mt-3 text-[var(--font-size-sm)] leading-6 text-[var(--color-text-secondary)]">
                  {service.description}
                </p>

                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <span className="text-[var(--font-size-lg)] font-semibold text-[var(--color-primary)]">
                    {service.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}