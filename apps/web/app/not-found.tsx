import NotFoundView from '@/components/not-found-view';

export default function RootNotFound() {
  return (
    <NotFoundView
      title="Page not found"
      message="The page you're looking for doesn't exist or may have been moved."
    />
  );
}
  