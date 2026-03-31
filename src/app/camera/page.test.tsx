import { render, screen, waitFor } from '@testing-library/react';
import CameraPage from '@/app/camera/page';
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
  usePathname: () => '/camera',
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

jest.mock('@/components/teacher/TeacherCameraPage', () => {
  return function MockTeacherCameraPage() {
    return <div data-testid="teacher-camera">Camera</div>;
  };
});

jest.mock('@/assets/styles/page.css', () => ({}));

describe('CameraPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');
    
    render(<CameraPage />);
    // Suspense fallback is null, so we just check it renders
    expect(screen.queryByTestId('dashboard-header')).toBeInTheDocument();
  });

  it('should show header for teacher', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<CameraPage />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    });
  });

  it('should show sidenav for teacher with correct role', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<CameraPage />);

    await waitFor(() => {
      expect(screen.getByTestId('sidenav')).toBeInTheDocument();
      expect(screen.getByText(/Sidenav - teacher/)).toBeInTheDocument();
    });
  });

  it('should display TeacherCameraPage component for teacher', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    render(<CameraPage />);

    await waitFor(() => {
      expect(screen.getByTestId('teacher-camera')).toBeInTheDocument();
    });
  });

  it('should not show camera content if not a teacher', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('student');

    render(<CameraPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('teacher-camera')).not.toBeInTheDocument();
    });
  });

  it('should not show camera content if role is null', async () => {
    (getStoredRole as jest.Mock).mockReturnValue(null);

    render(<CameraPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('teacher-camera')).not.toBeInTheDocument();
    });
  });

  it('should have correct layout structure', async () => {
    (getStoredRole as jest.Mock).mockReturnValue('teacher');

    const { container } = render(<CameraPage />);

    await waitFor(() => {
      const pageDiv = container.querySelector('.page');
      expect(pageDiv).toBeInTheDocument();
    });
  });
});
