import { InputHTMLAttributes, ReactNode } from 'react';

export interface ICardProps {
    children: ReactNode;
    className?: string;
  }

export interface IContainerProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  }

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
  }
  