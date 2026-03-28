import Sessions from "@/components/sessions/Sessions";

export default function DashboardPage() {
  // const role = session.user.role
  const role = "teacher";

  switch (role) {
    case "teacher":
      return <Sessions />
    default:
      return null
  }
}
