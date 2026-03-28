'use client'

import type { CSSProperties } from "react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Sessions from "@/components/sessions/Sessions";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminCameraPage from "@/components/admin/AdminCameraPage";
import { AppRole, getStoredRole, setStoredRole } from "@/utils/authStub";
import { useSearchParams } from "next/navigation";

const styles: Record<string, CSSProperties> = {
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
  actions: {
    display: 'grid',
    gap: '14px',
  },
  button: {
    justifyContent: 'space-between',
    padding: '16px 18px',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: 600,
  },
};

function HomeContent() {
  const [isReady, setIsReady] = useState(false);
  const [role, setRole] = useState<AppRole | null>(null);
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  useEffect(() => {
    setRole(getStoredRole());
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  if (role === 'admin') {
    return view === 'camera' ? <AdminCameraPage /> : <AdminStudents />;
  }

  if (role === 'teacher') {
    return <Sessions />;
  }

  const chooseRole = (nextRole: AppRole) => {
    setStoredRole(nextRole);
    setRole(nextRole);
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.eyebrow}>InFrame</p>
        <h1 style={styles.title}>Choose a role to enter the app.</h1>
        <p style={styles.copy}>
          Authentication is not wired yet. This placeholder routes you into the
          admin or teacher experience so the rest of the skeleton can be built
          and tested.
        </p>
        <div style={styles.actions}>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => chooseRole('admin')}
          >
            Continue as Admin
          </Button>
          <Button
            variant="outlined"
            style={{ ...styles.button, color: '#1f2937', borderColor: '#4d5d69' }}
            onClick={() => chooseRole('teacher')}
          >
            Continue as Teacher
          </Button>
        </div>
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
