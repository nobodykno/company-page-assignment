import getSiteSetting from './site-setting-service';
import getAbout from './about-service';
import getServices from './business-service';
import getBlog from './blog-service';
import getTeams from './team-service';
import getVision from './vision-service';
import postContact from './contact-service';

const services  = {
  getSiteSetting,
  getAbout,
  getServices,
  getBlog,
  getTeams,
  getVision,
  postContact
};
 
export default services;