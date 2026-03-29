export interface ActiveSessionState {
  session_id: string;
  class_id: string;
  duration: number;    // minutes
  start_time: string;  // ISO 8601
}

const STORAGE_KEY = 'inframe-active-session';

export function getActiveSession(): ActiveSessionState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored) as ActiveSessionState;
  } catch {
    return null;
  }
}

export function setActiveSession(state: ActiveSessionState): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save active session:', err);
  }
}

export function clearActiveSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear active session:', err);
  }
}
