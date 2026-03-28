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
