'use client'

import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import "@/assets/styles/teacher-dashboard.css";
import "@/assets/styles/scheduler.css";
import "@/assets/styles/page.css";
import { CourseByTerm } from "./CourseByTerm";
import '@/assets/styles/session.css';
import { Typography } from "@mui/material";

export default function Sessions() {
    return (
        <div className={styles.page}>
            <DashboardHeader />
            <div className="container-wrapper">
                <div className="container-div">
                    <Sidenav role={'teacher'} />
                    <div className="content-wrapper">
                        <div className="content-div">
                            <Typography sx={{ mb: 2, color: "text.secondary" }}>
                                Each session shows the full roster. Students marked present were recognized at least once during that class window.
                            </Typography>
                            <CourseByTerm />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
