import { Suspense } from "react";
import Sessions from "@/components/sessions/Sessions";

function SessionsPageContent() {
  // const role = session.user.role
  const role = "teacher";

  switch (role) {
    case "teacher":
      return <Sessions />
    default:
      return null
  }
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <SessionsPageContent />
    </Suspense>
  );
}
