import { useState, useEffect, useCallback, useRef } from 'react';
import { StreamFrame, AttendanceUpdate, WebSocketMessage } from '../types';

const WS_URL = 'ws://localhost:8000/ws/stream';

interface UseWebSocketResult {
  isConnected: boolean;
  lastFrame: StreamFrame | null;
  lastUpdate: AttendanceUpdate | null;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}

export function useWebSocket(): UseWebSocketResult {
  const [isConnected, setIsConnected] = useState(false);
  const [lastFrame, setLastFrame] = useState<StreamFrame | null>(null);
  const [lastUpdate, setLastUpdate] = useState<AttendanceUpdate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        console.log('WebSocket connected');
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected');

        // Auto-reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, 3000);
      };

      ws.onerror = () => {
        setError('WebSocket connection error');
        setIsConnected(false);
      };

      ws.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);

          if (data.type === 'frame') {
            setLastFrame(data as StreamFrame);
          } else if (data.type === 'attendance_update') {
            setLastUpdate(data as AttendanceUpdate);
          } else if (data.type === 'error') {
            setError(data.message);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };
    } catch (e) {
      setError('Failed to connect to WebSocket');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    lastFrame,
    lastUpdate,
    error,
    connect,
    disconnect,
  };
}
