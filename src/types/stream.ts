export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceDetection {
  user_id: string | null;
  name: string | null;
  confidence: number;
  bbox: BoundingBox;
  status: 'absent' | 'entering' | 'present' | 'unknown';
}

export interface StreamFrame {
  type: 'frame';
  image: string;
  faces: FaceDetection[];
  timestamp: string;
}

export interface AttendanceUpdate {
  type: 'attendance_update';
  user_id: string;
  name: string;
  confidence: number;
  timestamp: string;
}

export type WebSocketMessage =
  | StreamFrame
  | AttendanceUpdate
  | { type: 'error'; message: string };
