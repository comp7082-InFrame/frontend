'use client'

import { Accordion, AccordionSummary, AccordionDetails, Button, Tooltip, Typography, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import { Fragment } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttendanceRecord from "./AttendanceRecord";
import { useTeacherCourseTerm } from "@/hooks/useTeacherClasses";
import { getAttendanceRecords, getSessions } from "@/services/api";
import { formatTimeYYYYMMDDHHmmss12Hrs } from "@/utils/formatTime";

const teacher_id = 'a877bfce-3300-476e-b529-109ad2ce2826'; // update this later with login

function CourseByTerm() {
    const [expandedCourseTerm, setExpandedCourseTerm] = useState<string | null>(null);
    const [expandedCourseAttendanceHis, setExpandedCourseAttendanceHis] = useState<string | null>(null);

    const [courseAttendanceRecordAccordions, setCourseAttendanceRecordAccordions] = useState<Record<string, any[]>>({});
    const [courseAttendanceRecord, setCourseAttendanceRecord] = useState<Record<string, any[]>>({});

    const [loadingCourseAttendanceHis, setLoadingCourseAttendanceHis] = useState<string | null>(null);
    const [loadingCourseAttendanceDetail, setLoadingCourseAtendanceDetail] = useState<number | null>(null);
    const loadAttendanceSessions = async (topId: string, course_id: string) => {
        setLoadingCourseAttendanceHis(topId);

        const data = await getSessions(course_id);

        setCourseAttendanceRecordAccordions((prev) => ({ ...prev, [topId]: data }));
        setLoadingCourseAttendanceHis(null);
    };
    const loadCourseAttendanceRecords = async (childId: number) => {
        setLoadingCourseAtendanceDetail(childId);

        const data = await getAttendanceRecords(childId)

        setCourseAttendanceRecord((prev) => ({ ...prev, [childId]: data }));
        setLoadingCourseAtendanceDetail(null);
    };

    const { courses: courses, loading: courseLoading, refetch: refetchCourses } = useTeacherCourseTerm(teacher_id);


    const records = [
        {
            id: "A01234567",
            firstName: "Alice",
            lastName: "Nguyen",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Brian",
            lastName: "Smith",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Chloe",
            lastName: "Tran",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Daniel",
            lastName: "Lee",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Emma",
            lastName: "Johnson",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Frank",
            lastName: "Brown",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Grace",
            lastName: "Wilson",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Henry",
            lastName: "Kim",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Isabella",
            lastName: "Martinez",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Jason",
            lastName: "Patel",
            status: "Present",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Kevin",
            lastName: "Chen",
            status: "Absent",
            attendanceRate: "100%",
        },
        {
            id: "A01234567",
            firstName: "Lily",
            lastName: "Park",
            status: "Absent",
            attendanceRate: "100%",
        },
    ];
    const courseandTermSections: any = courses;
    return (
        <Fragment>
            <div>
                <div>
                    {courseandTermSections.map((section: any, index: number) => {
                        return (<Accordion key={section.id}
                            expanded={expandedCourseTerm === section.id}
                            onChange={async (_, isExpanded) => {
                                setExpandedCourseTerm(isExpanded ? section.id : null);

                                if (isExpanded && !courseAttendanceRecordAccordions[section.id]) {
                                    await loadAttendanceSessions(section.id, section.course_id);
                                }
                            }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 600 }}>{section.title}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                {loadingCourseAttendanceHis === section.id && <CircularProgress size={20} />}
                                {!loadingCourseAttendanceHis && courseAttendanceRecordAccordions[section.id] ? (
                                    courseAttendanceRecordAccordions[section.id].map((child: any, i: number) => (
                                        <Accordion key={child.id}
                                            expanded={expandedCourseAttendanceHis === child.id}
                                            onChange={async (_, isExpanded) => {
                                                setExpandedCourseAttendanceHis(isExpanded ? child.id : null);
                                                if (isExpanded && !courseAttendanceRecord[child.id]) {
                                                    await loadCourseAttendanceRecords(child.id);
                                                }
                                            }}
                                            sx={{ ml: 2 }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography sx={{ fontWeight: 600 }}>{section.course_name} - {formatTimeYYYYMMDDHHmmss12Hrs(child.start_time)}</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails>
                                                {loadingCourseAttendanceDetail === child.id && <CircularProgress size={20} />}
                                                {!loadingCourseAttendanceDetail && courseAttendanceRecord[child.id] && (
                                                    <AttendanceRecord records={courseAttendanceRecord[child.id]} />
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                ) : (
                                    <Typography sx={{ fontStyle: "italic", color: "gray" }}>
                                        No data available
                                    </Typography>

                                )}
                            </AccordionDetails>
                        </Accordion>)
                    })}
                </div>
            </div>
        </Fragment >

    )
}
export { CourseByTerm }
