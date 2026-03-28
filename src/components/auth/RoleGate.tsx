'use client'

import { Button } from "@mui/material";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AppRole, getStoredRole } from "@/utils/authStub";

const styles: Record<string, CSSProperties> = {
  shell: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: "linear-gradient(135deg, #eef4ff 0%, #d9e6f5 48%, #f9fafb 100%)",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.92)",
    border: "1px solid rgba(56, 57, 59, 0.1)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 24px 60px rgba(56, 57, 59, 0.12)",
  },
  title: {
    fontSize: "28px",
    lineHeight: 1.1,
    marginBottom: "12px",
    color: "#1f2937",
  },
  copy: {
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#4b5563",
    marginBottom: "24px",
  },
};

type RoleGateProps = {
  allowedRole: AppRole;
  children: ReactNode;
};

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const [isReady, setIsReady] = useState(false);
  const [role, setRole] = useState<AppRole | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setRole(getStoredRole());
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!isReady) {
    return null;
  }

  if (role !== allowedRole) {
    return (
      <main style={styles.shell}>
        <section style={styles.card}>
          <h1 style={styles.title}>Choose the correct role first.</h1>
          <p style={styles.copy}>
            This page is only available from the {allowedRole} view in the placeholder auth flow.
          </p>
          <Button variant="contained" href="/">
            Return to role picker
          </Button>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
