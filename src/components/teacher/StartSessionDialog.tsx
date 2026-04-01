'use client'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, SelectChangeEvent, Select, Snackbar, SnackbarOrigin } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NumberField from '@/utils/Numberfield';
import { formatTimeYYYYMMDD, formatTimeYYYYMMDDHHmmss12Hrs } from '@/utils/formatTime';
import "@/assets/styles/form.css";
import "@/assets/styles/start-session-dialog.css";
import { useCampuses } from '@/hooks/useCampus';
import { useRooms } from '@/hooks/useRoom';
import { useCourses } from '@/hooks/useCourse';
import { useBuildings } from '@/hooks/useBuilding';
import { useCurrentTerm } from '@/hooks/useTerm';
import { useWebSocket } from '@/hooks/useWebSocketUpdated';
import { createSession, endSession } from '@/services/api';
import { useTeacherClasses } from '@/hooks/useTeacherClasses';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { ScheduleEventDialogProps, State } from '@/types/types';
import { getStoredUser } from '@/utils/authStub';
import { setActiveSession, clearActiveSession } from '@/utils/activeSession';

export function StartSessionDialog({ openDialog, selectedEvent, setOpenDialog, currentSchedule, setSnackbar }: ScheduleEventDialogProps) {
    const user = getStoredUser();
    const teacher_id = user?.id || '';
    const [course_id, setCourse] = useState('');
    const [duration, setDuration] = useState(3);
    const [campus_id, setCampus] = useState('');
    const [room_id, setRoom] = useState('');
    const [selectedRoom, setselectedRoom] = useState<any>(null);
    const [building_id, setBuilding] = useState('');
    const [cameratype, setCameraType] = useState('your_camera');
    const [currentClass, setCurrentClass] = useState(null);
    const [class_id, setClassID] = useState('');
    const [session, setSession] = useState<any>(null);
    const [session_id, setSessionID] = useState('');
    const { today } = useMemo(() => {
        const today = new Date();
        return { today };
    }, []);
    
    const [selectedCourseDate, setSelectedCourseDate] = useState<Dayjs | null>(dayjs(new Date()));

    const {
        isConnected,
        lastFrame,
        lastUpdate,
        error,
        connect,
        disconnect
    } = useWebSocket()
    const { currentTerm, loading: currentScheduleLoading, refetch: refetchCurrentTerm } = useCurrentTerm();
    let term_id: string = currentTerm?.id;
    const { campuses, loading: campusesLoading, refetch: refetchCampuses } = useCampuses();
    const { buildings, loading: buildingsLoading, refetch: refetchBuildings } = useBuildings(campus_id, building_id);
    const { rooms, loading: roomsLoading, refetch: refetchRoom } = useRooms(campus_id, building_id, room_id);

    const { courses: courses, loading: courseLoading, refetch: refetchCourses } = useCourses(term_id, '', teacher_id);

    const { schedule, loading: scheduleLoading, refetch: refetchSchedule, error: loadScheduleError } = useTeacherClasses(teacher_id, selectedCourseDate?.toDate() || today, selectedCourseDate?.toDate() || today);

    useEffect(() => {
        if (!selectedCourseDate) return;
        refetchSchedule();
    }, [selectedCourseDate]);

    useEffect(() => {
        if (!currentTerm) return;
        refetchCourses();
    }, [currentTerm]);

    useEffect(() => {
        if (!selectedEvent) return;
        setCourse(selectedEvent.course_id)
        setCampus(selectedEvent.campus_id)
        setBuilding(selectedEvent.building_id)
        setRoom(selectedEvent.room_id)
        setClassID(selectedEvent.class_id)
        // setselectedRoom(selectedEvent.room_id)
    }, [selectedEvent]);

    useEffect(() => {
        if (!campus_id) return;
        refetchBuildings();
        if (!currentClass) {
            setBuilding('');
            setRoom('');
        }
    }, [campus_id]);

    useEffect(() => {
        if (!building_id) return;
        refetchRoom();
        if (!currentClass) {
            setRoom('');
        }
    }, [building_id]);

    // const today = new Date()

    useEffect(() => {
        if (!course_id) return;
        let currentClass = currentSchedule.filter((item: any) =>
            item.course_id === course_id &&
            item.start <= today &&
            item.end >= today &&
            item.start.toDateString() === today.toDateString()
        )[0]
        if (currentClass) {
            setCampus(currentClass.campus_id)
            setBuilding(currentClass.building_id)
            setRoom(currentClass.room_id)
            let selectedRoom = rooms.filter((item: any) => item.id == currentClass.room_id)[0]
            setselectedRoom(selectedRoom)
            setClassID(currentClass.class_id)
        }
        setCurrentClass(currentClass);
    }, [course_id]);


    const handleCourseChange = (event: SelectChangeEvent) => {
        setCourse(event.target.value);
        setCampus('');  
        setBuilding('');
        setRoom('');
    };
    const handleCameraTypeChange = (event: SelectChangeEvent) => {
        setCameraType(event.target.value);
    }
    const handleCampusChange = (event: SelectChangeEvent) => {
        setBuilding('');
        setRoom('');
        setCampus(event.target.value);
    }
    const handleBuildingChange = (event: SelectChangeEvent) => {
        setBuilding(event.target.value);
        setRoom('');
    }
    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value);
        let selectedRoom = rooms.filter((item: any) => item.id == event.target.value)[0]
        setselectedRoom(selectedRoom)
    }
    const handleClassChange = (event: SelectChangeEvent) => {
        setClassID(event.target.value)
    }

    const handleEndSession = async () => {
        if (session_id) {
            try {
                await endSession(session_id);
            } catch (err) {
                console.error('Failed to end session:', err);
            }
        }
        clearActiveSession();
        disconnect();
    }

    const createNewSession = async () => {
        if (!course_id || !campus_id || !building_id || !room_id || !cameratype) {
            alert('Please fill in all required fields');
            return;
        }

        const start_time = today;
        const end_time = new Date(start_time)
        end_time.setMinutes(start_time.getMinutes() + duration)
        createSession(class_id, teacher_id, room_id, start_time, end_time).then(
            res => {
                setSession(res)
                setSessionID(res.id)
                setClassID(res.class_id)
                setActiveSession({ session_id: res.id, class_id: res.class_id, duration, start_time: new Date().toISOString() });
                setSnackbar({
                    open: true,
                    message: "Connecting to Server",
                    duration: duration * 60 * 1000
                });
                connect(res.id, res.class_id, duration, () => { endSession(res.id); clearActiveSession(); });
            }
        )

        setOpenDialog();
    }

    useEffect(() => {
        if (isConnected) {
            setSnackbar({
                open: true,
                message: "Taking Attendance",
                duration: duration * 60 * 1000
            });
        } else {
            setSnackbar({
                open: false,
                message: 'Attendance has been recorded',
                duration: 3000
            });
        }
    }, [isConnected])


    return (
        <>
            <Dialog open={openDialog} onClose={setOpenDialog}>
                <DialogTitle>Start Attendance Session</DialogTitle>

                <DialogContent dividers>
                    <>
                        {selectedEvent != null ?
                            (<div className='info-div'>
                                <Typography>
                                    <b className='form-lbl'>Date:</b> {formatTimeYYYYMMDD(today)}
                                </Typography>
                                <Typography>
                                    <b className='form-lbl'>Time:</b> {selectedEvent.start.toLocaleTimeString("en-US", { timeStyle: "short" })} - {selectedEvent.end.toLocaleTimeString("en-US", { timeStyle: "short" })}
                                </Typography>
                            </div>) :
                            (<div className='form-group'>
                                <div className='form-item'>
                                    <b className='form-lbl'>Date: </b>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={selectedCourseDate}
                                            onChange={(newValue) => setSelectedCourseDate(newValue)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className='form-item'>
                                    <b className='form-lbl'>Class: </b>
                                    <FormControl className='start-session-form form-container'>
                                        <Select
                                            value={class_id}
                                            onChange={handleClassChange}
                                            size="small"
                                            disabled={scheduleLoading}
                                        >
                                            {schedule.map((aClass: any, index: number) => {
                                                return (
                                                    <MenuItem key={aClass.class_id} value={aClass.class_id}>{new Date(aClass.start_time).toLocaleTimeString("en-US", { timeStyle: "short" })} - {new Date(aClass.end_time).toLocaleTimeString("en-US", { timeStyle: "short" })}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>)
                        }
                        <div className='form-group'>
                            <div className='form-item'>
                                <b className='form-lbl'>Course: </b>
                                <FormControl className='start-session-form form-container'>
                                    <Select
                                        value={course_id}
                                        onChange={handleCourseChange}
                                        size="small"
                                        disabled={courseLoading}

                                    >
                                        {courses.map((course: any, index: number) => {
                                            return (
                                                <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='form-item'>
                                <b className='form-lbl'>Duration(min):</b>
                                <NumberField
                                    min={1}
                                    max={240}
                                    defaultValue={3}
                                    size="small"
                                    onValueChange={(value) => {
                                        setDuration(value ? value : 3)
                                    }}

                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='form-item'>
                                <b className='form-lbl'>Campus: </b>
                                <FormControl className='start-session-form form-container'>
                                    <Select
                                        value={campus_id}
                                        onChange={handleCampusChange}
                                        size="small"
                                        disabled={campusesLoading}
                                    >
                                        {campuses.map((campus: any, index: number) => {
                                            return (
                                                <MenuItem value={campus.id}>{campus.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='form-item'>
                                <b className='form-lbl'>Building: </b>
                                <FormControl className='start-session-form form-container'>
                                    <Select
                                        value={building_id}
                                        onChange={handleBuildingChange}
                                        size="small"
                                        disabled={buildingsLoading || (campus_id == null || campus_id == '')}
                                    >
                                        {buildings.map((building: any, index: number) => {
                                            return (
                                                <MenuItem value={building.id}>{building.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='form-item'>
                                <b className='form-lbl'>Room: </b>
                                <FormControl className='start-session-form form-container'>
                                    <Select
                                        value={room_id}
                                        onChange={handleRoomChange}
                                        size="small"
                                        disabled={roomsLoading || (building_id == null || building_id == '')}
                                    >
                                        {rooms.map((room: any, index: number) => {
                                            return (
                                                <MenuItem value={room.id}>{room.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='form-item'>

                                <b className='form-lbl'>Camera: </b>
                                <Select
                                    value={cameratype}
                                    onChange={handleCameraTypeChange}
                                    size="small"
                                >
                                    <MenuItem value={'your_camera'}>Your camera</MenuItem>
                                    <MenuItem value={'room_camera'} disabled={selectedRoom == null || selectedRoom.camera_connection == null || selectedRoom.camera_connection == ''}>Room Camera</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </>
                </DialogContent>

                <DialogActions>
                    <Button className='secondary-btn' onClick={setOpenDialog}>Close</Button>
                    {isConnected ? (
                        <Button variant="contained" color="error" onClick={handleEndSession}>End Session</Button>
                    ) : (
                        <Button onClick={createNewSession}>Start</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default StartSessionDialog;