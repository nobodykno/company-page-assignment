import { INotFoundViewProps } from '@/props/not-found-props';

  
export default function NotFoundView({
  title = 'Not Found',
  message = 'The requested resource could not be found.',
}: INotFoundViewProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
  
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
}