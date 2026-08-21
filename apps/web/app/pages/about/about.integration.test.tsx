import { render, screen } from '@testing-library/react';
import AboutPage from './page';
import services from '@/services';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    getAbout: jest.fn(),
    getVision: jest.fn(),
    teamService: {
      getTeams: jest.fn(),
    },
  },
}));

jest.mock('@/component/error-view', () => ({
  __esModule: true,
  default: ({ error }: { error: string }) => (
    <div role="alert">{error}</div>
  ),
}));

const mockedServices = services as jest.Mocked<typeof services>;

const getTeamsMock =
  mockedServices.teamService.getTeams as jest.Mock;

describe('AboutPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders about page data', async () => {
    mockedServices.getAbout.mockResolvedValue({
      about:
        'Digital Solutions is a technology company focused on building modern digital experiences.',
    });

    mockedServices.getVision.mockResolvedValue({
      vision:
        'Our vision is to empower businesses through innovative and reliable technology solutions.',
    });

    getTeamsMock.mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        designation: 'Frontend Developer',
        bio: 'John specializes in modern frontend development.',
        photo: {
          url: '/uploads/john.jpg',
        },
      },
      {
        id: 2,
        name: 'Jane Smith',
        designation: 'Backend Developer',
        bio: 'Jane specializes in scalable backend systems.',
        photo: {
          url: '/uploads/jane.jpg',
        },
      },
    ]);

    const page = await AboutPage();

    render(page);

    expect(
      screen.getByRole('heading', {
        name: 'About Us',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Digital Solutions is a technology company focused on building modern digital experiences.'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Our Mission',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Our vision is to empower businesses through innovative and reliable technology solutions.'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'John Doe',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Jane Smith',
      })
    ).toBeInTheDocument();
  });

  it('calls all required services', async () => {
    mockedServices.getAbout.mockResolvedValue({
      about: 'About Digital Solutions',
    });

    mockedServices.getVision.mockResolvedValue({
      vision: 'Our vision',
    });

    getTeamsMock.mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        designation: 'Frontend Developer',
        bio: 'Frontend developer.',
        photo: {
          url: '/uploads/john.jpg',
        },
      },
    ]);

    const page = await AboutPage();

    render(page);

    expect(
      mockedServices.getAbout
    ).toHaveBeenCalledTimes(1);

    expect(
      mockedServices.getVision
    ).toHaveBeenCalledTimes(1);

    expect(
      mockedServices.teamService.getTeams
    ).toHaveBeenCalledTimes(1);
  });

  it('renders the correct number of team members', async () => {
    mockedServices.getAbout.mockResolvedValue({
      about: 'About us',
    });

    mockedServices.getVision.mockResolvedValue({
      vision: 'Our vision',
    });

    getTeamsMock.mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        designation: 'Frontend Developer',
        bio: 'Frontend developer.',
        photo: {
          url: '/uploads/john.jpg',
        },
      },
      {
        id: 2,
        name: 'Jane Smith',
        designation: 'Backend Developer',
        bio: 'Backend developer.',
        photo: {
          url: '/uploads/jane.jpg',
        },
      },
      {
        id: 3,
        name: 'Mike Wilson',
        designation: 'UI/UX Designer',
        bio: 'UI/UX designer.',
        photo: {
          url: '/uploads/mike.jpg',
        },
      },
    ]);

    const page = await AboutPage();

    render(page);

    expect(
      screen.getAllByRole('article')
    ).toHaveLength(3);
  });
});