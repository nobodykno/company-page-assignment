import { ITeamsResponse } from './team';

export interface IAboutResponse {
    about: string;
}


export interface IAboutPageResponse {
    about: string;
    vision: string;
    teams: ITeamsResponse[]
}

