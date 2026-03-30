import { AppRole } from "@/utils/authStub";

export interface AdminStudent {
  id: string;
  student_number: string | null;
  first_name: string;
  last_name: string;
  email: string;
  course_ids: string[];
  current_seen: boolean;
  face_registered: boolean;
  photo_path: string | null;
  active: boolean;
}

export interface AdminStudentCreateInput {
  student_number: string;
  first_name: string;
  last_name: string;
  email: string;
  course_ids: string[];
  photo: File;
}

export interface AdminTeacher {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  employee_number: string | null;
  department: string | null;
  title: string | null;
  face_registered: boolean;
  photo_path: string | null;
  active: boolean;
}

export interface AdminTeacherCreateInput {
  first_name: string;
  last_name: string;
  email: string;
  employee_number: string;
  department: string;
  title: string;
  photo: File;
}

export interface SignUpUserInput {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  role: AppRole;
  student_number?: string;
  employee_number?: string;
  photo?: File;
}