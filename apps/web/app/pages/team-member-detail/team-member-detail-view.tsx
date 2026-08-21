import env from '@/config/env';
import { ITeamMemberDetailProps } from '@/props/team-member-detail.props';


export default function TeamMemberDetailView(
  member: ITeamMemberDetailProps
) {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Header */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-primary)]">
            Our Team
          </p>

          <h1 className="mt-3 text-[var(--font-size-title)] font-bold">
            {member.name}
          </h1>

          <p className="mt-2 text-[var(--font-size-lg)] text-[var(--color-text-secondary)]">
            {member.designation}
          </p>
        </div>
      </section>

      {/* Profile */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          {/* Image */}
          <div>
            <div className="h-80 overflow-hidden rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              {member.photo ? (
                <img
                  src={`${env.imageUrl}${member.photo.url}`}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[var(--color-text-secondary)]">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Information */}
          <div>
            <h2 className="text-[var(--font-size-xl)] font-semibold">
              About {member.name}
            </h2>

            <p className="mt-5 text-[var(--font-size-md)] leading-8 text-[var(--color-text-secondary)]">
              {member.bio}
            </p>

            <div className="mt-8 border-t border-[var(--color-border)] pt-6">
              <h2 className="text-[var(--font-size-lg)] font-semibold">
                Position
              </h2>

              <p className="mt-2 text-[var(--font-size-md)] text-[var(--color-primary)]">
                {member.designation}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}