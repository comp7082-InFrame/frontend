import { render, screen, waitFor } from '@testing-library/react';
import TeachersPage from '@/app/teachers/page';
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
  usePathname: () => '/teachers',
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

jest.mock('@/components/admin/AdminTeachers', () => {
  return function MockAdminTeachers() {
    return <div data-testid="admin-teachers">Admin Teachers</div>;
  };
});

jest.mock('@/assets/styles/page.css', () => ({}));

describe('TeachersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render page structure', () => {
    (getStoredRole as jest.Mock).mockReturnValue('admin');

    const { container } = render(<TeachersPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display header component for admin', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('admin');

    render(<TeachersPage />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    });
  });

  it('should display sidenav for admin', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('admin');

    render(<TeachersPage />);

    await waitFor(() => {
      expect(screen.getByTestId('sidenav')).toHaveTextContent('Sidenav - admin');
    });
  });

  it('should display AdminTeachers component for admin', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('admin');

    render(<TeachersPage />);

    await waitFor(() => {
      expect(screen.getByTestId('admin-teachers')).toBeInTheDocument();
    });
  });

  it('should not display content for non-admin users', () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<TeachersPage />);

    expect(screen.queryByTestId('admin-teachers')).not.toBeInTheDocument();
  });

  it('should not display content for students', () => {
    (getStoredRole as jest.Mock).mockReturnValue('student');

    render(<TeachersPage />);

    expect(screen.queryByTestId('admin-teachers')).not.toBeInTheDocument();
  });

  it('should handle null role', () => {
    (getStoredRole as jest.Mock).mockReturnValue(null);

    render(<TeachersPage />);

    expect(screen.queryByTestId('admin-teachers')).not.toBeInTheDocument();
  });

  it('should have correct page layout', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('admin');

    const { container } = render(<TeachersPage />);

    await waitFor(() => {
      const pageDiv = container.querySelector('.page');
      expect(pageDiv).toBeInTheDocument();
    });
  });

  it('should require admin role to display teachers', async () => {
    const roles = ['admin', 'teacher', 'student', null];
    
    for (const role of roles) {
      jest.clearAllMocks();
      (getStoredRole as jest.Mock).mockReturnValue(role);

      const { unmount } = render(<TeachersPage />);

      if (role === 'admin') {
        await waitFor(() => {
          expect(screen.queryByTestId('admin-teachers')).toBeInTheDocument();
        }, { timeout: 100 });
      } else {
        expect(screen.queryByTestId('admin-teachers')).not.toBeInTheDocument();
      }

      unmount();
    }
  });
});
