export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  pathname: '/',
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
}));

export const usePathname = jest.fn(() => '/');

export const useSearchParams = jest.fn(() => ({
  get: jest.fn(() => null),
  getAll: jest.fn(() => []),
  entries: jest.fn(() => []),
  values: jest.fn(() => []),
  keys: jest.fn(() => []),
  forEach: jest.fn(),
  has: jest.fn(() => false),
  toString: jest.fn(() => ''),
}));
