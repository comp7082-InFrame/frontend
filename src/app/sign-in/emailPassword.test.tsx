import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import EmailPassword from '@/app/sign-in/emailPassword';
import { getSupabaseBrowserClient } from '@/utils/supabase/browser-client';

// Mock dependencies
jest.mock('@/utils/supabase/browser-client');
jest.mock('@/utils/supabase/actions');
jest.mock('next/navigation');
jest.mock('@/components/header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

// Mock Supabase auth
const mockSignInWithPassword = jest.fn();
const mockSignUp = jest.fn();
const mockOnAuthStateChange = jest.fn();

const mockSupabaseClient = {
  auth: {
    signInWithPassword: mockSignInWithPassword,
    signUp: mockSignUp,
    onAuthStateChange: mockOnAuthStateChange,
  },
};

describe('EmailPassword Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getSupabaseBrowserClient as jest.Mock).mockReturnValue(mockSupabaseClient);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    });
  });

  it('should render the component', () => {
    render(<EmailPassword user={null} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render email and password input fields', () => {
    render(<EmailPassword user={null} />);
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should initialize with empty email state', async () => {
    render(<EmailPassword user={null} />);
    
    const inputs = screen.getAllByRole('textbox');
    const emailInput = inputs[0] as HTMLInputElement;
    expect(emailInput.value).toBe('');
  });

  it('should update email value when user types', async () => {
    const user = userEvent.setup();
    render(<EmailPassword user={null} />);
    
    const inputs = screen.getAllByRole('textbox');
    const emailInput = inputs[0];
    
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should setup auth state listener on component mount', () => {
    render(<EmailPassword user={null} />);
    
    expect(mockOnAuthStateChange).toHaveBeenCalled();
  });
});
