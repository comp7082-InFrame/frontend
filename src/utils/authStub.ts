export type AppRole = 'admin' | 'teacher';

const ROLE_STORAGE_KEY = 'inframe-role';

export function getStoredRole(): AppRole | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(ROLE_STORAGE_KEY);
  return value === 'admin' || value === 'teacher' ? value : null;
}

export function setStoredRole(role: AppRole) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ROLE_STORAGE_KEY, role);
}

export function clearStoredRole() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ROLE_STORAGE_KEY);
}
