import { ReactNode, ComponentPropsWithoutRef } from 'react';

export interface IPageTitleProps {
    title: ReactNode;
    description: ReactNode;
    titleProps?: ComponentPropsWithoutRef<'h1'>;
    descriptionProps?: ComponentPropsWithoutRef<'p'>;
  }
  