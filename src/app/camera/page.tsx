'use client'

import { Suspense, useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import TeacherCameraPage from "@/components/teacher/TeacherCameraPage";
import { getStoredRole } from "@/utils/authStub";
import "@/assets/styles/page.css";

function CameraPageContent() {
  const [isReady, setIsReady] = useState(false);
  const role = getStoredRole();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (!role || role !== "teacher") {
    return null;
  }

  return (
    <div className={styles.page}>
      <DashboardHeader />
      <div className="container-wrapper">
        <div className="container-div">
          <Sidenav role={role as "admin" | "teacher" | "student"} />
          <div className="content-wrapper">
            <div className="content-div">
              <TeacherCameraPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CameraPage() {
  return (
    <Suspense fallback={null}>
      <CameraPageContent />
    </Suspense>
  );
}
