export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Header Skeleton */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="h-4 w-20 animate-pulse rounded bg-[var(--color-border)]" />
  
          <div className="mt-4 h-10 w-72 animate-pulse rounded bg-[var(--color-border)]" />
  
          <div className="mt-3 h-6 w-48 animate-pulse rounded bg-[var(--color-border)]" />
        </div>
      </section>
  
      {/* Profile Skeleton */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          {/* Image Skeleton */}
          <div className="h-80 animate-pulse rounded-[var(--border-radius)] bg-[var(--color-border)]" />
  
          {/* Information Skeleton */}
          <div>
            <div className="h-7 w-56 animate-pulse rounded bg-[var(--color-border)]" />
  
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-[var(--color-border)]" />
              <div className="h-4 w-full animate-pulse rounded bg-[var(--color-border)]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--color-border)]" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-[var(--color-border)]" />
            </div>
  
            <div className="mt-8 border-t border-[var(--color-border)] pt-6">
              <div className="h-6 w-28 animate-pulse rounded bg-[var(--color-border)]" />
  
              <div className="mt-3 h-5 w-48 animate-pulse rounded bg-[var(--color-border)]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}