
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

describe('TeamMemberDetailPage', () => {
  const teamMember = {
    id: 1,
    name: 'John Doe',
    designation: 'Senior Software Engineer',
    bio: 'John is an experienced software engineer specializing in modern web applications.',
    photo: {
      url: '/uploads/john-doe.jpg',
    },
  };

  it('should fetch and render the team member details', async () => {
    (
      services.teamService.getTeamDetail as jest.Mock
    ).mockResolvedValue([teamMember]);

    const page = await TeamMemberDetailPage({
      params: Promise.resolve({
        id: '1',
      }),
    });

    render(page);

    expect(
      services.teamService.getTeamDetail,
    ).toHaveBeenCalledTimes(1);

    expect(
      services.teamService.getTeamDetail,
    ).toHaveBeenCalledWith(1);

    expect(
      screen.getByRole('heading', {
        name: 'John Doe',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByText('Senior Software Engineer'),
    ).toHaveLength(2);

    expect(
      screen.getByText(
        'John is an experienced software engineer specializing in modern web applications.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'About John Doe',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Position',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: 'John Doe',
      }),
    ).toBeInTheDocument();
  });
});

