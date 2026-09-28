import { IPaginationMeta } from '@/types/pagination';
import { ITeamsResponse } from '@/types/team';

export interface ITeamMemberDetailProps {
    name: string;
    designation: string;
    bio: string;
    photo?: {
      url: string;
    };
  }

export interface ITeamSectionProps {
    initialTeam: ITeamsResponse[];
    initialPagination: IPaginationMeta;
  }