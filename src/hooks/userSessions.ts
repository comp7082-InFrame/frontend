import { createSession } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function createNewSession(class_id: string, teacher_id: string, room_id: string, start_time: Date, end_time: Date) {
    const [session, setSession] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCreateSession = useCallback(async () => {
        try {
            setLoading(true);
            const data = await createSession(class_id, teacher_id, room_id, start_time, end_time);
            setSession(data);
            setError(null);
        } catch (e) {
            setError('Failed to insert session');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCreateSession();
    }, [fetchCreateSession]);

    return { session, loading, error, refetch: fetchCreateSession };
}




