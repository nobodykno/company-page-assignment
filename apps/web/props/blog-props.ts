import { IPaginationMeta } from '@/types/pagination';

export interface IBlogProps {
author: string;
content:string; 

publishedAt:Date;
slug:string
title: string;
id: number;
}



export interface IBlogViewProps {
    initialBlogs: IBlogProps[];
    initialPagination: IPaginationMeta;
  }