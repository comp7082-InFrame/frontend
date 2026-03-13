export interface Person {
  id: number;
  name: string;
  photo_path?: string;
  is_active: boolean;
  created_at: string;
}

export interface PersonListResponse {
  persons: Person[];
  total: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceDetection {
  person_id: number | null;
  name: string | null;
  confidence: number;
  bbox: BoundingBox;
  status: 'present' | 'entering' | 'exiting' | 'unknown';
}

export interface StreamFrame {
  type: 'frame';
  image: string;
  faces: FaceDetection[];
  timestamp: string;
}

export interface AttendanceUpdate {
  type: 'attendance_update';
  event: 'entry' | 'exit';
  person_id: number;
  name: string;
  confidence: number;
  timestamp: string;
}

export interface CurrentPresence {
  person_id: number;
  name: string;
  entered_at: string;
  last_seen: string;
}

export interface AttendanceCurrentResponse {
  present: CurrentPresence[];
  absent: { id: number; name: string }[];
  total_enrolled: number;
}

export interface AttendanceEvent {
  id: number;
  person_id: number;
  person_name: string;
  event_type: 'entry' | 'exit';
  confidence: number | null;
  timestamp: string;
}

export type WebSocketMessage = StreamFrame | AttendanceUpdate | { type: 'error'; message: string };
