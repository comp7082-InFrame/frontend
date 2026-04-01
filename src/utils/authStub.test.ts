import {
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  setUserRole,
  getStoredRole,
  StoredUser,
  AppRole,
} from '@/utils/authStub';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('authStub utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('setStoredUser and getStoredUser', () => {
    it('should store and retrieve a user', () => {
      const testUser: StoredUser = {
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        role: ['teacher'],
        email: 'john@example.com',
      };

      setStoredUser(testUser);
      const retrievedUser = getStoredUser();

      expect(retrievedUser).toEqual(testUser);
    });

    it('should return null when no user is stored', () => {
      const user = getStoredUser();
      expect(user).toBeNull();
    });

    it('should update user when setStoredUser is called again', () => {
      const user1: StoredUser = {
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        role: ['teacher'],
        email: 'john@example.com',
      };

      const user2: StoredUser = {
        id: '456',
        first_name: 'Jane',
        last_name: 'Smith',
        role: ['admin'],
        email: 'jane@example.com',
      };

      setStoredUser(user1);
      expect(getStoredUser()).toEqual(user1);

      setStoredUser(user2);
      expect(getStoredUser()).toEqual(user2);
    });

    it('should return null for corrupted user data', () => {
      window.localStorage.setItem('inframe-user', 'invalid-json');
      const user = getStoredUser();
      expect(user).toBeNull();
    });
  });

  describe('clearStoredUser', () => {
    it('should clear stored user and role', () => {
      const testUser: StoredUser = {
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        role: ['teacher'],
        email: 'john@example.com',
      };

      setStoredUser(testUser);
      setUserRole('teacher');

      clearStoredUser();

      expect(getStoredUser()).toBeNull();
      expect(getStoredRole()).toBeNull();
    });
  });

  describe('setUserRole and getStoredRole', () => {
    it('should store and retrieve a role', () => {
      setUserRole('admin');
      expect(getStoredRole()).toBe('admin');
    });

    it('should update role when setUserRole is called again', () => {
      setUserRole('teacher');
      expect(getStoredRole()).toBe('teacher');

      setUserRole('student');
      expect(getStoredRole()).toBe('student');
    });

    it('should retrieve role from user if not explicitly set', () => {
      const testUser: StoredUser = {
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        role: ['teacher'],
        email: 'john@example.com',
      };

      setStoredUser(testUser);
      window.localStorage.removeItem('inframe-user-role');

      const role = getStoredRole();
      expect(role).toBe('teacher');
    });
  });
});
