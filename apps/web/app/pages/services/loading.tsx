import Container from '@/components/ui/container';
import Card from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

export default function ServicesLoading() {
  return (
    <main aria-busy="true" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <span className="sr-only" role="status">
        Loading services…
      </span>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container className="py-16">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="mt-3 h-5 w-96 max-w-full" />
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                  <Skeleton className="mt-5 h-6 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
