'use client'

import { useEffect, useMemo, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { getActiveSession, clearActiveSession } from '@/utils/activeSession';
import { Chip } from '@mui/material';
import "@/assets/styles/page.css";

const shellStyle = {
  minHeight: '100vh',
  background: '#f3f6fa',
  display: 'flex',
  flexDirection: 'column' as const,
  padding: '20px',
};

const cardStyle = {
  background: '#fff',
  border: '1px solid #d6dde5',
  borderRadius: '18px',
  padding: '24px',
  display: 'flex',
  gap: '18px',
  flex: 1,
  maxWidth: '1400px',
  margin: '0 auto',
  width: '100%',
};

export default function TeacherCameraPage() {
  const [isReady, setIsReady] = useState(false);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [sessionExpired, setSessionExpired] = useState(false);

  const { isConnected, lastFrame, error, connect, disconnect } = useWebSocket();

  // Hydration guard
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Load active session and validate
  useEffect(() => {
    if (!isReady) return;

    const session = getActiveSession();
    if (!session) {
      setActiveSession(null);
      return;
    }

    // Check if session has expired
    const endMs = new Date(session.start_time).getTime() + session.duration * 60 * 1000;
    if (Date.now() > endMs) {
      clearActiveSession();
      setActiveSession(null);
      setSessionExpired(true);
      return;
    }

    setActiveSession(session);
    setSessionExpired(false);
  }, [isReady]);

  // Auto-connect when session becomes active
  useEffect(() => {
    if (activeSession && !isConnected) {
      connect();
    }

    return () => {
      // Don't disconnect here - let it run until session ends
    };
  }, [activeSession?.session_id, isConnected, connect]);

  // Timer countdown
  useEffect(() => {
    if (!activeSession) return;

    const endMs = new Date(activeSession.start_time).getTime() + activeSession.duration * 60 * 1000;

    const tick = () => {
      const remaining = Math.max(0, endMs - Date.now());
      setTimeLeft(remaining);

      if (remaining === 0) {
        disconnect();
        clearActiveSession();
        setActiveSession(null);
      }
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [activeSession?.session_id, disconnect]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isReady) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={cardStyle}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: '#1f2937', fontSize: '28px', margin: 0 }}>Live Camera</h2>
                    <Chip
                      label={isConnected && activeSession ? 'Recording' : 'No active session'}
                      color={isConnected && activeSession ? 'success' : 'default'}
                      size="medium"
                    />
                  </div>

                  {activeSession && !sessionExpired ? (
                    <>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                        Time remaining: {formatTime(timeLeft)}
                      </div>

                      <div style={{ flex: 1, display: 'flex', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                        {lastFrame?.image ? (
                          <img
                            src={`data:image/jpeg;base64,${lastFrame.image}`}
                            alt="Live camera feed"
                            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
                          />
                        ) : isConnected ? (
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db' }}>
                            Waiting for video frames...
                          </div>
                        ) : (
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db' }}>
                            Connecting to camera...
                          </div>
                        )}
                      </div>

                      {error && (
                        <div style={{ color: '#dc2626', fontSize: '14px', padding: '8px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
                          Error: {error}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', borderRadius: '12px', minHeight: '400px' }}>
                      <div style={{ textAlign: 'center', color: '#6b7280' }}>
                        <p style={{ fontSize: '16px', margin: 0 }}>No active session</p>
                        <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>Start a session from the Sessions page to view live camera feed</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Faces sidebar */}
                {lastFrame?.faces && lastFrame.faces.length > 0 && (
                  <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '600px', overflowY: 'auto' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '14px', fontWeight: '600', margin: 0, marginBottom: '8px' }}>
                      Detected Faces
                    </h3>
                    {lastFrame.faces.map((face: any, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: face.user_id ? '#f0fdf4' : '#fff1f2',
                          border: '1px solid ' + (face.user_id ? '#dcfce7' : '#ffe4e6'),
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>
                          {face.name || 'Unknown'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                          Confidence: {Math.round(face.confidence * 100)}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                          Status: {face.status || 'unknown'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
    </div>
  );
}
