import { Suspense } from "react";
import RoleGate from "@/components/auth/RoleGate";
import Sessions from "@/components/sessions/Sessions";

function SessionsPageContent() {
  return (
    <RoleGate allowedRole="teacher">
      <Sessions />
    </RoleGate>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <SessionsPageContent />
    </Suspense>
  );
}
