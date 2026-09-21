import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
  
  interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    error?: string;
    onChange: (value: string) => void;
  }
  
export default function Input({
  id,
  label,
  type = 'text',
  value,
  error,
  placeholder,
  onChange,
  ...props
}: InputProps): ReactElement {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    onChange(event.target.value);
  };
  
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
        value={value}
        onChange={handleChange}
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