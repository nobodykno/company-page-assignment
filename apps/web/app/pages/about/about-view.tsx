
import { IAboutProps } from '@/props/about-props';
import PageTitle from '@/components/ui/page-title';
import Container from '@/components/ui/container';
import Card from '@/components/ui/card';
import TeamSection from '@/components/teams/team-member';

/**
 * 
 * @param aboutData  accept the data from the page to render the view
 * @returns the about page view
 */

export default function AboutView(aboutData: IAboutProps) {
  return (
    <main  aria-labelledby="about-page-title" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* Header */}
      <section aria-labelledby="about-page-title" className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <PageTitle
          title="About Us"
          titleProps={{ id: 'about-page-title' }}
          description={aboutData.about}
          descriptionProps={{ 'aria-describedby': 'about-page-title' }}
        />
      </section>

      {/* Mission & Vision */}
      <section   aria-labelledby="mission-vision-title" className="mx-auto max-w-6xl px-6 py-16">
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-8">
              <h2 id="mission-vision-title" className="text-[var(--font-size-xl)] font-semibold">
                Our Mission
              </h2>

              <p className="mt-4 text-[var(--font-size-md)] leading-7 text-[var(--color-text-secondary)]">
                {aboutData.vision}
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container className="py-16">
          <h2 id="team-title" className="text-[var(--font-size-title)] font-bold">
            Our Team
          </h2>

          <p id="team-description" className="mt-2 text-[var(--font-size-md)] text-[var(--color-text-secondary)]">
            Meet the people behind our work.
          </p>

          <TeamSection
            initialTeam={aboutData.team}
            initialPagination={aboutData.teamPagination}
          />
        </Container>
      </section>
    </main>
  );
}