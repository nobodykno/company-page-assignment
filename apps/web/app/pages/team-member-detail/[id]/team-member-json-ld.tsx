import { ITeamMemberJsonLdProps } from '@/props/json-ld-props';




export default function TeamMemberJsonLd({
  teamMember,
}: ITeamMemberJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: teamMember.name,
    jobTitle: teamMember.designation,
    description: teamMember.bio,
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}${teamMember.photo.url}`,
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}