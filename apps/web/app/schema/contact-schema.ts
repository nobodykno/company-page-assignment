import { z } from 'zod';

export const MAX_MESSAGE_LENGTH = 4000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      'Name can contain only letters and spaces',
    ),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(
      MAX_MESSAGE_LENGTH,
      `Message must not exceed ${MAX_MESSAGE_LENGTH} characters`,
    )
    .regex(
      /^(?![\s\S]*<[^>]*>)(?![\s\S]*(?:javascript|vbscript|data):)(?![\s\S]*[\u0000-\u001F\u007F])[\s\S]*$/i,
      'Message contains invalid or unsafe content',
    )
});

export type ContactForm = z.infer<typeof contactSchema>;

export type FormErrors = Partial<Record<keyof ContactForm, string>>;