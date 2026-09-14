'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useSiteSettings } from '@/app/hooks/use-site-settings';

export default function Footer() {

  const siteSetting = useSiteSettings();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
          {siteSetting.settings.footerText}
        </p>

        <Link
          href={ROUTES.CONTACT}
          className="text-[var(--font-size-sm)] font-semibold text-[var(--color-primary)] hover:opacity-80"
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
}