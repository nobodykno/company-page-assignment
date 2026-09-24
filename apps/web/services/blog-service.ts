import { API } from '@/config/api.config';
import { httpService, httpServicePaginated } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IBlogResponse } from '@/types/blog';
import { CACHE_DURATION } from '@/constants/cache';
import { IPaginatedResult } from '@/types/pagination';

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
    tags: ['blogs', `blog-${slug}`]
  };
  const response =  await httpService<IBlogResponse[]>(request);
  
  return response;
};


const getBlogPaginated = async (
  page: number,
  pageSize: number
): Promise<IPaginatedResult<IBlogResponse>> => {

  const { url, method } = API.SITE_SETTINGS.GET_BLOG_PAGINATED(
    page,
    pageSize
  );

  const request: IHeaderDto = {
    url: url,
    method: method,
    isFormData: false,
    cache: 'force-cache',
    revalidate: CACHE_DURATION.REVALIDATE_TIME,
    tags: ['blogs'],
  };

  return httpServicePaginated<IBlogResponse>(request);
};


const blogService = {
  getBlogBySlug,
  getBlogPaginated,
  getBlog
};

export default blogService;