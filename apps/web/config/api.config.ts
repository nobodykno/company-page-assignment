
import env from './env'; 

console.log('Env',env);
export const API = {

  SITE_SETTINGS:{

    GET_SITE: {
      url: `${env.apiUrl}/site-setting`,
      method: 'GET',
    },

    
    GET_ABOUT: {
      url: `${env.apiUrl}/about`,
      method: 'GET',
    },

    GET_SERVICES: {
      url: `${env.apiUrl}/services`,
      method: 'GET',
    },
  }
};