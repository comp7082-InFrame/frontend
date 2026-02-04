import { useState, useEffect, useCallback } from 'react';
import { AttendanceCurrentResponse, AttendanceUpdate } from '../types';
import { getCurrentAttendance } from '../services/api';

export function useAttendance(lastUpdate: AttendanceUpdate | null) {
  const [attendance, setAttendance] = useState<AttendanceCurrentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      const data = await getCurrentAttendance();
      setAttendance(data);
      setError(null);
    } catch (e) {
      setError('Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // Refetch when attendance updates come in
  useEffect(() => {
    if (lastUpdate) {
      fetchAttendance();
    }
  }, [lastUpdate, fetchAttendance]);

  return { attendance, loading, error, refetch: fetchAttendance };
}
