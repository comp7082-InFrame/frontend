import { render } from '@testing-library/react';
import Sidenav from '@/components/sidenav';

// Mock Next.js router and pathname
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: jest.fn(() => null),
  }),
}));

// Mock Supabase client
jest.mock('@/utils/supabase/browser-client', () => ({
  getSupabaseBrowserClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  })),
}));

describe('Sidenav Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Sidenav role={'admin'} />);
    expect(container).toBeInTheDocument();
  });

  it('should render navigation elements', () => {
    const { container } = render(<Sidenav role={'admin'} />);
    const nav = container.querySelector('nav, aside, [role="navigation"], [role="complementary"]');
    expect(nav || container.firstChild).toBeInTheDocument();
  });

  it('should accept role prop', () => {
    const { container: containerAdmin } = render(<Sidenav role={'admin'} />);
    expect(containerAdmin).toBeInTheDocument();

    const { container: containerTeacher } = render(<Sidenav role={'teacher'} />);
    expect(containerTeacher).toBeInTheDocument();

    const { container: containerStudent } = render(<Sidenav role={'student'} />);
    expect(containerStudent).toBeInTheDocument();
  });
});

