'use client'

import { Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Fragment } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttendanceRecord from "./AttendanceRecord";
import { useTeacherCourseTerm } from "@/hooks/useTeacherClasses";
import { getAttendanceRecords, getSessions } from "@/services/api";
import { formatTimeYYYYMMDDHHmmss12Hrs } from "@/utils/formatTime";
import { getStoredUser } from "@/utils/authStub";

function CourseByTerm() {
    const user = getStoredUser();
    const teacher_id = user?.id || '';
    const [expandedCourseTerm, setExpandedCourseTerm] = useState<string | null>(null);
    const [expandedCourseAttendanceHis, setExpandedCourseAttendanceHis] = useState<string | null>(null);

    const [courseAttendanceRecordAccordions, setCourseAttendanceRecordAccordions] = useState<Record<string, any[]>>({});
    const [courseAttendanceRecord, setCourseAttendanceRecord] = useState<Record<string, any[]>>({});

    const [loadingCourseAttendanceHis, setLoadingCourseAttendanceHis] = useState<string | null>(null);
    const [loadingCourseAttendanceDetail, setLoadingCourseAtendanceDetail] = useState<string | null>(null);
    const loadAttendanceSessions = async (topId: string, course_id: string) => {
        setLoadingCourseAttendanceHis(topId);

        const data = await getSessions(course_id);

        setCourseAttendanceRecordAccordions((prev) => ({ ...prev, [topId]: data }));
        setLoadingCourseAttendanceHis(null);
    };
    const loadCourseAttendanceRecords = async (childId: string) => {
        setLoadingCourseAtendanceDetail(childId);

        const data = await getAttendanceRecords(childId)

        setCourseAttendanceRecord((prev) => ({ ...prev, [childId]: data }));
        setLoadingCourseAtendanceDetail(null);
    };

    const { courses: courses, loading: courseLoading } = useTeacherCourseTerm(teacher_id);
    const courseandTermSections: any = courses;
    return (
        <Fragment>
            <div>
                <div>
                    {courseLoading && <CircularProgress size={24} />}
                    {!courseLoading && courseandTermSections.length === 0 && (
                        <Typography sx={{ fontStyle: "italic", color: "gray" }}>
                            No courses are available for this teacher yet.
                        </Typography>
                    )}
                    {courseandTermSections.map((section: any) => {
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
                                {!loadingCourseAttendanceHis && courseAttendanceRecordAccordions[section.id]?.length ? (
                                    courseAttendanceRecordAccordions[section.id].map((child: any) => (
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
                                                {!loadingCourseAttendanceDetail && !!courseAttendanceRecord[child.id]?.length && (
                                                    <AttendanceRecord records={courseAttendanceRecord[child.id]} />
                                                )}
                                                {!loadingCourseAttendanceDetail && courseAttendanceRecord[child.id] && courseAttendanceRecord[child.id].length === 0 && (
                                                    <Typography sx={{ fontStyle: "italic", color: "gray" }}>
                                                        No students are enrolled for this session.
                                                    </Typography>
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                ) : (
                                    <Typography sx={{ fontStyle: "italic", color: "gray" }}>
                                        No attendance sessions are available for this course.
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
