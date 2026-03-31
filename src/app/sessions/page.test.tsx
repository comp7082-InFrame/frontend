import { render, screen, waitFor } from '@testing-library/react';
import SessionsPage from '@/app/sessions/page';
import { getStoredRole } from '@/utils/authStub';

jest.mock('@/utils/authStub', () => ({
  getStoredRole: jest.fn(),
  getStoredUser: jest.fn(),
  setStoredUser: jest.fn(),
  clearStoredUser: jest.fn(),
  setUserRole: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/sessions',
  useSearchParams: () => ({
    get: jest.fn(() => null),
  }),
}));

jest.mock('@/components/header', () => {
  return function MockHeader() {
    return <div data-testid="dashboard-header">Header</div>;
  };
});

jest.mock('@/components/sidenav', () => {
  return function MockSidenav({ role }: any) {
    return <div data-testid="sidenav">Sidenav - {role}</div>;
  };
});

jest.mock('@/components/sessions/Sessions', () => {
  return function MockSessions() {
    return <div data-testid="sessions-component">Sessions Component</div>;
  };
});

jest.mock('@/assets/styles/teacher-dashboard.css', () => ({}));
jest.mock('@/assets/styles/scheduler.css', () => ({}));
jest.mock('@/assets/styles/page.css', () => ({}));

describe('SessionsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<SessionsPage />);
    // Component should render
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
  });

  it('should display header component', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<SessionsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    });
  });

  it('should display sidenav with correct role', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<SessionsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('sidenav')).toHaveTextContent('Sidenav - teacher');
    });
  });

  it('should display Sessions component for teachers', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<SessionsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('sessions-component')).toBeInTheDocument();
    });
  });

  it('should not display Sessions component for students', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('student');

    render(<SessionsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('sessions-component')).not.toBeInTheDocument();
    });
  });

  it('should not display Sessions component for admins', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('admin');

    render(<SessionsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('sessions-component')).not.toBeInTheDocument();
    });
  });

  it('should handle null role', () => {
    (getStoredRole as jest.Mock).mockReturnValue(null);

    render(<SessionsPage />);
    // Should render without errors
    expect(screen.queryByTestId('sidenav')).not.toBeInTheDocument();
  });

  it('should have correct page layout', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    const { container } = render(<SessionsPage />);

    await waitFor(() => {
      const pageDiv = container.querySelector('.page');
      expect(pageDiv).toBeInTheDocument();
    });
  });

  it('should display teacher with correct role in sidenav', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<SessionsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Sidenav - teacher/)).toBeInTheDocument();
    });
  });
});
