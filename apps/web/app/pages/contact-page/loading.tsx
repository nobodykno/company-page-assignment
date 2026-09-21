import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

/**
 * Mirrors contact-page/page.tsx: title, intro line, then the three
 * label+field blocks and the submit button.
 */
export default function ContactLoading() {
  return (
    <main aria-busy="true" className="min-h-screen">
      <span className="sr-only" role="status">
        Loading contact form…
      </span>

      <section>
        <Container maxWidth="sm" className="py-10 sm:py-16">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="mt-3 h-4 w-64 max-w-full" />

          <div className="mt-8 space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton
                  className={index === 2 ? 'h-32 w-full' : 'h-12 w-full'}
                />
              </div>
            ))}

            <Skeleton className="h-12 w-40" />
          </div>
        </Container>
      </section>
    </main>
  );
}
