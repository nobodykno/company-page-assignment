
import { render, screen } from '@testing-library/react';

import services from '@/services';
import ServicePage from './page';

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    getServices: jest.fn(),
  },
}));

jest.mock('@/config/env', () => ({
  __esModule: true,
  default: {
    imageUrl: 'http://localhost:1337',
  },
}));

const getServicesMock =
  services.getServices as jest.MockedFunction<
    typeof services.getServices
  >;

describe('ServicePage Integration', () => {
  const mockServices = [
    {
      title: 'Web Development',
      description: 'Modern web applications.',
      price: '$500',
      image: [
        {
          url: '/uploads/web.jpg',
        },
      ],
    },
    {
      title: 'Mobile Development',
      description:
        'Mobile applications for iOS and Android.',
      price: '$700',
      image: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ServicePage', () => {
    it('fetches services and renders the service page', async () => {
      getServicesMock.mockResolvedValue(mockServices);

      const page = await ServicePage();

      render(page);

      expect(
        screen.getByRole('heading', {
          name: 'Our Services',
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          name: 'Web Development',
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          name: 'Mobile Development',
        }),
      ).toBeInTheDocument();
    });

    it('calls getServices once', async () => {
      getServicesMock.mockResolvedValue(mockServices);

      const page = await ServicePage();

      render(page);

      expect(getServicesMock).toHaveBeenCalledTimes(1);
    });

    it('renders the fetched service data', async () => {
      getServicesMock.mockResolvedValue(mockServices);

      const page = await ServicePage();

      render(page);

      expect(
        screen.getByText('Modern web applications.'),
      ).toBeInTheDocument();

      expect(
        screen.getByText('$500'),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          'Mobile applications for iOS and Android.',
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText('$700'),
      ).toBeInTheDocument();
    });

    it('renders ErrorView when getServices fails', async () => {
      getServicesMock.mockRejectedValueOnce(
        new Error('Failed to fetch services'),
      );

      const page = await ServicePage();

      render(page);

      expect(
        screen.getByText('Failed to fetch services'),
      ).toBeInTheDocument();
    });
  });
});

