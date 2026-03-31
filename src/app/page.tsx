'use client'

import type { CSSProperties } from "react";
import { Suspense, useEffect, useState } from "react";
import { CircularProgress, Box, Button } from "@mui/material";
import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import Sessions from "@/components/sessions/Sessions";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminCameraPage from "@/components/admin/AdminCameraPage";
import { StoredUser, getStoredUser, setStoredUser, getStoredRole, clearStoredUser, AppRole, setUserRole } from "@/utils/authStub";
import { useSearchParams } from "next/navigation";
import { getUser, getUsers } from "@/services/api";
import "@/assets/styles/page.css";
import { getSupabaseBrowserClient } from "@/utils/supabase/browser-client";
import { useRouter } from 'next/navigation';
import { signOut } from "@/utils/supabase/actions";

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
  const [role, setRole] = useState<string | null>(getStoredRole());
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const supabase = getSupabaseBrowserClient();
  const [authUser, setAuthUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        if (session?.user) {
          setAuthUser(session.user);
        } else {
          try {
            const { data: actualUser, error } = await supabase.auth.getUser();
            if (error) throw error;

            setAuthUser(actualUser.user);
          } catch (err) {
            setError('Failed to load user data. Please refresh the page.');
            setAuthUser(null);
            setRole(null);
            setLoading(false);
            router.push('/sign-in');
          }

        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authUser) return; // only run if authUser is set
    const fetchUser = async () => {
      try {
        const data = await getUser(authUser.id);
        setUserData(data);
        setStoredUser(data);

        if (data?.role) {
          if (data.role.length == 1) {
            setRole(data.role[0]);
          } else if (data.role.length > 1) {

          }
        }
      } catch (err) {
        setError('Failed to load users. Please refresh the page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authUser]);

  async function handleSignOut() {
    clearStoredUser();
    setAuthUser(null);
    setUserData(null);
    setRole(null);
    await signOut()
    router.push('/sign-in');
  }
  if (!isReady) {
    return null;
  }

  // If user is already logged in, show their dashboard
  if (role === 'admin') {
    setUserRole('admin');
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
    setUserRole('teacher');
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
    setUserRole('teacher');
    return (
      <div style={loginStyles.page}>
        <section style={loginStyles.card}>
          <h1 style={loginStyles.title}>Student Dashboard</h1>
          <p style={loginStyles.copy}>Coming soon...</p>
          <button
            onClick={() => {
              handleSignOut();
              window.location.href = "/sign-in";
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

  const selectUser = (user: StoredUser, role: AppRole) => {
    setStoredUser(user);
    setRole(role);
    setUserRole(role);
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
      {userData?.role.length > 0 && (
        <section style={loginStyles.card}>
          <p style={loginStyles.eyebrow}>InFrame</p>
          <h1 style={loginStyles.title}>Select Your Role</h1>
          {error && (
            <p style={{ ...loginStyles.copy, color: '#dc2626' }}>{error}</p>
          )}
          <p style={loginStyles.copy}>
            Choose your role to start.
          </p>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            {/* Admins */}
            {userData.role.includes('admin') && (
              <button
                key={userData.id + 'admin'}
                style={loginStyles.userButton as any}
                onClick={() => selectUser(userData, 'admin')}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.background = '#f9fafb';
                  (e.currentTarget as any).style.borderColor = '#1f2937';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.background = '#fff';
                  (e.currentTarget as any).style.borderColor = '#d6dde5';
                }}
              >
                Admin
              </button>
            )}

            {/* Teachers */}
            {userData.role.includes('teacher') && (
              <button
                key={userData.id + 'teacher'}
                style={loginStyles.userButton as any}
                onClick={() => selectUser(userData, 'teacher')}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.background = '#f9fafb';
                  (e.currentTarget as any).style.borderColor = '#1f2937';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.background = '#fff';
                  (e.currentTarget as any).style.borderColor = '#d6dde5';
                }}
              >
                Teacher
              </button>
            )}

            {/* Students */}
            {userData.role.includes('student') && (
              <button
                key={userData.id + 'student'}
                style={loginStyles.userButton as any}
                onClick={() => selectUser(userData, 'student')}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.background = '#f9fafb';
                  (e.currentTarget as any).style.borderColor = '#1f2937';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.background = '#fff';
                  (e.currentTarget as any).style.borderColor = '#d6dde5';
                }}
              >
                Student
              </button>)}

          </div>
        </section>
      )}
      {userData?.role.length == 0 && (
        <section style={loginStyles.card}>
          <h3 style={loginStyles.title}>You don't have access to this page</h3>
          <p style={loginStyles.copy}>Contact Admin for access.</p>
          <Button className="secondary-btn"
            onClick={() => {
              handleSignOut();
              window.location.href = "/sign-in";
            }}
          >Logout</Button>
        </section>
      )}
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
