import Card from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

interface BlogSkeletonProps {
  count: number;
}

export default function BlogSkeleton({
  count,
}: BlogSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={`blog-skeleton-${index}`}
          aria-hidden="true"
          className="p-6"
        >
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-3 h-4 w-1/3" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
          <Skeleton className="mt-5 h-4 w-24" />
        </Card>
      ))}
    </>
  );
}