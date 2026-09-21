'use client';

import { IAboutResponse } from '@/types/about';
import { ISiteContext } from '@/types/site-context';
import { ISiteSettingResponse } from '@/types/site-setting';
import { createContext } from 'react';

export const siteSettingsContext = createContext<ISiteContext | null>(
  null
);
  
export function SiteSettingsProvider({
  settings,
  about,
  children,
}: {
  settings: ISiteSettingResponse;
  about: IAboutResponse;
    children: React.ReactNode;
  }) {
  return (
    <siteSettingsContext.Provider value={{
      settings,
      about,
    }}>
      {children}
    </siteSettingsContext.Provider>
  );
}