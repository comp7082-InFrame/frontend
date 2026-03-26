import { formatEndDate, formatStartDate, formatTimeYYYYMMDD, formatTimeYYYYMMDDHHmmss } from '@/utils/formatTime';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getCampuses = async (campus_id?: string): Promise<any> => {
    let url_string = '/campuses/'
    if (campus_id && campus_id != '') {
        url_string += '?campus_id=' + campus_id;
    }
    const response = await api.get(url_string);
    return response.data;
}

export const getBuildings = async (campus_id?: string, building_id?: string): Promise<any> => {
    let url_string = '/buildings/'
    if (campus_id != null && campus_id != '') {
        url_string += '?campus_id=' + campus_id;
    }
    if (building_id != null && building_id != '') {
        url_string += '&building_id=' + building_id;
    }
    const response = await api.get(url_string);
    return response.data;
}

export const getRoom = async (campus_id?: string, building_id?: string, room_id?: string): Promise<any> => {
    let url_string = '/rooms/'
    if (campus_id != null && campus_id != '') {
        url_string += '?campus_id=' + campus_id;
    }
    if (building_id != null && building_id != '') {
        url_string += '&building_id=' + building_id;
    }
    if (room_id != null && room_id != '') {
        url_string += '&room_id=' + room_id;
    }
    const response = await api.get(url_string);
    return response.data;
}

export const getTerms = async (term_id?: string): Promise<any> => {
    let url_string = '/terms/'
    if (term_id != null && term_id != '') {
        url_string += '?term_id=' + term_id;
    }
    const response = await api.get(url_string);
    return response.data;
}

export const getTermsByDate = async (date: Date): Promise<any> => {
    let date_str = formatStartDate(date);
    let url_string = `/terms/by_date/?date=${date_str}`;
    const response = await api.get(url_string);
    return response.data;
}

export const getCourses = async (term_id: string, course_id?: string, teacher_id?: string): Promise<any> => {
    let url_string = '/courses/?term_id=' + term_id;

    if (course_id != null && course_id != '') {
        url_string += '&course_id=' + course_id;
    }
    if (teacher_id != null && teacher_id != '') {
        url_string += `&teacher_id=${teacher_id}`;
    }
    const response = await api.get(url_string);
    return response.data;
}

export const getTeacherClasses = async (teacher_id: string, start_date: Date, end_date: Date, course_id?: string): Promise<any> => {
    let start_date_str = formatStartDate(start_date);
    let end_date_str = formatEndDate(end_date);
    let url = `/classes/teacher_classes/?teacher_id=${teacher_id}&start_date=${start_date_str}&end_date=${end_date_str}`;
    if (course_id != null && course_id != '') {
        url += `&course_id=${course_id}`;
    }
    const response = await api.get(url);
    return response.data;
}

export const getTeacherCourseandTerm = async (teacher_id: string, start_date?: Date, end_date?: Date): Promise<any> => {
    let url = `/classes/teacher/term_course/?teacher_id=${teacher_id}`;
    if (start_date) {
        let start_date_str = formatStartDate(start_date);
        url += `&start_date=${start_date_str}`
    }
    if (end_date) {
        let end_date_str = formatEndDate(end_date);
        url += `&end_date=${end_date_str}`
    }
    const response = await api.get(url);
    return response.data;
}

export const getStudentCourseandTerm = async (student_id: string, start_date?: Date, end_date?: Date): Promise<any> => {
    let url = `/classes/student/term_course/?student_id=${student_id}`;
    if (start_date) {
        let start_date_str = formatStartDate(start_date);
        url += `&start_date=${start_date_str}`
    }
    if (end_date) {
        let end_date_str = formatEndDate(end_date);
        url += `&end_date=${end_date_str}`
    }
    const response = await api.get(url);
    return response.data;
}

export const createSession = async (class_id: string, teacher_id: string, room_id: string, start_time: Date, end_time: Date): Promise<any> => {

    let body = {
        "class_id": class_id,
        "teacher_id": teacher_id,
        "room_id": room_id,
        "start_time": formatTimeYYYYMMDDHHmmss(start_time),
        "end_time": formatTimeYYYYMMDDHHmmss(end_time)
    }
    const response = await api.post('/sessions/', body);
    return response.data;
}

export const getSessions = async (course_id: string, class_id?: string): Promise<any> => {
    let url = `/sessions/?course_id=${course_id}`;
    if (class_id != null && class_id != '') {
        url += `&class_id=${class_id}`;
    }

    const response = await api.get(url)
    return response.data;
}

export const getAttendanceRecords = async (session_id: number): Promise<any> => {
    let url = `/sessions/records/?session_id=${session_id}`;

    const response = await api.get(url)
    return response.data;
}

export const getCameras = async (): Promise<{ id: number; name: string }[]> => {
    const response = await api.get('/cameras/');
    return response.data;
}
