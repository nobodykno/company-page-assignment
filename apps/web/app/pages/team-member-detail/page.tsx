import services from '@/services';

import { ITeamsResponse } from '@/types/team';
import TeamMemberDetailView from './team-member-detail-view';
import { CACHE_DURATION } from '@/constants/cache';
import ErrorView from '@/components/error-view';

export async function generateStaticParams() {
  const teamMembers = await services.teamService.getTeams();

  return teamMembers.map((member) => ({
    id: String(member.id),
  }));
}

/** Steps to implement ISG */
export const revalidate = 60;
/** Steps to implement Team member Detail Page */
export default async function TeamMemberDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return <div>Team member not found</div>;
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
    return <div>Team member not found</div>;
  }

  return <TeamMemberDetailView {...teamMemberDetail[0]} />;
}