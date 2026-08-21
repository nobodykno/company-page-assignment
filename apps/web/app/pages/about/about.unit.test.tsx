import { render, screen } from '@testing-library/react';
import AboutView from './about-view';
import { IAboutProps } from '@/props/about-props';

const aboutData: IAboutProps = {
  about:
    'Digital Solutions is a technology company focused on building modern digital experiences.',

  vision:
    'Our vision is to empower businesses through innovative and reliable technology solutions.',

  team: [
    {
      id:1,
      name: 'John Doe',
      designation: 'Frontend Developer',
      bio: 'John specializes in building modern and accessible user interfaces.',
      photo: {
        url: '/uploads/john.jpg',
      },
    },
    {
      id:2,
      name: 'Jane Smith',
      designation: 'Backend Developer',
      bio: 'Jane specializes in scalable backend systems and APIs.',
      photo: {
        url: '/uploads/jane.jpg',
      },
    },
    {
      id:3,
      name: 'Mike Wilson',
      designation: 'UI/UX Designer',
      bio: 'Mike creates simple and user-friendly digital experiences.',
      photo: {
        url: '/uploads/mike.jpg',
      },
    },
  ],
};

describe('AboutView', () => {
  it('renders the About Us heading', () => {
    render(<AboutView {...aboutData} />);

    expect(
      screen.getByRole('heading', {
        name: 'About Us',
      })
    ).toBeInTheDocument();
  });

  it('renders the about description', () => {
    render(<AboutView {...aboutData} />);

    expect(
      screen.getByText(aboutData.about)
    ).toBeInTheDocument();
  });

  it('renders the mission heading', () => {
    render(<AboutView {...aboutData} />);

    expect(
      screen.getByRole('heading', {
        name: 'Our Mission',
      })
    ).toBeInTheDocument();
  });

  it('renders the vision content', () => {
    render(<AboutView {...aboutData} />);

    expect(
      screen.getByText(aboutData.vision)
    ).toBeInTheDocument();
  });


  it('renders all team members', () => {
    render(<AboutView {...aboutData} />);

    aboutData.team.forEach((member) => {
      expect(
        screen.getByRole('heading', {
          name: member.name,
        })
      ).toBeInTheDocument();
    });
  });


});