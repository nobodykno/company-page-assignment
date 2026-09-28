import { TextareaHTMLAttributes } from 'react';

export interface IContactMessageFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}
