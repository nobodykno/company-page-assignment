import Container from '@/components/ui/container';
import Card from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';
import { PAGE_SIZE } from '@/constants/pagination';

export default function AboutLoading() {
  return (
    <main aria-busy="true" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <span className="sr-only" role="status">
        Loading about page…
      </span>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container className="py-16">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="mt-3 h-5 w-96 max-w-full" />
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <Card className="p-8">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
          </Card>
        </Container>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container className="py-16">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-4 w-64" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE.TEAM_LIST }).map((_, index) => (
              <Card key={index} className="p-6">
                <Skeleton className="mb-5 h-40 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="mt-2 h-4 w-1/3" />
                <Skeleton className="mt-3 h-4 w-full" />
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
