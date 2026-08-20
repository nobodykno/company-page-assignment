import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IBlogResponse } from '@/types/blog';



const getBlog = async (): Promise<IBlogResponse[]> => {

  const { url, method } = API.SITE_SETTINGS.GET_BLOG;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache',
    revalidate: 60
  };
  const response =  await httpService<IBlogResponse[]>(request);
  
  return response;
};

export default getBlog;