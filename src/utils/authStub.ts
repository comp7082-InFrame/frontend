export type AppRole = 'admin' | 'teacher' | 'student';

export interface StoredUser {
  id: string;
  first_name: string;
  last_name: string;
  role: string[];
  email: string;
}

const USER_STORAGE_KEY = 'inframe-user';
const USER_ROLE_KEY = 'inframe-user-role';

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
  window.localStorage.removeItem(USER_ROLE_KEY);
}

export function setUserRole(role: AppRole) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(USER_ROLE_KEY, JSON.stringify(role));
}

export function getStoredRole(): AppRole | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(USER_ROLE_KEY);
  if (!value) {
    const user = getStoredUser();
    if (!user || !user.role || user.role.length === 0) {
      return null;
    }
    if (user.role.length == 1) {
      const role = user.role[0];
      if (role === 'admin' || role === 'teacher' || role === 'student') {
        setUserRole(role);  
        return role;
      }
    }
    return null;
  }

  try {
    return JSON.parse(value) as AppRole;
  } catch {
    return null;
  }
}
