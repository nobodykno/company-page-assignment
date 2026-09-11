'use client';

import { useContext } from 'react';

import { siteSettingsContext } from '@/app/context/site-settings-context';

export function useSiteSettings() {
  const context = useContext(siteSettingsContext);

  if (!context) {
    throw new Error(
      'useSiteSettings must be used inside SiteSettingsProvider'
    );
  }

  return context;
}