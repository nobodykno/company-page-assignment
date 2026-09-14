import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IBlogResponse } from '@/types/blog';
import { CACHE_DURATION } from '@/constants/cache';



const getBlog = async (): Promise<IBlogResponse[]> => {

  const { url, method } = API.SITE_SETTINGS.GET_BLOG;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache',
    revalidate: CACHE_DURATION.REVALIDATE_TIME
  };
  const response =  await httpService<IBlogResponse[]>(request);
  
  return response;
};


const getBlogBySlug = async (slug: string): Promise<IBlogResponse[]> => {

  const { url, method } = API.SITE_SETTINGS.GET_BLOG_BY_SLUG(slug);
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache',
    revalidate: CACHE_DURATION.REVALIDATE_TIME,
  };
  const response =  await httpService<IBlogResponse[]>(request);
  
  return response;
};


const blogService = {
  getBlogBySlug,
  getBlog
};

export default blogService;