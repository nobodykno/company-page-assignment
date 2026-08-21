

import Footer from '@/app/components/footer-view';
import Header from '@/app/components/header-view';
import env from '@/config/env';
import { DashboardProps } from '@/props/dashboard-props';
import Link from 'next/link';

/**
 * 
 * @param siteData  accept the data from the page to render the view
 * @returns the Dashboard page view
 */

export default function Dashboard(siteData: DashboardProps) {
  return (
    <div  aria-label="Dashboard" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Header />

      <main aria-labelledby="dashboard-title" >
        {/*  / Banner */}
        <section  aria-labelledby="dashboard-title" className="relative">
          <div className="relative h-[500px] w-full">
            <img
              src={`${env.imageUrl}${siteData.companyBanner}`}
              alt={`${siteData.name} banner`}
              className="h-full w-full object-cover"
            />

            {/* Dark overlay */}
            <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

            {/*  content */}
            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-6xl items-center px-6">
                <div className="max-w-3xl text-white">
                  <p aria-label="Company welcome" className="mb-4 text-[var(--font-size-sm)] font-semibold uppercase tracking-wider text-white/80">
                    Welcome
                  </p>

                  <h1 id="dashboard-title" className="text-[var(--font-size-title)] font-bold leading-tight">
                    {siteData.name}
                  </h1>

                  <p aria-label="About the company" className="mt-6 text-[var(--font-size-lg)] leading-8 text-white/90">
                    {siteData.about}
                  </p>

                  <div className="mt-8 flex gap-4">
                    <Link
                      href="/pages/services"
                      className="rounded-[var(--border-radius)] bg-[var(--color-primary)] px-6 py-3 text-[var(--font-size-sm)] font-semibold text-white hover:opacity-90"
                    >
                      Explore Services
                    </Link>

                    <Link
                      href="/pages/about"
                      className="rounded-[var(--border-radius)] border border-white/50 bg-white/10 px-6 py-3 text-[var(--font-size-sm)] font-semibold text-white hover:bg-white/20"
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section aria-labelledby="services-title" className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 id="services-title" className="text-[var(--font-size-title)] font-bold">
              Our Services
            </h2>

            <p aria-label="Services description" className="mt-2 text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
              Solutions designed to help your business grow.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {siteData.services.slice(0, 3).map((service) => (
                <div
                  aria-label={`Service: ${service.title}`}
                  key={service.title}
                  className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                >
                  <h3 aria-label={service.title} className="text-[var(--font-size-lg)] font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                    {service.description}
                  </p>

                  <p className="mt-4 text-[var(--font-size-md)] font-semibold text-[var(--color-primary)]">
                    {service.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}