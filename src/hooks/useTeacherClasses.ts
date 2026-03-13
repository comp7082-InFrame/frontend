import { getTeacherClasses, getTeacherCourseandTerm } from '@/services/api';
import { useState, useEffect, useCallback } from 'react';

export function useTeacherClasses(teacher_id: string, start_date: Date, end_date: Date, course_id?: string) {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchedule = useCallback(async () => {
        setLoading(true);
        try {
            await getTeacherClasses(teacher_id, start_date, end_date, course_id).then(
                data => {
                    data.map((item: any) => {
                        item['event_id'] = item['class_id'] + item['teacher_id']
                        item['start'] = new Date(item.start_time);
                        item['end'] = new Date(item.end_time);
                    })
                    setSchedule(data);
                    setError(null);
                    setLoading(false);
                }
            );
        } catch (e) {
            setError('Failed to fetch classes');
        } finally {
            setLoading(false);
        }
    }, [teacher_id, course_id]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    return { schedule, loading, error, refetch: fetchSchedule };
}


export function useTeacherCourseTerm(teacher_id: string, start_date?: Date, end_date?: Date) {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeacherCoursesandTerm = useCallback(async () => {
        setLoading(true);
        try {
            await getTeacherCourseandTerm(teacher_id, start_date, end_date).then(
                data => {
                    data.map( (item:any) => {
                        item.title = item.term_name + " - " + item.course_name
                        item.sessions = []
                        item.id = item.term_id + item.course_id
                    })
                    setCourses(data);
                    setError(null);
                    setLoading(false);
                }
            );
        } catch (e) {
            setError('Failed to fetch courses and term');
        } finally {
            setLoading(false);
        }
    }, [teacher_id, start_date, end_date]);

    useEffect(() => {
        fetchTeacherCoursesandTerm();
    }, [fetchTeacherCoursesandTerm]);

    return { courses, loading, error, refetch: fetchTeacherCoursesandTerm };
}
