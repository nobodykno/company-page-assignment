'use client';

import { JSX, memo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';

const navigationItems = [
  {
    label: 'Home',
    href: ROUTES.HOME,
  },
  {
    label: 'About',
    href: ROUTES.ABOUT,
  },
  {
    label: 'Services',
    href: ROUTES.SERVICES,
  },
  {
    label: 'Blog',
    href: ROUTES.BLOG,
  },
];

function Header(): JSX.Element {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string, currentPath: string | null): boolean => {
    if (currentPath === null) {
      return false;
    }
  
    if (href === ROUTES.HOME) {
      return currentPath === href;
    }
  
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={ROUTES.HOME}
          onClick={closeMenu}
          className="text-lg font-bold text-[var(--color-primary)] sm:text-[var(--font-size-xl)]"
        >
          Digital Solutions
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href, pathname)
                  ? 'font-semibold text-[var(--color-primary)]'
                  : 'text-[var(--font-size-sm)] font-medium hover:text-[var(--color-primary)]'
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(true)}
          className="rounded-md p-2 text-[var(--color-text-primary)] hover:bg-[var(--color-background)] md:hidden"
        >
          <span className="sr-only">Open navigation menu</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] transform bg-[var(--color-surface)] shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <span className="text-lg font-bold text-[var(--color-primary)]">
            Digital Solutions
          </span>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="rounded-md p-2 text-[var(--color-text-primary)] hover:bg-[var(--color-background)]"
          >
            <span className="sr-only">Close navigation menu</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-col px-5 py-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`border-b border-[var(--color-border)] px-2 py-4 text-base ${
                isActive(item.href, pathname)
                  ? 'font-semibold text-[var(--color-primary)]'
                  : 'font-medium hover:text-[var(--color-primary)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </header>
  );
}

export default memo(Header);