'use client'

import type { CSSProperties } from "react";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import "@/assets/styles/page.css";
import { useWebSocket } from "@/hooks/useWebSocket";

const shellStyle: CSSProperties = {
  minHeight: '100vh',
  background: '#f3f6fa',
};

const cardStyle: CSSProperties = {
  background: '#fff',
  border: '1px solid #d6dde5',
  borderRadius: '18px',
  padding: '24px',
};

export default function CameraPage() {
  const { connect, disconnect, isConnected, lastFrame, error } = useWebSocket();
  const faces = lastFrame?.faces ?? [];

  return (
    <div style={shellStyle}>
      <DashboardHeader />
      <div className="container-wrapper">
        <div className="container-div">
          <Sidenav role="admin" />
          <div className="content-wrapper">
            <div className="content-div">
              <section style={{ ...cardStyle, display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <h2 style={{ color: '#1f2937', fontSize: '28px' }}>Cameras</h2>
                  </div>
                  <button
                    onClick={isConnected ? disconnect : connect}
                    style={{
                      padding: '12px 18px',
                      borderRadius: '12px',
                      border: 'none',
                      background: isConnected ? '#b42318' : '#1d4ed8',
                      color: '#fff',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    type="button"
                  >
                    {isConnected ? 'Stop camera' : 'Start camera'}
                  </button>
                </div>

                {error && (
                  <div style={{ color: '#b42318', fontWeight: 600 }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(260px, 1fr)', gap: '20px' }}>
                  <div style={{ background: '#111827', borderRadius: '16px', minHeight: '420px', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
                    {lastFrame?.image ? (
                      <img
                        src={`data:image/jpeg;base64,${lastFrame.image}`}
                        alt="Live camera feed"
                        style={{ width: '100%', display: 'block' }}
                      />
                    ) : (
                      <span style={{ color: '#d1d5db' }}>
                        {isConnected ? 'Waiting for video frames...' : 'Start the camera to view the live feed'}
                      </span>
                    )}
                  </div>

                  <div style={{ ...cardStyle, padding: '20px', display: 'grid', gap: '12px', alignContent: 'start' }}>
                    <div>
                      <h3 style={{ color: '#1f2937', marginBottom: '6px' }}>Currently in frame</h3>
                      <p style={{ color: '#6b7280', fontSize: '14px' }}>
                        {faces.length} detected face{faces.length === 1 ? '' : 's'}
                      </p>
                    </div>

                    {faces.length === 0 && (
                      <div style={{ color: '#6b7280' }}>No faces detected in the current frame.</div>
                    )}

                    {faces.map((face, index) => (
                      <div
                        key={`${face.user_id ?? 'unknown'}-${index}`}
                        style={{
                          border: '1px solid #d6dde5',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          background: face.user_id ? '#f0fdf4' : '#fff1f2',
                        }}
                      >
                        <div style={{ color: '#1f2937', fontWeight: 600 }}>
                          {face.name ?? 'Unknown'}
                        </div>
                        <div style={{ color: '#4b5563', fontSize: '14px' }}>
                          {face.user_id ? `Confidence ${Math.round(face.confidence * 100)}%` : 'Not registered in the system'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
