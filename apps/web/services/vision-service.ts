

import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IVisionResponse } from '@/types/vision';



const getVision = async (): Promise<IVisionResponse> => {

  const { url, method } = API.SITE_SETTINGS.GET_VISION;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<IVisionResponse>(request);
  
  return response;
};

export default getVision;