
import ContactForm from '@/components/contact/contact-form';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

const mockMutate = jest.fn();
const mockReset = jest.fn();

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
      reset: mockReset,
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

  it('updates form fields when user types', () => {
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

    fireEvent.change(nameInput, {
      target: {
        value: 'John Doe',
      },
    });

    fireEvent.change(emailInput, {
      target: {
        value: 'john@example.com',
      },
    });

    fireEvent.change(messageInput, {
      target: {
        value: 'Hello, I would like to know more.',
      },
    });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue(
      'Hello, I would like to know more.',
    );
  });

  it('shows validation errors when submitting an empty form', () => {
    render(<ContactForm />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Send Message',
      }),
    );

    expect(
      screen.getByText(
        'Name must be at least 2 characters',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Please enter a valid email address',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Message must be at least 10 characters',
      ),
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('shows validation error for an invalid email', () => {
    render(<ContactForm />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Name',
      }),
      {
        target: {
          value: 'John Doe',
        },
      },
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Email',
      }),
      {
        target: {
          value: 'invalid-email',
        },
      },
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Message',
      }),
      {
        target: {
          value: 'Hello there',
        },
      },
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Send Message',
      }),
    );

    expect(
      screen.getByText(/valid email/i),
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('submits valid form data', () => {
    render(<ContactForm />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Name',
      }),
      {
        target: {
          value: 'John Doe',
        },
      },
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Email',
      }),
      {
        target: {
          value: 'john@example.com',
        },
      },
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Message',
      }),
      {
        target: {
          value: 'Hello, I would like to know more.',
        },
      },
    );

    fireEvent.click(
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
      reset: mockReset,
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
      reset: mockReset,
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
      reset: mockReset,
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

  it('resets mutation state when a field is changed', () => {
    render(<ContactForm />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Name',
      }),
      {
        target: {
          value: 'John',
        },
      },
    );

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});

