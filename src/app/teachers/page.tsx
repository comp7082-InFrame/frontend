'use client'

import { Suspense, useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import AdminTeachers from "@/components/admin/AdminTeachers";
import { getStoredRole } from "@/utils/authStub";
import "@/assets/styles/page.css";

function TeachersPageContent() {
  const [isReady, setIsReady] = useState(false);
  const role = getStoredRole();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (!role || role !== "admin") {
    return null;
  }

  return (
    <div className={styles.page}>
      <DashboardHeader />
      <div className="container-wrapper">
        <div className="container-div">
          <Sidenav role={role as "admin"} />
          <div className="content-wrapper">
            <div className="content-div">
              <AdminTeachers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeachersPage() {
  return (
    <Suspense fallback={null}>
      <TeachersPageContent />
    </Suspense>
  );
}
