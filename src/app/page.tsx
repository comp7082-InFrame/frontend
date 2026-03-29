'use client'

import type { CSSProperties } from "react";
import { Suspense, useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import Sessions from "@/components/sessions/Sessions";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminCameraPage from "@/components/admin/AdminCameraPage";
import { StoredUser, getStoredUser, setStoredUser, getStoredRole, clearStoredUser } from "@/utils/authStub";
import { useSearchParams } from "next/navigation";
import { getUsers } from "@/services/api";
import "@/assets/styles/page.css";

const loginStyles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: 'linear-gradient(135deg, #eef4ff 0%, #d9e6f5 48%, #f9fafb 100%)',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    background: 'rgba(255, 255, 255, 0.92)',
    border: '1px solid rgba(56, 57, 59, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 24px 60px rgba(56, 57, 59, 0.12)',
  },
  eyebrow: {
    fontSize: '12px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#4d5d69',
    marginBottom: '12px',
  },
  title: {
    fontSize: '36px',
    lineHeight: 1.05,
    color: '#1f2937',
    marginBottom: '12px',
  },
  copy: {
    fontSize: '16px',
    lineHeight: 1.5,
    color: '#4b5563',
    marginBottom: '28px',
  },
  roleSection: {
    marginBottom: '24px',
  },
  roleLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  userList: {
    display: 'grid',
    gap: '8px',
  },
  userButton: {
    padding: '12px 16px',
    border: '1px solid #d6dde5',
    borderRadius: '12px',
    background: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    ':hover': {
      background: '#f9fafb',
      borderColor: '#1f2937',
    },
  },
  userName: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#1f2937',
    margin: 0,
  },
  userEmail: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '4px 0 0 0',
  },
};

function HomeContent() {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [usersByRole, setUsersByRole] = useState<Record<string, StoredUser[]>>({});
  const [role, setRole] = useState<string | null>(() => getStoredRole());
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);

        // Group users by role
        const grouped: Record<string, StoredUser[]> = {};
        data.forEach(user => {
          const userRole = user.role && user.role.length > 0 ? user.role[0] : 'unknown';
          if (!grouped[userRole]) {
            grouped[userRole] = [];
          }
          grouped[userRole].push(user);
        });

        setUsersByRole(grouped);
        setError(null);
      } catch (err) {
        setError('Failed to load users. Please refresh the page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!isReady) {
    return null;
  }

  // If user is already logged in, show their dashboard
  if (role === 'admin') {
    const content = view === 'camera' ? <AdminCameraPage /> : <AdminStudents />;
    return (
      <div className={styles.page}>
        <DashboardHeader />
        <div className="container-wrapper">
          <div className="container-div">
            <Sidenav role="admin" />
            <div className="content-wrapper">
              <div className="content-div">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'teacher') {
    return (
      <div className={styles.page}>
        <DashboardHeader />
        <div className="container-wrapper">
          <div className="container-div">
            <Sidenav role="teacher" />
            <div className="content-wrapper">
              <div className="content-div">
                <TeacherDashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'student') {
    // TODO: Implement student dashboard
    return (
      <div style={loginStyles.page}>
        <section style={loginStyles.card}>
          <h1 style={loginStyles.title}>Student Dashboard</h1>
          <p style={loginStyles.copy}>Coming soon...</p>
          <button
            onClick={() => {
              clearStoredUser();
              window.location.href = "/";
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#1f2937',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            Back to Login
          </button>
        </section>
      </div>
    );
  }

  const selectUser = (user: StoredUser) => {
    setStoredUser(user);
    setRole(user.role && user.role.length > 0 ? user.role[0] : null);
  };

  if (loading) {
    return (
      <main style={loginStyles.page}>
        <section style={loginStyles.card}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        </section>
      </main>
    );
  }

  return (
    <main style={loginStyles.page}>
      <section style={loginStyles.card}>
        <p style={loginStyles.eyebrow}>InFrame</p>
        <h1 style={loginStyles.title}>Select your account</h1>
        {error && (
          <p style={{ ...loginStyles.copy, color: '#dc2626' }}>{error}</p>
        )}
        <p style={loginStyles.copy}>
          Choose your user account to log in.
        </p>

        {/* Admins */}
        {usersByRole['admin'] && usersByRole['admin'].length > 0 && (
          <div style={loginStyles.roleSection}>
            <p style={loginStyles.roleLabel}>Admins</p>
            <div style={loginStyles.userList}>
              {usersByRole['admin'].map(user => (
                <button
                  key={user.id}
                  style={loginStyles.userButton as any}
                  onClick={() => selectUser(user)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as any).style.background = '#f9fafb';
                    (e.currentTarget as any).style.borderColor = '#1f2937';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as any).style.background = '#fff';
                    (e.currentTarget as any).style.borderColor = '#d6dde5';
                  }}
                >
                  <p style={loginStyles.userName}>{user.first_name} {user.last_name}</p>
                  <p style={loginStyles.userEmail}>{user.email}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Teachers */}
        {usersByRole['teacher'] && usersByRole['teacher'].length > 0 && (
          <div style={loginStyles.roleSection}>
            <p style={loginStyles.roleLabel}>Teachers</p>
            <div style={loginStyles.userList}>
              {usersByRole['teacher'].map(user => (
                <button
                  key={user.id}
                  style={loginStyles.userButton as any}
                  onClick={() => selectUser(user)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as any).style.background = '#f9fafb';
                    (e.currentTarget as any).style.borderColor = '#1f2937';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as any).style.background = '#fff';
                    (e.currentTarget as any).style.borderColor = '#d6dde5';
                  }}
                >
                  <p style={loginStyles.userName}>{user.first_name} {user.last_name}</p>
                  <p style={loginStyles.userEmail}>{user.email}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Students */}
        {usersByRole['student'] && usersByRole['student'].length > 0 && (
          <div style={loginStyles.roleSection}>
            <p style={loginStyles.roleLabel}>Students</p>
            <div style={loginStyles.userList}>
              {usersByRole['student'].map(user => (
                <button
                  key={user.id}
                  style={loginStyles.userButton as any}
                  onClick={() => selectUser(user)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as any).style.background = '#f9fafb';
                    (e.currentTarget as any).style.borderColor = '#1f2937';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as any).style.background = '#fff';
                    (e.currentTarget as any).style.borderColor = '#d6dde5';
                  }}
                >
                  <p style={loginStyles.userName}>{user.first_name} {user.last_name}</p>
                  <p style={loginStyles.userEmail}>{user.email}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
