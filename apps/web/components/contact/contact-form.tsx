'use client';

import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';

import services from '@/services';


import {
  ContactForm as ContactFormType,
  FormErrors,
  contactSchema,
} from '@/app/schema/contact-schema';


import { ContactStatus } from './contact-status';
import ContactMessageField from './contact-message-field';
import Input from '@//components/ui/input';


export default function ContactForm(): ReactElement {
  const [form, setForm] = useState<ContactFormType>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const contactMutation = useMutation({
    mutationFn: services.postContact,

    onSuccess: (): void => {
      setForm({
        name: '',
        email: '',
        message: '',
      });

      setErrors({});
    },
  });

  const handleChange = (
    field: keyof ContactFormType,
    value: string,
  ): void => {
    setForm((previous: ContactFormType) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous: FormErrors) => ({
      ...previous,
      [field]: undefined,
    }));

    contactMutation.reset();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });

      return;
    }

    setErrors({});
    contactMutation.mutate(result.data);
  };

  return (
    <>
      <ContactStatus
        isError={contactMutation.isError}
        isSuccess={contactMutation.isSuccess}
        error={contactMutation.error}
      />

      <form
        aria-label="Contact form"
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-6"
      >
        <Input
          id="name"
          label="Name"
          value={form.name}
          error={errors.name}
          placeholder="Your name"
          onChange={(value: string): void =>
            handleChange('name', value)
          }
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          placeholder="you@example.com"
          onChange={(value: string): void =>
            handleChange('email', value)
          }
        />

        <ContactMessageField
          value={form.message}
          error={errors.message}
          onChange={(value: string): void =>
            handleChange('message', value)
          }
        />

        <button
          type="submit"
          disabled={contactMutation.isPending}
          className="rounded bg-[var(--color-primary)] px-6 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {contactMutation.isPending
            ? 'Sending...'
            : 'Send Message'}
        </button>
      </form>
    </>
  );
}