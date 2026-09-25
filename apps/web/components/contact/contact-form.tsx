'use client';

import { memo } from 'react';
import type { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import services from '@/services';

import {
  ContactForm as ContactFormType,
  contactSchema,
} from '@/app/schema/contact-schema';

import { ContactStatus } from './contact-status';
import ContactMessageField from './contact-message-field';
import Input from '@/components/ui/input';

function ContactForm(): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: services.postContact,

    onSuccess: (): void => {
      reset();
    },
  });

  const onSubmit = (data: ContactFormType): void => {
    contactMutation.mutate(data);
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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-6"
      >
        <Input
          id="name"
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <ContactMessageField
          error={errors.message?.message}
          {...register('message')}
        />

        <button
          type="submit"
          disabled={contactMutation.isPending}
          className="w-full rounded bg-[var(--color-primary)] px-6 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {contactMutation.isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}

export default memo(ContactForm);