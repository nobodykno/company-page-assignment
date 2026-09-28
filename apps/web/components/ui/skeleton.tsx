import { ISkeletonProps } from '@/props/skeleton-props';

  

export default function Skeleton({ className = '' }: ISkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[var(--border-radius)] bg-[var(--color-border)] ${className}`}
    />
  );
}
  