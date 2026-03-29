'use client'

import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import "@/assets/styles/teacher-dashboard.css";
import "@/assets/styles/scheduler.css";
import "@/assets/styles/page.css";

export default function TeacherDashboardPage() {
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const handleListItemClick = (index: number) => {
  //   setSelectedIndex(index);
  // };

  return (
    <div className={styles.page}>
      <DashboardHeader />
      <div className="container-wrapper">
        <div className="container-div">
          <Sidenav role={'teacher'} />
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
