import { getTerms, getTermsByDate } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function useTerms(term_id?: string) {
    const [terms, setTerms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTerms = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTerms(term_id);
            setTerms(data);
            setError(null);
        } catch (e) {
            setError('terms');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTerms();
    }, [fetchTerms]);

    return { terms, loading, error, refetch: fetchTerms };
}

export function useCurrentTerm() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTerm, setCurrentTerm] = useState<any>();
    const fetchCurrentTerm = useCallback(async () => {
        try {
            let today = new Date();

            setLoading(true);
            const data = await getTermsByDate(today);
            setCurrentTerm(data[0]);
            setError(null);
        } catch (e) {
            setError('Failed to fetch room');
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchCurrentTerm();
    }, [fetchCurrentTerm]);

    return { currentTerm, loading, error, refetch: fetchCurrentTerm };
}