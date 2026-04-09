# Unit Testing Guide

This document provides guidance on writing and running unit tests for the InFrame frontend application.

## Setup

Testing infrastructure has been configured with:
- **Jest**: Test runner and assertion library
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: Custom matchers for DOM elements
- **ts-jest**: TypeScript support for Jest
- **jsdom**: DOM environment simulation

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test File Structure

Test files should be placed:
- **Utility/Service tests**: Next to the source file with `.test.ts` or `.test.tsx` extension
  - Example: `src/utils/formatTime.ts` → `src/utils/formatTime.test.ts`
- **Component tests**: Next to the component with `.test.tsx` extension
  - Example: `src/components/Header.tsx` → `src/components/header.test.tsx`

## Writing Tests

### Testing Utilities/Functions

For pure functions, focus on inputs and outputs:

```typescript
import { formatTimeHHmm } from '@/utils/formatTime';

describe('formatTimeHHmm', () => {
  it('should format date as HH:mm', () => {
    const result = formatTimeHHmm(new Date('2024-03-30T14:25:00Z'));
    expect(result).toBe('14:25');
  });
});
```

### Testing Components

Use React Testing Library to test component behavior from a user's perspective:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render content', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    const button = screen.getByRole('button', { name: /click/i });
    await user.click(button);
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

### Mocking Dependencies

For components that use external services:

```typescript
jest.mock('@/utils/supabase/browser-client');
jest.mock('next/navigation');

const mockSupabaseClient = {
  auth: {
    signInWithPassword: jest.fn(),
  },
};

(getSupabaseBrowserClient as jest.Mock).mockReturnValue(mockSupabaseClient);
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Avoid testing internal state; test what users see and do
   - Example: Don't test that `setEmail` was called; test that input value changed
   - Use rendering tests that exercise actual component code via mocked dependencies

2. **Use Descriptive Test Names**
   - ✅ `should display error message when sign in fails`
   - ❌ `should error`

3. **Setup and Cleanup**
   - Use `beforeEach` to reset mocks and state
   - Use `afterEach` for cleanup if needed
   - Reset all jest.mock() implementations between tests to prevent test pollution

4. **One Assertion Per Test (or Related Assertions)**
   - Each test should verify one behavior
   - Related assertions can be grouped if they test the same behavior

5. **Test User Interactions**
   - Use `userEvent` instead of `fireEvent` for more realistic interactions
   - Simulate actual user behavior (typing, clicking, etc.)
   - Test both rendering and user activities in component tests

6. **Mock External Services and Dependencies**
   - Mock API calls with jest.mock() at module level
   - Mock custom hooks (useTeacherClasses, useWebSocket, etc.)
   - Mock child components for isolation
   - Mock CSS modules as empty objects
   - Use mockResolvedValue() or setTimeout(0) pattern for async mock resolution

## Example Test Files

The following test files are provided as examples:

- **[src/utils/formatTime.test.ts](src/utils/formatTime.test.ts)**: Testing datetime utility functions
- **[src/utils/authStub.test.ts](src/utils/authStub.test.ts)**: Testing localStorage operations
- **[src/app/sign-in/emailPassword.test.tsx](src/app/sign-in/emailPassword.test.tsx)**: Testing authentication component
- **[src/components/header.test.tsx](src/components/header.test.tsx)**: Testing header component
- **[src/components/sidenav.test.tsx](src/components/sidenav.test.tsx)**: Testing navigation component

### Page Tests

- **[src/app/layout.test.tsx](src/app/layout.test.tsx)**: Root layout structure verification (10 tests)
- **[src/app/page.test.tsx](src/app/page.test.tsx)**: Main dashboard page with role-based rendering (7 tests)
- **[src/app/camera/page.test.tsx](src/app/camera/page.test.tsx)**: Teacher camera page with role checks (7 tests)
- **[src/app/sessions/page.test.tsx](src/app/sessions/page.test.tsx)**: Teacher sessions page (9 tests)
- **[src/app/teachers/page.test.tsx](src/app/teachers/page.test.tsx)**: Admin teachers management page (9 tests)
- **[src/app/sign-in/page.test.tsx](src/app/sign-in/page.test.tsx)**: Sign-in page structure verification (6 tests)
- **[src/app/sign-up/page.test.tsx](src/app/sign-up/page.test.tsx)**: Sign-up page structure verification (6 tests)

### Admin Component Tests

- **[src/components/admin/AdminStudents.test.tsx](src/components/admin/AdminStudents.test.tsx)**: Student management component (12 tests)
- **[src/components/admin/AdminTeachers.test.tsx](src/components/admin/AdminTeachers.test.tsx)**: Teacher management component with form dialogs (15+ tests, 85.58% coverage)
- **[src/components/admin/AdminCameraPage.test.tsx](src/components/admin/AdminCameraPage.test.tsx)**: Admin camera page (6 tests)
- **[src/components/admin/NewRequests.test.tsx](src/components/admin/NewRequests.test.tsx)**: Admin request page (7 tests)

### Teacher Component Tests

- **[src/components/teacher/StartSessionDialog.test.tsx](src/components/teacher/StartSessionDialog.test.tsx)**: Session start dialog with dropdowns and date picker (9 tests, 82.6% coverage)
- **[src/components/teacher/TeacherDashboard.test.tsx](src/components/teacher/TeacherDashboard.test.tsx)**: Teacher dashboard with scheduler (9 tests, 69.41% coverage)
- **[src/components/teacher/TeacherCameraPage.test.tsx](src/components/teacher/TeacherCameraPage.test.tsx)**: Teacher camera page with WebSocket data and face detection (13 tests, 92.78% coverage)

### Dashboard Component Tests

- **[src/components/dashboards/StudentDashboard.test.tsx](src/components/dashboards/StudentDashboard.test.tsx)**: Dashboard page wrapper with layout composition (7 tests, 33.33 % coverage)
- **[src/components/dashboards/AdminDashboard.test.tsx](src/components/dashboards/AdminDashboard.test.tsx)**: Dashboard page wrapper with layout composition (11 tests, 100% coverage)
- **[src/components/dashboards/TeacherDashboard.test.tsx](src/components/dashboards/TeacherDashboard.test.tsx)**: Dashboard page wrapper with layout composition (9 tests, 100% coverage)


### Session Component Tests

- **[src/components/sessions/Sessions.test.tsx](src/components/sessions/Sessions.test.tsx)**: Sessions wrapper component (11 tests)
- **[src/components/sessions/AttendanceRecord.test.tsx](src/components/sessions/AttendanceRecord.test.tsx)**: Sessions wrapper component (12 tests)
- **[src/components/sessions/CourseByTerm.test.tsx](src/components/sessions/CourseByTerm.test.tsx)**: Sessions wrapper component (12 tests)


### Service and Hook Tests

- **[src/services/api.test.ts](src/services/api.test.ts)**: API service functions verification (8 tests)
- **[src/hooks/hooks.test.ts](src/hooks/hooks.test.ts)**: Custom hooks availability and structure (13 tests)
- **[src/types/types.test.ts](src/types/types.test.ts)**: Type definitions validation (12 tests)

### Utility / Misc Component Tests
- **[src/components/SimpleAuthPage.test.tsx](src/components/SimpleAuthPage.test.tsx)**: Simple authentication component (12 tests)
- **[src/icons/index.test.tsx](src/icons/index.test.tsx)**: Icon exports validation (12 tests)
- **[src/utils/Numberfield.test.tsx](src/utils/Numberfield.test.tsx)**: Number input field component (12 tests)


## Common Testing Patterns
- Use render() from @testing-library/react for component rendering
- Use screen.getBy* queries to assert DOM elements
- Mock external modules with jest.mock()
- Mock async calls with mockResolvedValue()
- Isolate components by mocking children and CSS modules
- Test state updates and user events with user-event
- Organize tests by component, not by folder

### Mocking Custom Hooks

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

// Mock hooks at module level
jest.mock('@/hooks/useTeacherClasses');
jest.mock('@/hooks/useWebSocket');

const mockUseTeacherClasses = useTeacherClasses as jest.Mock;

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup mock return values before each test
    mockUseTeacherClasses.mockReturnValue({
      classes: [{ id: '1', name: 'Math 101' }],
      loading: false,
      error: null,
    });
  });

  it('should render teacher classes', () => {
    render(<MyComponent />);
    expect(screen.getByText('Math 101')).toBeInTheDocument();
  });
});
```

