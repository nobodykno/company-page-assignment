import { ErrorProps } from '@/props/error-props';

/**
 * Global error view
 * @param error 
 * @returns the error view to the page
 */

const ErrorView = (error: ErrorProps) =>{
  return (
    <div className="flex items-center justify-center p-6">
      <p
        className="text-center"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-md)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        {error.error}
      </p>
    </div>
  );
};


export default ErrorView;