import type {
  InputHTMLAttributes,
  ReactElement,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  id,
  label,
  type = 'text',
  error,
  placeholder,
  ...props
}: InputProps): ReactElement {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-medium"
      >
        {label}
      </label>

      <input
        {...props}
        id={id}
        name={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded border p-3 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}