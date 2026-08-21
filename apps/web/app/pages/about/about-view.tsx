import env from '@/config/env';
import { IAboutProps } from '@/props/about-props';


export default function AboutView(aboutData: IAboutProps) {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* Header */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-[var(--font-size-title)] font-bold">
            About Us
          </h1>

          <p className="mt-3 max-w-2xl text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
            {aboutData.about}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h2 className="text-[var(--font-size-xl)] font-semibold">
              Our Mission
            </h2>

            <p className="mt-4 text-[var(--font-size-md)] leading-7 text-[var(--color-text-secondary)]">
              {aboutData.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-[var(--font-size-title)] font-bold">
            Our Team
          </h2>

          <p className="mt-2 text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
            Meet the people behind our work.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.team.map((member) => (
              <article
                key={member.name}
                className="rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-background)] p-6"
              >
                {/* Photo */}
                <div className="mb-5 h-40 overflow-hidden rounded-[var(--border-radius)] bg-[var(--color-border)]">
                  {member.photo ? (
                    <img
                      src={`${env.imageUrl}`+member.photo.url}
                      alt={member.name}
                      className="h-full w-full object-scale-down"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[var(--color-text-secondary)]">
                      No Image
                    </div>
                  )}
                </div>

                <h3 className="text-[var(--font-size-lg)] font-semibold">
                  {member.name}
                </h3>

                <p className="mt-1 text-[var(--font-size-sm)] font-medium text-[var(--color-primary)]">
                  {member.designation}
                </p>

                <p className="mt-3 text-[var(--font-size-sm)] leading-6 text-[var(--color-text-secondary)]">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}