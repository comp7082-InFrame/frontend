import { formatEndDate, formatStartDate, formatTimeYYYYMMDD, formatTimeYYYYMMDDHHmmss } from '@/utils/formatTime';
import { AdminStudent, AdminStudentCreateInput, AdminTeacher, AdminTeacherCreateInput, SignUpUserInput } from '@/types/admin';
import { StoredUser } from '@/utils/authStub';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// User management
export const getUsers = async (role?: string): Promise<StoredUser[]> => {
    let url = '/users/';
    if (role) {
        url += `?role=${role}`;
    }
    const response = await api.get(url);
    return response.data;
}

export const getUser = async (id: string): Promise<StoredUser> => {
    let url = `/users/${id}/`;
    const response = await api.get(url);
    return response.data;
}

export const getCampuses = async (campus_id?: string): Promise<any> => {
    let url_string = '/campuses/'
    if (campus_id && campus_id != '') {
        url_string += '?campus_id=' + campus_id;
    }
    const response = await api.get(url_string);
    return response.data;
}

export const getBuildings = async (campus_id?: string, building_id?: string): Promise<any> => {
    const params = new URLSearchParams();
    if (campus_id != null && campus_id != '') {
        params.append('campus_id', campus_id);
    }
    if (building_id != null && building_id != '') {
        params.append('building_id', building_id);
    }
    const url_string = `/buildings/${params.toString() ? '?' + params.toString() : ''}`;
    const response = await api.get(url_string);
    return response.data;
}

export const getRoom = async (campus_id?: string, building_id?: string, room_id?: string): Promise<any> => {
    const params = new URLSearchParams();
    if (campus_id != null && campus_id != '') {
        params.append('campus_id', campus_id);
    }
    if (building_id != null && building_id != '') {
        params.append('building_id', building_id);
    }
    if (room_id != null && room_id != '') {
        params.append('room_id', room_id);
    }
    const url_string = `/rooms/${params.toString() ? '?' + params.toString() : ''}`;
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
        "start_time": start_time.toISOString(),
        "end_time": end_time.toISOString()
    }
    console.log('createSession payload:', body);
    try {
        const response = await api.post('/sessions/', body);
        console.log('createSession success:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('createSession error details:', error.response?.data);
        throw error;
    }
}

export const getSessions = async (course_id: string, class_id?: string): Promise<any> => {
    let url = `/sessions/?course_id=${course_id}`;
    if (class_id != null && class_id != '') {
        url += `&class_id=${class_id}`;
    }

    const response = await api.get(url)
    return response.data;
}

export const getAttendanceRecords = async (session_id: string): Promise<any> => {
    let url = `/sessions/records/?session_id=${session_id}`;

    const response = await api.get(url)
    return response.data;
}

export const endSession = async (session_id: string): Promise<any> => {
    console.log('endSession called with session_id:', session_id);
    try {
        const response = await api.post(`/sessions/end`, { session_id });
        console.log('endSession response:', response.data);
        return response.data;
    } catch (error) {
        console.error('endSession error:', error);
        throw error;
    }
}

export const getStudents = async (): Promise<AdminStudent[]> => {
    const response = await api.get('/students/');
    return response.data;
}

export const createStudent = async (input: AdminStudentCreateInput): Promise<AdminStudent> => {
    const formData = new FormData();
    formData.append('student_number', input.student_number);
    formData.append('first_name', input.first_name);
    formData.append('last_name', input.last_name);
    formData.append('email', input.email);
    formData.append('course_ids', JSON.stringify(input.course_ids));
    formData.append('photo', input.photo);

    const response = await api.post('/students/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
}

// Teacher management
export const getTeachers = async (): Promise<AdminTeacher[]> => {
    const response = await api.get('/teachers/');
    return response.data;
}

export const createTeacher = async (input: AdminTeacherCreateInput): Promise<AdminTeacher> => {
    const formData = new FormData();
    formData.append('first_name', input.first_name);
    formData.append('last_name', input.last_name);
    formData.append('email', input.email);
    formData.append('employee_number', input.employee_number);
    formData.append('department', input.department);
    formData.append('title', input.title);
    formData.append('photo', input.photo);

    const response = await api.post('/teachers/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
}

export const updateSignUpUser = async (input: SignUpUserInput): Promise<StoredUser> => {
    const formData = new FormData();
    formData.append('first_name', input.first_name);
    formData.append('last_name', input.last_name);
    formData.append('email', input.email);
    formData.append('role', input.role);
    formData.append('uuid', input.uuid);
    if (input.role === 'student' && input.student_number) {
        formData.append('student_number', input.student_number);
    }
    if (input.role === 'teacher' && input.employee_number) {
        formData.append('employee_number', input.employee_number);
    }

    if (input.photo) {
        formData.append('photo', input.photo);
    }
    const response = await api.post(`/users/${input.uuid}/`, formData);

    return response.data;
}