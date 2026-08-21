import Link from 'next/link';
import services from '@/services';

export default async function Footer() {

  const siteSetting = await services.getSiteSetting();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
          {siteSetting.footerText}
        </p>

        <Link
          href="/pages/contact-page"
          className="text-[var(--font-size-sm)] font-semibold text-[var(--color-primary)] hover:opacity-80"
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
}