

import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { ISiteSettingResponse } from '@/types/site-setting';



const getSiteSetting = async (): Promise<ISiteSettingResponse> => {

  
  const { url, method } = API.SITE_SETTINGS.GET_SITE;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<ISiteSettingResponse>(request);
  
  return response;
};

export default getSiteSetting;