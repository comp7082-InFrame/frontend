import React from 'react';
import { StreamFrame } from '@/types/test';

interface VideoStreamProps {
  frame: StreamFrame | null;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#16213e',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  videoContainer: {
    position: 'relative' as const,
    backgroundColor: '#000',
    borderRadius: '4px',
    overflow: 'hidden',
    aspectRatio: '4/3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
  },
  placeholder: {
    color: '#666',
    fontSize: '14px',
  },
  faceCount: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#aaa',
  },
};

export const VideoStream: React.FC<VideoStreamProps> = ({
  frame,
  isConnected,
  onConnect,
  onDisconnect,
}) => {
  const faceCount = frame?.faces?.length || 0;
  const recognizedCount = frame?.faces?.filter(f => f.person_id !== null).length || 0;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Live Camera Feed</h2>
        <div style={styles.status}>
          <span
            style={{
              ...styles.statusDot,
              backgroundColor: isConnected ? '#4ade80' : '#f87171',
            }}
          />
          <span style={{ color: isConnected ? '#4ade80' : '#f87171', fontSize: '14px' }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <button
            style={{
              ...styles.button,
              backgroundColor: isConnected ? '#ef4444' : '#22c55e',
              color: '#fff',
            }}
            onClick={isConnected ? onDisconnect : onConnect}
          >
            {isConnected ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      <div style={styles.videoContainer}>
        {frame?.image ? (
          <img
            src={`data:image/jpeg;base64,${frame.image}`}
            alt="Camera feed"
            style={styles.video}
          />
        ) : (
          <span style={styles.placeholder}>
            {isConnected ? 'Waiting for camera...' : 'Click Start to begin'}
          </span>
        )}
      </div>

      {isConnected && (
        <div style={styles.faceCount}>
          Detected: {faceCount} face{faceCount !== 1 ? 's' : ''} |
          Recognized: {recognizedCount}
        </div>
      )}
    </div>
  );
};
