import { render, screen } from '@testing-library/react';

import DashboardPage from './page';
import services from '@/services';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    getSiteSetting: jest.fn(),
    getAbout: jest.fn(),
    getServices: jest.fn(),
    getTeams: jest.fn(),
  },
}));

jest.mock('@/app/components/header-view', () => {
  return function MockHeader() {
    return <header>Header</header>;
  };
});

jest.mock('@/app/components/footer-view', () => {
  return function MockFooter() {
    return (
      <footer>
        Digital Solutions — Building better digital experiences.
      </footer>
    );
  };
});

const mockGetSiteSetting =
  services.getSiteSetting as jest.MockedFunction<
    typeof services.getSiteSetting
  >;

const mockGetAbout =
  services.getAbout as jest.MockedFunction<
    typeof services.getAbout
  >;

const mockGetServices =
  services.getServices as jest.MockedFunction<
    typeof services.getServices
  >;

const mockGetTeams =
  services.getTeams as jest.MockedFunction<
    typeof services.getTeams
  >;

describe('DashboardPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockGetSiteSetting.mockResolvedValue({
      companyName: 'Digital Solutions',
      footerText:
        'Digital Solutions — Building better digital experiences.',
      companyBanner: {
        url: '/uploads/company-banner.jpg',
      },
    });

    mockGetAbout.mockResolvedValue({
      about:
        'We provide modern and reliable technology solutions for businesses.',
    });

    mockGetServices.mockResolvedValue([
      {
        title: 'Web Development',
        description:
          'Modern and responsive websites for your business.',
        price: '$1000',
        image: [
          {
            url: '/uploads/web-development.jpg',
          },
        ],
      },
      {
        title: 'Mobile Development',
        description:
          'High-quality mobile applications for iOS and Android.',
        price: '$1500',
        image: [
          {
            url: '/uploads/mobile-development.jpg',
          },
        ],
      },
      {
        title: 'UI/UX Design',
        description:
          'Simple and user-friendly digital experiences.',
        price: '$800',
        image: [
          {
            url: '/uploads/ui-ux-design.jpg',
          },
        ],
      },
    ]);

    mockGetTeams.mockResolvedValue([]);
  });

  it('fetches dashboard data and renders the page', async () => {
    const page = await DashboardPage();

    render(page);

    expect(
      screen.getByRole('heading', {
        name: 'Digital Solutions',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'We provide modern and reliable technology solutions for businesses.'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: 'Digital Solutions banner',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Web Development',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Mobile Development',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'UI/UX Design',
      })
    ).toBeInTheDocument();
  });

  it('calls all required services', async () => {
    const page = await DashboardPage();

    render(page);

    expect(mockGetSiteSetting).toHaveBeenCalledTimes(1);
    expect(mockGetAbout).toHaveBeenCalledTimes(1);
    expect(mockGetServices).toHaveBeenCalledTimes(1);
    expect(mockGetTeams).toHaveBeenCalledTimes(1);
  });
});