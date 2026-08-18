'use client';

import { DashboardProps } from '@/props/dashboard-props';
import Link from 'next/link';



export default function Dashboard(siteData : DashboardProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* Navigation */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          
          <Link
            href="/"
            className="text-[var(--font-size-xl)] font-bold text-[var(--color-primary)]"
          >
            {siteData.name}
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
            >
              Home
            </Link>

            <Link
              href="/siteData.about"
              className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
            >
              About
            </Link>

            <Link
              href="/services"
              className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
            >
              Services
            </Link>

            <Link
              href="/blog"
              className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
            >
              Blog
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-[var(--font-size-sm)] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Welcome
            </p>

            <h1 className="text-[var(--font-size-title)] font-bold leading-tight">
              {siteData.name}
            </h1>

            <p className="mt-6 text-[var(--font-size-lg)] leading-8 text-[var(--color-text-secondary)]">
              {siteData.about}
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/services"
                className="rounded-[var(--border-radius)] bg-[var(--color-primary)] px-6 py-3 text-[var(--font-size-sm)] font-semibold text-white hover:opacity-90"
              >
                Explore Services
              </Link>

              <Link
                href="/siteData.about"
                className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                About Us
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-[var(--font-size-title)] font-bold">
      Our Services
            </h2>

            <p className="mt-2 text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
      Solutions designed to help your business grow.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {siteData.services.slice(0, 3).map((service) => (
                <div
                  key={service.title}
                  className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                >
                  <h3 className="text-[var(--font-size-lg)] font-semibold">
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
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
            {siteData.footerText}
          </p>
        </div>
      </footer>
    </div>
    
  );
}


