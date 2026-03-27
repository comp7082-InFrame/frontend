import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import AdminEnrollmentPage from "@/components/admin/AdminEnrollmentPage";
import "@/assets/styles/page.css";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <DashboardHeader title="Admin" />
      <div className="container-wrapper">
        <div className="container-div">
          <Sidenav role={'admin'} />
          <div className="content-wrapper">
            <div className="content-div">
              <AdminEnrollmentPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
