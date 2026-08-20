import {
    fireEvent,
    render,
    screen,
    waitFor,
  } from '@testing-library/react';
  
  import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
  
  import ContactPage from './page';
  import services from '@/services';
  
  jest.mock('@/services', () => ({
    __esModule: true,
    default: {
      postContact: jest.fn(),
    },
  }));
  
  const postContact = services.postContact as jest.MockedFunction<
    typeof services.postContact
  >;
  
  function renderContactPage() {
    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          retry: false,
        },
      },
    });
  
    return render(
      <QueryClientProvider client={queryClient}>
        <ContactPage />
      </QueryClientProvider>
    );
  }
  
  describe('ContactPage Integration', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('submits the contact form successfully', async () => {
      postContact.mockResolvedValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello Digital Solutions',
      });
  
      renderContactPage();
  
      fireEvent.change(
        screen.getByLabelText('Name'),
        {
          target: {
            value: 'John Doe',
          },
        }
      );
  
      fireEvent.change(
        screen.getByLabelText('Email'),
        {
          target: {
            value: 'john@example.com',
          },
        }
      );
  
      fireEvent.change(
        screen.getByLabelText('Message'),
        {
          target: {
            value: 'Hello Digital Solutions',
          },
        }
      );
  
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Send Message',
        })
      );
  
      await waitFor(() => {
        expect(postContact).toHaveBeenCalled();
      });
  
      expect(postContact.mock.calls[0][0]).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello Digital Solutions',
      });
  
      expect(
        screen.getByText(
          'Your message has been sent successfully.'
        )
      ).toBeInTheDocument();
    });
  });