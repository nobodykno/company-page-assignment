import type { Metadata } from 'next';
import services from '@/services';

import { ITeamsResponse } from '@/types/team';
import TeamMemberDetailView from './team-member-detail-view';
import ErrorView from '@/components/error-view';
import NotFoundView from '@/components/not-found-view';

export async function generateStaticParams() {
  const teamMembers = await services.teamService.getTeams();

  return teamMembers.map((member) => ({
    id: String(member.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (!id) {
    return {
      title: 'Team Member Not Found',
    };
  }

  try {
    const teamMemberDetail =
      await services.teamService.getTeamDetail(Number(id));

    const teamMember = teamMemberDetail[0];

    if (!teamMember) {
      return {
        title: 'Team Member Not Found',
      };
    }

    const description = teamMember.bio?.slice(0, 160) ?? '';

    return {
      title: `${teamMember.name} | Digital Solutions`,
      description,

      alternates: {
        canonical: `/pages/team-member-detail/${teamMember.id}`,
      },

      openGraph: {
        title: `${teamMember.name} | Digital Solutions`,
        description,
        url: `/pages/team-member-detail/${teamMember.id}`,
        type: 'profile',
      },

      twitter: {
        card: 'summary_large_image',
        title: `${teamMember.name} | Digital Solutions`,
        description,
      },
    };
  } catch {
    return {
      title: 'Team Member | Digital Solutions',
    };
  }
}

/** Steps to implement ISG */
export const revalidate = 60;

/** Steps to implement Team member Detail Page */
export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return (
      <NotFoundView message='Team member not found' title='Team member' />
    );
  }

  let teamMemberDetail: ITeamsResponse[];

  try {
    teamMemberDetail = await services.teamService.getTeamDetail(
      Number(id)
    );
  } catch (error) {
    return (
      <ErrorView
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load team member'
        }
      />
    );
  }

  if (!teamMemberDetail || teamMemberDetail.length === 0) {
    return (
      <NotFoundView title='Team member' message='Team member not found' />
    );
  }

  return <TeamMemberDetailView {...teamMemberDetail[0]} />;
}