import AdminDashboard from "@/components/dashboards/AdminDashboard";
import TeacherDashboard from "@/components/dashboards/TeacherDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";

export default function DashboardPage() {
  // const role = session.user.role
  let role = "teacher";

  switch (role) {
    case "admin":
      return <AdminDashboard />

    case "teacher":
      return <TeacherDashboard />

    case "student":
      return <StudentDashboard />

    default:
      return null
  }
}