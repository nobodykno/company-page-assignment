import { render, screen } from '@testing-library/react';

import AboutPage from './page';
import services from '@/services';
import { PAGE_SIZE } from '@/constants/pagination';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    getAbout: jest.fn(),
    getVision: jest.fn(),
    teamService: {
      getTeamsPaginated: jest.fn(),
    },
  },
}));

const getAboutMock = services.getAbout as jest.MockedFunction<
  typeof services.getAbout
>;

const getVisionMock = services.getVision as jest.MockedFunction<
  typeof services.getVision
>;

const getTeamsPaginatedMock =
  services.teamService.getTeamsPaginated as jest.MockedFunction<
    typeof services.teamService.getTeamsPaginated
  >;

const teams = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'CEO',
    bio: 'Company CEO',
    photo: {
      url: '/uploads/john.jpg',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    designation: 'CTO',
    bio: 'Company CTO',
    photo: {
      url: '/uploads/jane.jpg',
    },
  },
  {
    id: 3,
    name: 'Mike Johnson',
    designation: 'Designer',
    bio: 'Lead Designer',
    photo: {
      url: '/uploads/mike.jpg',
    },
  },
];

const teamResponse = {
  data: teams,
  pagination: {
    page: 1,
    pageSize: PAGE_SIZE.TEAM_LIST,
    pageCount: 1,
    total: teams.length,
  },
};

const setupMocks = (): void => {
  getAboutMock.mockResolvedValue({
    about:
      'We are a digital solutions company focused on building modern and scalable software applications.',
  });

  getVisionMock.mockResolvedValue({
    vision:
      'Our vision is to help businesses grow through innovative technology and digital solutions.',
  });

  getTeamsPaginatedMock.mockResolvedValue(teamResponse);
};

describe('AboutPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it('fetches and renders about page data', async () => {
    const page = await AboutPage();

    render(page);

    expect(
      screen.getByRole('heading', {
        name: /about us/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'We are a digital solutions company focused on building modern and scalable software applications.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /our mission/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Our vision is to help businesses grow through innovative technology and digital solutions.',
      ),
    ).toBeInTheDocument();
  });

  it('calls all required services', async () => {
    const page = await AboutPage();

    render(page);

    expect(getAboutMock).toHaveBeenCalledTimes(1);

    expect(getVisionMock).toHaveBeenCalledTimes(1);

    expect(getTeamsPaginatedMock).toHaveBeenCalledTimes(1);

    expect(getTeamsPaginatedMock).toHaveBeenCalledWith(
      1,
      PAGE_SIZE.TEAM_LIST,
    );
  });

  it('renders the correct number of team members', async () => {
    const page = await AboutPage();

    render(page);

    expect(
      screen.getByRole('heading', {
        name: 'John Doe',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Jane Smith',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Mike Johnson',
      }),
    ).toBeInTheDocument();
  });
});