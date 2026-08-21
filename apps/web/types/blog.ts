export interface IBlogResponse {
    id: number;
    author: string;
    content:string; 
    publishedAt:Date;
    slug:string
    title: string;
    image:{
        url:string;
    }
}