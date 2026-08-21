

import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { ITeamsResponse } from '@/types/team';
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

const teamService = {
  getTeams,
  getTeamDetail,
};
export default teamService;