### Mocking API Calls

```typescript
import * as api from '@/services/api';

jest.mock('@/services/api');

const mockApi = api as jest.Mocked<typeof api>;

describe('AdminTeachers', () => {
  beforeEach(() => {
    // Use setTimeout(0) pattern for clean async resolution
    mockApi.getTeachers.mockImplementation(() => 
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'John Doe', employeeNumber: 'E001' },
          ]);
        }, 0);
      })
    );
  });

  it('should display teachers after loading', async () => {
    const { result } = render(<AdminTeachers />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

### Handling Timer Operations and State Updates

When components use timeouts or intervals, use `act()` to wrap timer operations and prevent React warnings:

```typescript
import { act } from '@testing-library/react';

jest.mock('@/hooks/useSomeHook');

describe('ComponentWithTimers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should update state after timer', async () => {
    render(<ComponentWithTimers />);
    
    await act(async () => {
      jest.setSystemTime(new Date('2024-03-30T10:00:00Z'));
      jest.runAllTimers();
    });
    
    expect(screen.getByText('Timer complete')).toBeInTheDocument();
  });
});
```

### Testing Async Operations with waitFor

```typescript
it('should fetch data on mount', async () => {
  render(<MyComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  }, { timeout: 3000 });
});
```

### Testing Forms

```typescript
it('should submit form with correct data', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<MyForm onSubmit={onSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
    email: 'test@example.com',
  }));
});
```

### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '@/hooks/useMyHook';

it('should update value when function is called', () => {
  const { result } = renderHook(() => useMyHook());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.value).toBe(1);
});
```

