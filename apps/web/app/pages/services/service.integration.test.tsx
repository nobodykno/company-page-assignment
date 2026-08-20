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
      description: 'Mobile applications for iOS and Android.',
      price: '$700',
      image: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch services and render them', async () => {
    (
      services.getServices as jest.Mock
    ).mockResolvedValue(mockServices);

    render(await ServicePage());

    expect(services.getServices).toHaveBeenCalledTimes(1);

    expect(
      screen.getByRole('heading', {
        name: 'Our Services',
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
  });

  it('should pass fetched services to ServicesView', async () => {
    (
      services.getServices as jest.Mock
    ).mockResolvedValue(mockServices);

    render(await ServicePage());

    expect(
      screen.getByText('Modern web applications.')
    ).toBeInTheDocument();

    expect(screen.getByText('$500')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Mobile applications for iOS and Android.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('$700')).toBeInTheDocument();
  });

  it('should render ErrorView when getServices fails', async () => {
    (
      services.getServices as jest.Mock
    ).mockRejectedValue(new Error('Failed to fetch services'));

    render(await ServicePage());

    expect(
      screen.getByText('Failed to fetch services')
    ).toBeInTheDocument();
  });

});