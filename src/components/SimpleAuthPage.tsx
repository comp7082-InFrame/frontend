"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import DashboardHeader from "./header";
import styles from "@/app/page.module.css";

type SimpleAuthPageProps = {
  children: ReactNode;
};

export function SimpleAuthPage({
  children,
}: SimpleAuthPageProps) {
  return (
    <div className={styles.page}>
      <DashboardHeader />

      <div
      style={{ paddingTop:  "50px", width: "100%"}}
      >{children}</div>
    </div>
  );
}