## Coverage Summary

Currently implemented test coverage:
- **415 total tests** across 36 test suites ✅
- **Utilities**: 100% coverage (formatTime: 6 tests, authStub: 8 tests)
- **Core Components**: 60%+ coverage (header: 3 tests, sidenav: 8 tests, emailPassword: 5 tests)
- **Admin Components**: 
  - AdminStudents: 12 tests, 20.64% lines, 0% functions
  - AdminTeachers: 15+ tests, 85.58% lines, 23.07% functions (improved from 0%)
  - AdminCameraPage: 6 tests, 92.07% lines, 100% functions
  - NewRequests: 7 tests, 33.33% lines, 0% functions
- **Teacher Components**: 
  - StartSessionDialog: 10 tests, 82.6% lines, 9.09% functions (improved from 0%)
  - TeacherDashboard (teacher): 8 tests, 69.41% lines, 16.66% functions (improved from 0%)
  - TeacherCameraPage: 13 tests, **92.78% coverage**, 100% function coverage (improved from 0%)
- **Dashboard Components**:
  - TeacherDashboard (dashboards): 9 tests, **100% statement coverage** (improved from 0%)
  - AdminDashboard: 100% lines/functions
  - StudentDashboard: 33.33% lines, 0% functions
  - Overall dashboards: 88.09% average
- **Pages**: 54 tests covering all application routes
  - Auth routes: 18 tests (sign-in page, sign-up page, emailPassword)
  - Dashboard: 7 tests
  - Teacher pages: 17 tests (camera, sessions, teachers/admin)
  - Root layout: 9 tests
- **Session Components**: 10 tests (AttendanceRecord, CourseByTerm, Sessions) Coverage ranges: 5–47% lines, 0% functions
- **Services**: 8 tests (API service verification), 21.39% lines, 0% functions
- **Hooks**: 13 tests (custom hooks availability) Coverage ranges: 8–50% lines, 0–100% functions
- **Types**: 12 tests (type definitions validation) 100% coverage
- **Misc Components**
  - SimpleAuthPage: 12 tests, 100% coverage
  - Numberfield: 12 tests, 98.23% lines, 100% functions

### Test Breakdown by Type

- **Component Rendering Tests**: 160+ tests (includes Core, Admin, Teacher, Dashboard, Session, Misc components)
- **Page/Route Tests**: 54 tests (all application routes: Auth, Dashboard, Teacher, Root layout)
- **Utility/Function Tests**: 14 tests (formatTime, authStub, Numberfield, activeSession)
- **Service/API Tests**: 8 tests (api.ts coverage 21.39%)
- **Hook Tests**: 13 tests (custom hooks: useTeacherClasses, useWebSocket, etc.)
- **Type Definition Tests**: 12 tests (admin.ts, stream.ts, types.ts)
- **Async/Integration Tests**: 180+ tests (covers WebSocket updates, sessions, teacher/admin workflows, and API interactions)

## Coverage Goals

Aim for:
- ✅ Critical paths (authentication, data submission): 80%+ coverage
- ✅ Utilities and services: 75%+ coverage
- ✅ Complex Components (dialogs, forms, state management): 80%+ coverage
- ✅ Standard Components: 60%+ coverage  
- ✅ Page components: 50%+ coverage
- Consider skipping: UI-only components with minimal logic

Run `npm run test:coverage` to see current coverage.


**Jest Configuration Update:**
- Added `jest.config.ts` with TypeScript support
- Configured `moduleNameMapper` for @aldabil/react-scheduler mock
- Created `__mocks__/aldabil-react-scheduler.ts` for external library mocking

## Debugging Tests

```bash
# Run a single test file
npm test -- formatTime.test.ts

# Run tests for a specific component
npm test -- "src/components/teacher/StartSessionDialog.test.tsx" --no-coverage

# Run tests matching a pattern
npm test -- --testNamePattern="should format"

# Run with coverage for specific files
npm run test:coverage 2>&1 | grep "TeacherDashboard"

# Debug in Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Common Issues and Solutions

### React act() Warnings

**Problem:** Warning about state updates not wrapped in act()  
**Solution:** Wrap async operations in act():

```typescript
await act(async () => {
  jest.setSystemTime(new Date('2024-03-30T10:00:00Z'));
  jest.runAllTimers();
});
```

### Module Not Found: @aldabil/react-scheduler

**Problem:** Cannot find module errors  
**Solution:** Jest moduleNameMapper is configured in jest.config.ts to mock this external library

### Tests Running Slowly

**Problem:** Async tests taking too long  
**Solution:** Use jest.useFakeTimers() and jest.setSystemTime() for time-dependent logic

### Unmocked Fetch Warnings

**Problem:** Warnings about fetch not being mocked  
**Solution:** Mock @/services/api module-level with jest.mock()

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
