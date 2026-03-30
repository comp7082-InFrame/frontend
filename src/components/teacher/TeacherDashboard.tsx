'use client'

import { formatTimeYYYYMMDD } from "@/utils/formatTime";
import { Scheduler } from "@aldabil/react-scheduler";
import { Button, Snackbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import StartSessionDialog from "./StartSessionDialog";
import { useTeacherClasses } from "@/hooks/useTeacherClasses";
import { getStoredUser } from "@/utils/authStub";

import "@/assets/styles/teacher-dashboard.css";
import "@/assets/styles/scheduler.css";

function TeacherDashboard() {
    const user = getStoredUser();
    const teacher_id = user?.id || 'a877bfce-3300-476e-b529-109ad2ce2826';

    const customHeader = (date: any) => {
        const day = new Date(date.day);
        const dow = day.toLocaleDateString("en-US", { weekday: "short" });
        return (
            <div style={{ textAlign: "center" }}>
                {dow}
            </div>
        );
    }
    const weekConfig: any = {
        startHour: 6,
        endHour: 22,
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        step: 60,
        navigation: false,
        headRenderer: customHeader
    };
    const { monday, sunday } = useMemo(() => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1);
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - today.getDay() + 7);
        return { monday, sunday };
    }, []);
    const { schedule, loading: scheduleLoading, refetch: refetchSchedule, error: loadScheduleError } = useTeacherClasses(teacher_id, monday, sunday);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        duration: 30000
    });
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        console.log("Snackbar state changed:", snackbar);
    }, [snackbar]);

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(timer);
    }, []);


    if (!isReady) {
        return null;
    }

    return (
        <Fragment>
            <div className="teacher-dashboard">
                <div>
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
                <div className="weekly-schedule">
                    <div className="week-information">
                        <Typography >
                            Week of {formatTimeYYYYMMDD(monday)} - {formatTimeYYYYMMDD(sunday)}
                        </Typography>
                    </div>
                    <div className="schedule-div">
                        <Scheduler
                            key={scheduleLoading ? "loading" : "loaded"}
                            alwaysShowAgendaDays={true}
                            events={schedule}
                            week={weekConfig}
                            agenda={false}
                            navigation={false}
                            disableViewNavigator={true}
                            hourFormat={"12"}
                            editable={false}
                            deletable={true}
                            draggable={false}
                            loading={scheduleLoading}
                            // disableViewer={true}
                            eventRenderer={({ event, ...props }) => {
                                return (
                                    <Tooltip title={
                                        <div className="event-tooltip">
                                            <div className="event-div">
                                                <span className="event-time">
                                                    {event.start.toLocaleTimeString("en-US", { timeStyle: "short" })} - {event.end.toLocaleTimeString("en-US", { timeStyle: "short" })}
                                                </span>
                                                {event.course_name != null && (
                                                    <b className="event-course">
                                                        Course: {event.course_name}
                                                    </b>
                                                )}
                                                <b className="event-location">
                                                    Room: {event.room_name}
                                                </b>
                                            </div>
                                        </div>
                                    }>
                                        <div className="event-div"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEvent(event);
                                                setOpenDialog(true);
                                            }}
                                        >
                                            <span className="event-time">
                                                {event.start.toLocaleTimeString("en-US", { timeStyle: "short" })} - {event.end.toLocaleTimeString("en-US", { timeStyle: "short" })}
                                            </span>
                                            {event.course_name != null && (
                                                <b className="event-course">
                                                    Course: {event.course_name}
                                                </b>
                                            )}
                                            <b className="event-location">
                                                Room: {event.room_name}
                                            </b>
                                        </div>
                                    </Tooltip>
                                );
                            }}
                        />
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
                onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={snackbar.duration}

            />
        </Fragment >

    )
}
export { TeacherDashboard }
export default TeacherDashboard;
