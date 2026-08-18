import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IService } from '@/types/business';



const getServices = async (): Promise<IService[]> => {

  const { url, method } = API.SITE_SETTINGS.GET_SERVICES;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<IService[]>(request);
  
  return response;
};

export default getServices;