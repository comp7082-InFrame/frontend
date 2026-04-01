import { render, screen } from '@testing-library/react';
import Header from '@/components/header';

// Mock Next.js router
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

describe('Header Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  it('should render as a semantic header element or contain navigation', () => {
    const { container } = render(<Header />);
    const headerElement = container.querySelector('header, nav, [role="banner"]');
    expect(headerElement).toBeInTheDocument();
  });
});

