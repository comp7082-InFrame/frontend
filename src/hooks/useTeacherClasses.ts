import { getTeacherClasses, getTeacherCourseandTerm } from '@/services/api';
import { useState, useEffect } from 'react';

export function useTeacherClasses(teacher_id: string, start_date: Date, end_date: Date, course_id?: string) {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const refetch = () => setRefetchTrigger(prev => prev + 1);

    useEffect(() => {
        if (!teacher_id) {
            setLoading(false);
            setSchedule([]);
            return;
        }

        const fetchSchedule = async () => {
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
                setLoading(false);
            }
        };
        fetchSchedule();
    }, [teacher_id, start_date?.getTime(), end_date?.getTime(), course_id, refetchTrigger]);

    return { schedule, loading, error, refetch };
}


export function useTeacherCourseTerm(teacher_id: string, start_date?: Date, end_date?: Date) {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const refetch = () => setRefetchTrigger(prev => prev + 1);

    useEffect(() => {
        const fetchTeacherCoursesandTerm = async () => {
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
        };
        fetchTeacherCoursesandTerm();
    }, [teacher_id, start_date?.getTime(), end_date?.getTime(), refetchTrigger]);

    return { courses, loading, error, refetch };
}
