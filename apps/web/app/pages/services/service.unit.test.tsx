import { render, screen } from '@testing-library/react';
import ServicesView from './service-view';

jest.mock('@/config/env', () => ({
  __esModule: true,
  default: {
    imageUrl: 'http://localhost:1337',
  },
}));

describe('ServicesView', () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Modern and scalable web applications.',
      price: '$500',
      image: [
        {
          url: '/uploads/web-development.jpg',
        },
      ],
    },
    {
      title: 'Mobile Development',
      description: 'High-quality mobile applications.',
      price: '$700',
      image: [],
    },
  ];

  it('should render the services page', () => {
    render(<ServicesView services={services} />);

    expect(
      screen.getByRole('heading', {
        name: 'Our Services',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Explore our services and find the right solution for your business.'
      )
    ).toBeInTheDocument();
  });

  it('should render all services', () => {
    render(<ServicesView services={services} />);

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
      screen.getByText('Modern and scalable web applications.')
    ).toBeInTheDocument();

    expect(
      screen.getByText('High-quality mobile applications.')
    ).toBeInTheDocument();
  });

  it('should render service prices', () => {
    render(<ServicesView services={services} />);

    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$700')).toBeInTheDocument();
  });
});