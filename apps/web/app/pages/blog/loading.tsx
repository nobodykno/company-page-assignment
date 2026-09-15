import Container from '@/components/ui/container';
import Card from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';
import { PAGE_SIZE } from '@/constants/pagination';

export default function BlogLoading() {
  return (
    <main aria-busy="true" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <span className="sr-only" role="status">
        Loading blog posts…
      </span>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container className="py-16">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-3 h-5 w-80 max-w-full" />
        </Container>

        <Container className="pb-10">
          <Skeleton className="h-12 w-full max-w-md" />
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE.BLOG_LIST }).map((_, index) => (
              <Card key={index} className="p-6">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-4 h-5 w-4/5" />
                <Skeleton className="mt-3 h-4 w-1/3" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />
                <Skeleton className="mt-5 h-4 w-24" />
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
