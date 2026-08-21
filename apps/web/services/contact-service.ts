


import { API } from '@/config/api.config';
import { httpService } from './base.service';
import { IHeaderDto } from '@/types/header';
import { IContact } from '@/types/contact';




const postContact = async (payload:IContact): Promise<IContact> => {

  const { url, method } = API.SITE_SETTINGS.POST_CONTACT_FORM;
  
  const request:IHeaderDto ={
    url:url,
    method:method,
    isFormData:false,
    cache:'force-cache'
  };
  const response =  await httpService<IContact>(request,{ data: payload });
  
  return response;
};

export default postContact;