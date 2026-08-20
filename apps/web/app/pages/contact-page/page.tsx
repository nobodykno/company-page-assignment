'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import services from '@/services';
import ErrorView from '@/component/error-view';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const contactMutation = useMutation({
    mutationFn: services.postContact,

    onSuccess: () => {
      setForm({
        name: '',
        email: '',
        message: '',
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    contactMutation.mutate(form);
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">
          Contact Us
        </h1>

        <p className="mt-3 text-[var(--color-text-secondary)]">
          Have a question? Send us a message.
        </p>

        {contactMutation.isError && (
          <div className="mt-6">
            <ErrorView
              error={
                contactMutation.error instanceof Error
                  ? contactMutation.error.message
                  : 'Failed to submit contact form'
              }
            />
          </div>
        )}

        {contactMutation.isSuccess && (
          <div className="mt-6 rounded border border-green-200 bg-green-50 p-4">
            <p className="text-green-600">
              Your message has been sent successfully.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              className="w-full rounded border p-3"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
              className="w-full rounded border p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-medium"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={(event) =>
                setForm({
                  ...form,
                  message: event.target.value,
                })
              }
              className="w-full rounded border p-3"
              placeholder="Your message"
            />
          </div>

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
      </section>
    </main>
  );
}