import { IPaginationMeta } from '@/types/pagination';
import { ITeamsResponse } from '@/types/team';


export interface IAboutProps {
  
  about: string;
  vision: string;
  team: ITeamsResponse[];
  teamPagination: IPaginationMeta;

  }


  