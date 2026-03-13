import axios from 'axios';
import { Person, PersonListResponse, AttendanceCurrentResponse, AttendanceEvent } from '../types/test';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Enrollment
export const enrollPerson = async (name: string, photo: File): Promise<Person> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('photo', photo);

  const response = await api.post('/enrollment/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const removePerson = async (personId: number): Promise<void> => {
  await api.delete(`/enrollment/${personId}`);
};

// Roster
export const getRoster = async (): Promise<PersonListResponse> => {
  const response = await api.get('/roster/');
  return response.data;
};

export const getPerson = async (personId: number): Promise<Person> => {
  const response = await api.get(`/roster/${personId}`);
  return response.data;
};

export const getPersonPhotoUrl = (personId: number): string => {
  return `${API_BASE_URL}/roster/${personId}/photo`;
};

// Attendance
export const getCurrentAttendance = async (): Promise<AttendanceCurrentResponse> => {
  const response = await api.get('/attendance/current');
  return response.data;
};

export const getAttendanceHistory = async (
  personId?: number,
  eventType?: string,
  limit?: number
): Promise<AttendanceEvent[]> => {
  const params = new URLSearchParams();
  if (personId) params.append('person_id', personId.toString());
  if (eventType) params.append('event_type', eventType);
  if (limit) params.append('limit', limit.toString());

  const response = await api.get(`/attendance/history?${params}`);
  return response.data;
};

export const getTodayAttendance = async (): Promise<AttendanceEvent[]> => {
  const response = await api.get('/attendance/today');
  return response.data;
};
