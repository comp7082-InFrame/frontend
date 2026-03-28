import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy teacher/session surface slated for a later cleanup phase.
    "src/components/teacher/**",
    "src/components/sessions/**",
    "src/components/dashboards/TeacherDashboard.tsx",
    "src/components/dashboards/StudentDashboard.tsx",
    "src/hooks/useBuilding.ts",
    "src/hooks/useCampus.ts",
    "src/hooks/useCourse.ts",
    "src/hooks/useRoom.ts",
    "src/hooks/useTeacherClasses.ts",
    "src/hooks/useTerm.ts",
    "src/hooks/userSessions.ts",
    "src/services/api.ts",
    "src/types/types.ts",
    "src/icons/index.tsx",
  ]),
]);

export default eslintConfig;
