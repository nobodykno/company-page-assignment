export interface IBlogDetailProps {
    id: number;
    author: string;
    content:string; 
    publishedAt:Date;
    slug:string
    title: string;
    image: {
        url: string;
    };
}