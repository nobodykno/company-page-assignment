

import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IAboutResponse } from '@/types/about';



const getAbout = async (): Promise<IAboutResponse> => {

  const { url, method } = API.SITE_SETTINGS.GET_ABOUT;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<IAboutResponse>(request);
  
  return response;
};

export default getAbout;