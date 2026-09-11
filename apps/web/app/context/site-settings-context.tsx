import { ISiteSettingResponse } from '@/types/site-setting';
import { createContext } from 'react';

export const siteSettingsContext = createContext<ISiteSettingResponse | null>(
  null
);
  
export function SiteSettingsProvider({
  settings,
  children,
}: {
    settings: ISiteSettingResponse;
    children: React.ReactNode;
  }) {
  return (
    <siteSettingsContext.Provider value={settings}>
      {children}
    </siteSettingsContext.Provider>
  );
}