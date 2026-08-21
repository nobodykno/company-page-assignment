import { render, screen } from '@testing-library/react';
import services from '@/services';
import TeamMemberDetailPage from './page';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    teamService: {
      getTeamDetail: jest.fn(),
    },
  },
}));

jest.mock('@/config/env', () => ({
  __esModule: true,
  default: {
    imageUrl: 'http://localhost:1337',
  },
}));

jest.mock('../../../component/error-view', () => {
  return function ErrorView({ error }: { error: string }) {
    return <div role="alert">{error}</div>;
  };
});

const mockTeamMember = {
  id: 1,
  name: 'John Doe',
  designation: 'Senior Software Engineer',
  bio: 'John is an experienced software engineer specializing in modern web applications.',
  photo: {
    url: '/uploads/john-doe.jpg',
  },
};

describe('TeamMemberDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders the team member', async () => {
    (
      services.teamService.getTeamDetail as jest.Mock
    ).mockResolvedValue([mockTeamMember]);

    const page = await TeamMemberDetailPage({
      searchParams: Promise.resolve({
        id: '1',
      }),
    });

    render(page);

    expect(
      services.teamService.getTeamDetail
    ).toHaveBeenCalledTimes(1);

    expect(
      services.teamService.getTeamDetail
    ).toHaveBeenCalledWith(1);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'John Doe',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'John is an experienced software engineer specializing in modern web applications.'
      )
    ).toBeInTheDocument();
  });
});