import Link from 'next/link';

export default function Header() {

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-[var(--font-size-xl)] font-bold text-[var(--color-primary)]"
        >
            Digital Solutions
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
          >
              Home
          </Link>

          <Link
            href="/pages/about"
            className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
          >
              About
          </Link>

          <Link
            href="/pages/services"
            className="text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]"
          >
              Services
          </Link>

          <Link
            href="/pages/blog"
            className="font-semibold text-[var(--color-primary)]"
          >
              Blog
          </Link>
        </div>
      </nav>
    </header>
  );
};

