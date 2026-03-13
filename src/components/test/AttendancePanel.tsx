import React from 'react';
import { AttendanceCurrentResponse, AttendanceUpdate } from '../types';

interface AttendancePanelProps {
  attendance: AttendanceCurrentResponse | null;
  lastUpdate: AttendanceUpdate | null;
  loading: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  panel: {
    backgroundColor: '#16213e',
    borderRadius: '8px',
    padding: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
  },
  count: {
    fontSize: '24px',
    fontWeight: 700,
  },
  list: {
    maxHeight: '200px',
    overflowY: 'auto' as const,
  },
  item: {
    padding: '8px 12px',
    backgroundColor: '#1a1a2e',
    borderRadius: '4px',
    marginBottom: '6px',
    fontSize: '14px',
  },
  empty: {
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic' as const,
  },
  lastUpdate: {
    backgroundColor: '#16213e',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  updateEntry: {
    color: '#4ade80',
  },
  updateExit: {
    color: '#f87171',
  },
};

export const AttendancePanel: React.FC<AttendancePanelProps> = ({
  attendance,
  lastUpdate,
  loading,
}) => {
  if (loading) {
    return <div style={styles.panel}>Loading attendance...</div>;
  }

  const presentCount = attendance?.present.length || 0;
  const absentCount = attendance?.absent.length || 0;

  return (
    <>
      {lastUpdate && (
        <div style={styles.lastUpdate}>
          <span
            style={lastUpdate.event === 'entry' ? styles.updateEntry : styles.updateExit}
          >
            {lastUpdate.event === 'entry' ? 'ENTRY' : 'EXIT'}
          </span>
          {' - '}
          <strong>{lastUpdate.name}</strong>
          {' at '}
          {new Date(lastUpdate.timestamp).toLocaleTimeString()}
        </div>
      )}

      <div style={styles.container}>
        <div style={styles.panel}>
          <div style={styles.header}>
            <span style={{ ...styles.title, color: '#4ade80' }}>Present</span>
            <span style={{ ...styles.count, color: '#4ade80' }}>{presentCount}</span>
          </div>
          <div style={styles.list}>
            {attendance?.present.length ? (
              attendance.present.map((p) => (
                <div key={p.person_id} style={styles.item}>
                  {p.name}
                  <span style={{ color: '#666', marginLeft: '8px', fontSize: '12px' }}>
                    since {new Date(p.entered_at).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div style={styles.empty}>No one present</div>
            )}
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.header}>
            <span style={{ ...styles.title, color: '#f87171' }}>Absent</span>
            <span style={{ ...styles.count, color: '#f87171' }}>{absentCount}</span>
          </div>
          <div style={styles.list}>
            {attendance?.absent.length ? (
              attendance.absent.map((p) => (
                <div key={p.id} style={styles.item}>
                  {p.name}
                </div>
              ))
            ) : (
              <div style={styles.empty}>Everyone is present</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
