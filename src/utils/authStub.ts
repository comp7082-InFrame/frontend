export type AppRole = 'admin' | 'teacher' | 'student';

export interface StoredUser {
  id: string;
  first_name: string;
  last_name: string;
  role: string[];
}

const USER_STORAGE_KEY = 'inframe-user';

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(USER_STORAGE_KEY);
}

/**
 * Get the primary role from the stored user.
 * Since users can have multiple roles, this returns the first one.
 */
export function getStoredRole(): AppRole | null {
  const user = getStoredUser();
  if (!user || !user.role || user.role.length === 0) {
    return null;
  }
  const role = user.role[0];
  if (role === 'admin' || role === 'teacher' || role === 'student') {
    return role;
  }
  return null;
}
