import { IAboutResponse } from './about';
import { ISiteSettingResponse } from './site-setting';

export interface ISiteContext {
    settings: ISiteSettingResponse;
    about: IAboutResponse;
  }