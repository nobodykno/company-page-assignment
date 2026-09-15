

import { API } from '@/config/api.config';
import { httpService, httpServicePaginated } from './base.service';
import { IHeaderDto } from '@/types/header';
import { ITeamsResponse } from '@/types/team';
import { IPaginatedResult } from '@/types/pagination';
;



const getTeams = async (): Promise<ITeamsResponse[]> => {

  const { url, method } = API.SITE_SETTINGS.GET_TEAM;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<ITeamsResponse[]>(request);
  
  return response;
};

const getTeamDetail = async (id: number): Promise<ITeamsResponse[]> => {

  const { url, method } = API.SITE_SETTINGS.GET_TEAM_DETAIL(id);
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<ITeamsResponse[]>(request);
  
  return response;
};

const getTeamsPaginated = async (
  page: number,
  pageSize: number
): Promise<IPaginatedResult<ITeamsResponse>> => {

  const { url, method } = API.SITE_SETTINGS.GET_TEAM_PAGINATED(
    page,
    pageSize
  );

  const request: IHeaderDto = {
    url: url,
    method: method,
    isFormData: false,
    cache: 'force-cache',
  };

  return httpServicePaginated<ITeamsResponse>(request);
};

const teamService = {
  getTeams,
  getTeamDetail,
  getTeamsPaginated
};
export default teamService;