import ErrorView from '@//components/error-view';



export function ContactStatus({
  isError,
  isSuccess,
  error,
}: {
    isError: boolean;
    isSuccess: boolean;
    error: unknown;
  }) {
  if (isError) {
    return (
      <div className="mt-6">
        <ErrorView
          error={
            error instanceof Error
              ? error.message
              : 'Failed to submit contact form'
          }
        />
      </div>
    );
  }
  
  if (isSuccess) {
    return (
      <div
        className="mt-6 rounded border border-green-200 bg-green-50 p-4"
        role="alert"
      >
        <p className="text-green-600">
            Your message has been sent successfully.
        </p>
      </div>
    );
  }
  
  return <></>;
}