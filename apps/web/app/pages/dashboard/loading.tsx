import Container from '@/components/ui/container';
import Card from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div aria-busy="true" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <span className="sr-only" role="status">
        Loading…
      </span>

      <main>
        <div className="relative h-[380px] w-full overflow-hidden bg-[var(--color-border)] sm:h-[440px] md:h-[500px]">
          <div className="absolute inset-0">
            <Container className="flex h-full items-center">
              <div className="max-w-3xl">
                <Skeleton className="h-4 w-24 bg-white/30" />
                <Skeleton className="mt-4 h-10 w-72 max-w-full bg-white/30" />
                <Skeleton className="mt-6 h-4 w-full max-w-xl bg-white/30" />
                <Skeleton className="mt-2 h-4 w-2/3 max-w-xl bg-white/30" />
              </div>
            </Container>
          </div>
        </div>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <Container className="py-16">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-6">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                  <Skeleton className="mt-4 h-5 w-16" />
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
