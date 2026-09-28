import { IBlogResponse } from '@/types/blog';
import { IService } from '@/types/business';
import { ITeamsResponse } from '@/types/team';

export interface IBlogJsonLdProps {
    blog: IBlogResponse;
  }

export interface IServicesJsonLdProps {
    services: IService[];
  }

export interface ITeamMemberJsonLdProps {
    teamMember: ITeamsResponse;
  }