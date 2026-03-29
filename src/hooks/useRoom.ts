import { getRoom, getTeacherClasses } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function useRooms(campus_id: string, building_id: string, room_id: string) {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRooms = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getRoom(campus_id, building_id, room_id);
            setRooms(data);
            setError(null);
        } catch (e) {
            setError('Failed to fetch room');
        } finally {
            setLoading(false);
        }
    }, [campus_id, building_id, room_id]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    return { rooms, loading, error, refetch: fetchRooms };
}
