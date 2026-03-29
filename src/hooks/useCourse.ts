import { getCourses, getTeacherClasses } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function useCourses(term_id: string, course_id: string, teacher_id?: string) {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = useCallback(async () => {
        if (term_id == null || term_id == '') return;
        try {
            setLoading(true);
            const data = await getCourses(term_id, course_id, teacher_id);
            setCourses(data);
            setError(null);
        } catch (e) {
            setError('Failed to fetch course');
        } finally {
            setLoading(false);
        }
    }, [term_id, course_id]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return { courses, loading, error, refetch: fetchCourses };
}
