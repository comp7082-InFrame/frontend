'use client'
import React, { useState } from 'react';
import css from '@/app/page.module.css';
import { AttendancePanel } from '@/components/test/AttendancePanel';
import { EnrollmentForm } from '@/components/test/EnrollmentForm';
import { RosterList } from '@/components/test/RosterList';
import { VideoStream } from '@/components/test/VideoStream';
import { useAttendance } from '@/hooks/useAttendance';
import { useRoster } from '@/hooks/useRoster';
import { useWebSocket } from '@/hooks/useWebSocket';

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    padding: '20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    color: '#fff',
  },
  inactiveTab: {
    backgroundColor: '#16213e',
    color: '#aaa',
  },
  leftColumn: {
    minWidth: 0,
  },
  rightColumn: {
    minWidth: 0,
  },
};

type Tab = 'monitor' | 'enroll';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('monitor');
  const { isConnected, lastFrame, lastUpdate, error, connect, disconnect } = useWebSocket();
  const { attendance, loading: attendanceLoading } = useAttendance(lastUpdate);
  const { roster, loading: rosterLoading, refetch: refetchRoster } = useRoster();

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Attendance System</h1>
          <p style={styles.subtitle}>Real-time facial recognition attendance tracking</p>
        </header>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'monitor' ? styles.activeTab : styles.inactiveTab),
            }}
            onClick={() => setActiveTab('monitor')}
            type="button"
          >
            Live Monitor
          </button>

          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'enroll' ? styles.activeTab : styles.inactiveTab),
            }}
            onClick={() => setActiveTab('enroll')}
            type="button"
          >
            Enrollment
          </button>
        </div>

        {activeTab === 'monitor' ? (
          <div className={css.mainContent}>
            <div style={styles.leftColumn}>
              <VideoStream
                frame={lastFrame}
                isConnected={isConnected}
                onConnect={connect}
                onDisconnect={disconnect}
              />

              {error && (
                <div style={{ color: '#f87171', marginBottom: '20px' }}>
                  Error: {error}
                </div>
              )}
            </div>

            <div style={styles.rightColumn}>
              <AttendancePanel
                attendance={attendance}
                lastUpdate={lastUpdate}
                loading={attendanceLoading}
              />
            </div>
          </div>
        ) : (
          <div>
            <EnrollmentForm onEnrollSuccess={refetchRoster} />
            <RosterList roster={roster} loading={rosterLoading} onRemove={refetchRoster} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
