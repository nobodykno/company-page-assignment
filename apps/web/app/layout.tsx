import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers/provider';

import Footer from '@/components/footer-view';
import Header from '@/components/header-view';
import services from '@/services';
import { SiteSettingsProvider } from './context/site-settings-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      'http://localhost:3000'
  ),
  title: {
    default: 'Digital Solutions',
    template: '%s | Digital Solutions',
  },
  description:
    'Digital Solutions provides modern technology and digital services for businesses.',
  openGraph: {
    title: 'Digital Solutions',
    description:
      'Modern technology and digital solutions for businesses.',
    type: 'website',
    siteName: 'Digital Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Solutions',
    description:
      'Modern technology and digital solutions for businesses.',
  },
};
export default async function RootLayout({ children }: LayoutProps<'/'>) {

  const siteSettings = await services.getSiteSetting();
  const about = await services.getAbout();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteSettingsProvider settings={siteSettings} about={about}>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
