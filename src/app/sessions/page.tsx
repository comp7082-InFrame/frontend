import Sessions from "@/components/sessions/Sessions";

export default function DashboardPage() {
  // const role = session.user.role
  let role = "teacher";

  switch (role) {
    case "teacher":
      return <Sessions />
    default:
      return null
  }
}