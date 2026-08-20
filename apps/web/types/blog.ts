export interface IBlogResponse {
    author: string;
    content:string; 
    publishedAt:Date;
    slug:string
    title: string;
    image:{
        url:string;
    }
}