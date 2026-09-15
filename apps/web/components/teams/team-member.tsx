
'use client';

import {
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { PAGE_SIZE } from '@/constants/pagination';

import Card from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

import services from '@/services';
import { ITeamsResponse } from '@/types/team';
import { IPaginationMeta } from '@/types/pagination';

interface TeamSectionProps {
  initialTeam: ITeamsResponse[];
  initialPagination: IPaginationMeta;
}

const TeamSection = ({
  initialTeam,
  initialPagination,
}: TeamSectionProps): ReactElement => {
  const [team, setTeam] = useState<ITeamsResponse[]>(
    initialTeam,
  );

  const [pagination, setPagination] =
    useState<IPaginationMeta>(initialPagination);

  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  const [loadMoreError, setLoadMoreError] =
    useState<string | null>(null);

  const isLoadingMoreRef = useRef(false);

  const hasMore =
    pagination.page < pagination.pageCount;

  const loadMore = useCallback(async (): Promise<void> => {
    if (isLoadingMoreRef.current || !hasMore) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const nextPage =
        await services.teamService.getTeamsPaginated(
          pagination.page + 1,
          PAGE_SIZE.TEAM_LIST,
        );

      setTeam((current) => [
        ...current,
        ...nextPage.data,
      ]);

      setPagination(nextPage.pagination);
    } catch (error) {
      setLoadMoreError(
        error instanceof Error
          ? error.message
          : 'Failed to load more team members.',
      );
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [hasMore, pagination.page]);

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Link
            key={member.id}
            href={`${ROUTES.TEAM_MEMBER_DETAIL}/${member.id}`}
            aria-label={`View ${member.name}'s profile`}
            className="block"
          >
            <Card className="p-6 transition-shadow hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="mb-5 h-40 overflow-hidden rounded-[var(--border-radius)] bg-[var(--color-border)]">
                {member.photo ? (
                  <Image
                    src={`/api/uploads/${member.photo.url.replace(
                      '/uploads/',
                      '',
                    )}`}
                    alt={member.name}
                    width={200}
                    height={200}
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
            </Card>
          </Link>
        ))}

        {isLoadingMore &&
          Array.from({
            length: PAGE_SIZE.TEAM_LIST,
          }).map((_, index) => (
            <Card
              key={`team-skeleton-${index}`}
              aria-hidden="true"
              className="p-6"
            >
              <Skeleton className="mb-5 h-40 w-full" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/3" />
              <Skeleton className="mt-3 h-4 w-full" />
            </Card>
          ))}
      </div>

      {team.length > 0 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <p
            aria-live="polite"
            className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]"
          >
            Showing {team.length} of {pagination.total} team members
          </p>

          {loadMoreError && (
            <p
              role="alert"
              className="text-[var(--color-danger)] text-[var(--font-size-sm)]"
            >
              {loadMoreError}
            </p>
          )}

          {hasMore && (
            <button
              type="button"
              onClick={loadMore}
              disabled={isLoadingMore}
              className="rounded-[var(--border-radius)] border border-[var(--color-border-strong)] px-6 py-2 text-[var(--font-size-sm)] font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingMore
                ? 'Loading more…'
                : loadMoreError
                  ? 'Try again'
                  : 'Load more'}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default memo(TeamSection);
