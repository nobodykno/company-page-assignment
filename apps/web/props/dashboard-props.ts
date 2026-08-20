import { IService } from '@/types/business';

export interface DashboardProps {
  name: string;
  footerText: string;
  about: string;
  companyBanner:string;
  services: IService[];
  }