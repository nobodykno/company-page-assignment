import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';


export default function BlogDetailLoading() {
  return (
    <main aria-busy="true" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <span className="sr-only" role="status">
        Loading blog post…
      </span>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container maxWidth="md" className="py-16">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-8 h-4 w-32" />
          <Skeleton className="mt-4 h-10 w-full" />
          <Skeleton className="mt-2 h-10 w-2/3" />
          <Skeleton className="mt-5 h-4 w-40" />
        </Container>
      </section>

      <Container className="py-12">
        <Skeleton className="h-[300px] w-full md:h-[500px]" />
      </Container>

      <Container maxWidth="sm" className="pb-20">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-5/6" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-3/4" />
      </Container>
    </main>
  );
}
