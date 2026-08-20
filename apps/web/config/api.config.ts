
import env from './env'; 

export const API = {

  SITE_SETTINGS:{

    GET_SITE: {
      url: `${env.apiUrl}/site-settings?populate=*`,
      method: 'GET',
    },

    
    GET_ABOUT: {
      url: `${env.apiUrl}/about-pages`,
      method: 'GET',
    },
    

    GET_SERVICES: {
      url: `${env.apiUrl}/services?populate=*`,
      method: 'GET',
    },

    GET_TEAM : {
      url: `${env.apiUrl}/team-members?populate=*`,
      method: 'GET',
    },

    GET_VISION: {
      url: `${env.apiUrl}/vision`,
      method: 'GET',
    },

    GET_BLOG: {
      url: `${env.apiUrl}/blog-posts?populate=*`,
      method: 'GET',
    },

    POST_CONTACT_FORM: {
      url: `${env.apiUrl}/contacts`,
      method: 'POST',
    }

  }
};