'use client'

import "@/assets/styles/teacher-dashboard.css";
import "@/assets/styles/scheduler.css";
import "@/assets/styles/page.css";
import { CourseByTerm } from "./CourseByTerm";
import '@/assets/styles/session.css';
import { Typography } from "@mui/material";

export default function Sessions() {
    return (
        <>
            <Typography sx={{ mb: 2, color: "text.secondary" }}>
                Each session shows the full roster. Students marked present were recognized at least once during that class window.
            </Typography>
            <CourseByTerm />
        </>
    );
}
