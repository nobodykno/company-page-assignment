import type {
  ReactElement,
  TextareaHTMLAttributes,
} from 'react';

import { MAX_MESSAGE_LENGTH } from '@/app/schema/contact-schema';

interface ContactMessageFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export default function ContactMessageField({
  error,
  value = '',
  ...props
}: ContactMessageFieldProps): ReactElement {
  const messageLength = String(value).length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="message"
          className="font-medium"
        >
          Message
        </label>

        <span
          className={`text-sm ${
            messageLength >= MAX_MESSAGE_LENGTH
              ? 'text-red-600'
              : 'text-gray-500'
          }`}
          aria-live="polite"
        >
          {messageLength}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>

      <textarea
        {...props}
        id="message"
        name="message"
        rows={6}
        maxLength={MAX_MESSAGE_LENGTH}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? 'message-error' : undefined
        }
        className={`w-full rounded border p-3 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder="Your message"
      />

      {error && (
        <p
          id="message-error"
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}