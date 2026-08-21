import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from './page';

const mockMutate = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(() => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    isSuccess: false,
    error: null,
  })),
}));

describe('ContactPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the contact page', () => {
    render(<ContactPage />);

    expect(
      screen.getByRole('heading', {
        name: 'Contact Us',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Have a question? Send us a message.'
      )
    ).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<ContactPage />);

    expect(
      screen.getByRole('textbox', {
        name: 'Name',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: 'Email',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: 'Message',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Send Message',
      })
    ).toBeInTheDocument();
  });


  it('renders the error message', () => {
    const useMutation = require('@tanstack/react-query')
      .useMutation;

    useMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: true,
      isSuccess: false,
      error: new Error('Failed to submit contact form'),
    });

    render(<ContactPage />);

    expect(
      screen.getByText('Failed to submit contact form')
    ).toBeInTheDocument();
  });

  it('renders the success message', () => {
    const useMutation = require('@tanstack/react-query')
      .useMutation;

    useMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      isSuccess: true,
      error: null,
    });

    render(<ContactPage />);

    expect(
      screen.getByText(
        'Your message has been sent successfully.'
      )
    ).toBeInTheDocument();
  });
});