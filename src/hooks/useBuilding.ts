import { getBuildings } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function useBuildings(campus_id?: string, building_id?: string) {
    const [buildings, setBuildings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBuildings = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getBuildings(campus_id, building_id);
            
            setBuildings(data);
            setError(null);
        } catch (e) {
            setError('Failed to fetch building');
        } finally {
            setLoading(false);
        }
    }, [campus_id]);

    useEffect(() => {
        fetchBuildings();
    }, [fetchBuildings]);

    return { buildings, loading, error, refetch: fetchBuildings };
}
