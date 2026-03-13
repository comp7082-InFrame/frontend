import { useState, useEffect, useCallback } from 'react';
import { Person } from '../types/test';
import { getRoster } from '@/services/test';

export function useRoster() {
  const [roster, setRoster] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoster = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRoster();
      setRoster(data.persons);
      setError(null);
    } catch (e) {
      setError('Failed to fetch roster');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoster();
  }, [fetchRoster]);

  return { roster, loading, error, refetch: fetchRoster };
}
