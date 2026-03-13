'use client'

import styles from "@/app/page.module.css";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import "@/assets/styles/teacher-dashboard.css";
import "@/assets/styles/scheduler.css";
import "@/assets/styles/page.css";
import { CourseByTerm } from "./CourseByTerm";
import { Button, Snackbar } from "@mui/material";
import '@/assets/styles/session.css';
import { useMemo, useState } from "react";
import StartSessionDialog from "../teacher/StartSessionDialog";
import { useTeacherClasses } from "@/hooks/useTeacherClasses";


const teacher_id = 'a877bfce-3300-476e-b529-109ad2ce2826'; // TODO update this later with login

export default function Sessions() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);


    const { monday, sunday } = useMemo(() => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1);
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - today.getDay() + 7);
        return { monday, sunday };
    }, []);
    const { schedule, loading: scheduleLoading, refetch: refetchSchedule, error: loadScheduleError } = useTeacherClasses(teacher_id, monday, sunday);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        duration: 30000
    });

    return (
        <div className={styles.page}>
            <DashboardHeader />
            <div className="container-wrapper">
                <div className="container-div">
                    <Sidenav role={'teacher'} />
                    <div className="content-wrapper">
                        <div className="content-div">
                            <div className="top-group-btn">
                                <Button variant="contained" className="primary-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(null);
                                        setOpenDialog(true);
                                    }}
                                >
                                    Start attendance
                                </Button>
                            </div>
                            <CourseByTerm />
                        </div>
                    </div>
                </div>
            </div>
            <StartSessionDialog
                openDialog={openDialog}
                selectedEvent={selectedEvent}
                setOpenDialog={() => setOpenDialog(false)}
                currentSchedule={schedule}
                setSnackbar={setSnackbar}
            />
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => { setSnackbar({ ...snackbar, open: false })}}
                autoHideDuration={snackbar.duration}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </div>

    );
}
