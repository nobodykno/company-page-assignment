import { render, screen } from '@testing-library/react';

import Dashboard from './dashboard-view';
import { DashboardProps } from '@/props/dashboard-props';

// Mock async child components
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

const siteData: DashboardProps = {
  name: 'Digital Solutions',

  about:
    'We provide modern and reliable technology solutions for businesses.',

  companyBanner: '/uploads/company-banner.jpg',

  footerText:
    'Digital Solutions — Building better digital experiences.',

  services: [
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

    {
      title: 'Cloud Solutions',
      description:
        'Scalable cloud infrastructure and solutions.',
      price: '$1200',
      image: [
        {
          url: '/uploads/cloud-solutions.jpg',
        },
      ],
    },
  ],
};

describe('Dashboard', () => {
  it('renders the company name', () => {
    render(<Dashboard {...siteData} />);

    expect(
      screen.getByRole('heading', {
        name: 'Digital Solutions',
      })
    ).toBeInTheDocument();
  });

  it('renders the company description', () => {
    render(<Dashboard {...siteData} />);

    expect(
      screen.getByText(siteData.about)
    ).toBeInTheDocument();
  });

  it('renders the first three services', () => {
    render(<Dashboard {...siteData} />);

    const visibleServices =
      siteData.services.slice(0, 3);

    visibleServices.forEach((service) => {
      expect(
        screen.getByRole('heading', {
          name: service.title,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText(service.description)
      ).toBeInTheDocument();

      expect(
        screen.getByText(service.price)
      ).toBeInTheDocument();
    });
  });

  it('renders the header', () => {
    render(<Dashboard {...siteData} />);

    expect(
      screen.getByRole('banner')
    ).toHaveTextContent('Header');
  });

  it('renders the footer', () => {
    render(<Dashboard {...siteData} />);

    expect(
      screen.getByRole('contentinfo')
    ).toHaveTextContent(
      'Digital Solutions — Building better digital experiences.'
    );
  });


});