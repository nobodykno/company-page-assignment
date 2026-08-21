import getSiteSetting from './site-setting-service';
import getAbout from './about-service';
import getServices from './business-service';
import blogService from './blog-service';
import teamService from './team-service';
import getVision from './vision-service';
import postContact from './contact-service';

const services  = {
  getSiteSetting,
  getAbout,
  getServices,
  blogService,
  teamService,
  getVision,
  postContact
};
 
export default services;