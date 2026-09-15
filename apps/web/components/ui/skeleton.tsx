interface SkeletonProps {
    className?: string;
  }
  

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[var(--border-radius)] bg-[var(--color-border)] ${className}`}
    />
  );
}
  