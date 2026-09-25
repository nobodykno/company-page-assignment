
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from '@/components/contact/contact-form';

const mockMutate = jest.fn();

const mockUseMutation = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useMutation: () => mockUseMutation(),
}));

jest.mock('@/services', () => ({
  __esModule: true,
  default: {
    postContact: jest.fn(),
  },
}));

jest.mock('@/components/contact/contact-message-field', () => {
  return function MockContactMessageField({
    error,
    ...props
  }: {
    error?: string;
    [key: string]: unknown;
  }) {
    return (
      <div>
        <label htmlFor="message">Message</label>

        <textarea
          id="message"
          {...props}
        />

        {error && (
          <p>{error}</p>
        )}
      </div>
    );
  };
});

jest.mock('@/components/error-view', () => {
  return function MockErrorView({
    error,
  }: {
    error: string;
  }) {
    return <div>{error}</div>;
  };
});

describe('ContactForm Unit', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      isSuccess: false,
      error: null,
    });
  });

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(
      screen.getByRole('textbox', {
        name: 'Name',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: 'Email',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: 'Message',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Send Message',
      }),
    ).toBeInTheDocument();
  });

  it('updates form fields when user types', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    const nameInput = screen.getByRole('textbox', {
      name: 'Name',
    });

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });

    const messageInput = screen.getByRole('textbox', {
      name: 'Message',
    });

    await user.type(nameInput, 'John Doe');

    await user.type(
      emailInput,
      'john@example.com',
    );

    await user.type(
      messageInput,
      'Hello, I would like to know more.',
    );

    expect(nameInput).toHaveValue('John Doe');

    expect(emailInput).toHaveValue(
      'john@example.com',
    );

    expect(messageInput).toHaveValue(
      'Hello, I would like to know more.',
    );
  });

  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.click(
      screen.getByRole('button', {
        name: 'Send Message',
      }),
    );

    expect(
      await screen.findByText(
        'Name must be at least 2 characters',
      ),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        'Please enter a valid email address',
      ),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        'Message must be at least 10 characters',
      ),
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('shows validation error for an invalid email', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(
      screen.getByRole('textbox', {
        name: 'Name',
      }),
      'John Doe',
    );

    await user.type(
      screen.getByRole('textbox', {
        name: 'Email',
      }),
      'invalid-email',
    );

    await user.type(
      screen.getByRole('textbox', {
        name: 'Message',
      }),
      'Hello there',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Send Message',
      }),
    );

    expect(
      await screen.findByText(
        'Please enter a valid email address',
      ),
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('submits valid form data', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(
      screen.getByRole('textbox', {
        name: 'Name',
      }),
      'John Doe',
    );

    await user.type(
      screen.getByRole('textbox', {
        name: 'Email',
      }),
      'john@example.com',
    );

    await user.type(
      screen.getByRole('textbox', {
        name: 'Message',
      }),
      'Hello, I would like to know more.',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Send Message',
      }),
    );

    expect(mockMutate).toHaveBeenCalledTimes(1);

    expect(mockMutate).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I would like to know more.',
    });
  });

  it('renders the error message when mutation fails', () => {
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: true,
      isSuccess: false,
      error: new Error(
        'Failed to submit contact form',
      ),
    });

    render(<ContactForm />);

    expect(
      screen.getByText(
        'Failed to submit contact form',
      ),
    ).toBeInTheDocument();
  });

  it('renders the success message when mutation succeeds', () => {
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      isSuccess: true,
      error: null,
    });

    render(<ContactForm />);

    expect(
      screen.getByText(
        'Your message has been sent successfully.',
      ),
    ).toBeInTheDocument();
  });

  it('disables the submit button while mutation is pending', () => {
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isError: false,
      isSuccess: false,
      error: null,
    });

    render(<ContactForm />);

    expect(
      screen.getByRole('button', {
        name: 'Sending...',
      }),
    ).toBeDisabled();
  });
});

