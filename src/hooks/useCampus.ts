import { getCampuses, getTeacherClasses } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function useCampuses(campus_id?: string) {
    const [campuses, setCampuses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCampuses = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getCampuses(campus_id);
            setCampuses(data);
            setError(null);
        } catch (e) {
            setError('Failed to fetch campus');
        } finally {
            setLoading(false);
        }
    }, [campus_id]);

    useEffect(() => {
        fetchCampuses();
    }, [fetchCampuses]);

    return { campuses, loading, error, refetch: fetchCampuses };
}
