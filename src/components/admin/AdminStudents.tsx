'use client'

import type { CSSProperties } from "react";
import DashboardHeader from "@/components/header";
import Sidenav from "@/components/sidenav";
import "@/assets/styles/page.css";
import { useCourses } from "@/hooks/useCourse";
import { useCurrentTerm } from "@/hooks/useTerm";
import { createStudent, getStudents } from "@/services/api";
import { AdminStudent } from "@/types/admin";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

type CourseOption = {
  id: string;
  name: string;
};

const layoutCard: CSSProperties = {
  background: '#fff',
  border: '1px solid #d6dde5',
  borderRadius: '18px',
  padding: '24px',
  display: 'grid',
  gap: '18px',
};

const emptyStudentForm = {
  student_number: '',
  first_name: '',
  last_name: '',
  email: '',
  course_ids: [] as string[],
  photo: null as File | null,
};

export default function StudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyStudentForm);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const { currentTerm } = useCurrentTerm();
  const termId = currentTerm?.id ?? '';
  const { courses } = useCourses(termId, '') as { courses: CourseOption[] };

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
      setError(null);
    } catch {
      setError('Failed to load students. Check that the backend is running and connected to the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void loadStudents();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadStudents]);

  const submitStudent = async () => {
    if (!form.photo) {
      setError('A student photo is required');
      return;
    }

    try {
      setSubmitting(true);
      const created = await createStudent({
        student_number: form.student_number,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        course_ids: form.course_ids,
        photo: form.photo,
      });
      setStudents((current) => [...current, created].sort((a, b) =>
        `${a.last_name} ${a.first_name}`.localeCompare(`${b.last_name} ${b.first_name}`)
      ));
      setSnackbar('Student created');
      setOpen(false);
      setForm(emptyStudentForm);
      setError(null);
    } catch {
      setError('Failed to create student. Verify the backend is running and that classes are available.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCourseChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      course_ids: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f6fa' }}>
      <DashboardHeader />
      <div className="container-wrapper">
        <div className="container-div">
          <Sidenav role="admin" />
          <div className="content-wrapper">
            <div className="content-div">
              <section style={layoutCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <h2 style={{ color: '#1f2937', fontSize: '28px' }}>Students</h2>
                    <p style={{ color: '#4b5563', maxWidth: '720px' }}>
                      This table shows every student globally. The status column reflects
                      whether the backend currently considers that student visible on the live camera.
                    </p>
                  </div>
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    Add Student
                  </Button>
                </div>

                {error && <Alert severity="error">{error}</Alert>}

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student ID</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Classes</TableCell>
                        <TableCell>Face</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!loading && students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.student_number ?? 'Unassigned'}</TableCell>
                          <TableCell>{student.first_name}</TableCell>
                          <TableCell>{student.last_name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={student.current_seen ? 'Currently seen' : 'Not seen'}
                              color={student.current_seen ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{student.course_ids.length}</TableCell>
                          <TableCell>
                            <Chip
                              label={student.face_registered ? 'Registered' : 'Missing'}
                              color={student.face_registered ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      {!loading && students.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7}>No students found.</TableCell>
                        </TableRow>
                      )}
                      {loading && (
                        <TableRow>
                          <TableCell colSpan={7}>Loading students...</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add student</DialogTitle>
        <DialogContent style={{ display: 'grid', gap: '16px', paddingTop: '12px' }}>
          <TextField
            label="Student ID"
            value={form.student_number}
            onChange={(event) => setForm((current) => ({ ...current, student_number: event.target.value }))}
          />
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
            <TextField
              label="First name"
              value={form.first_name}
              onChange={(event) => setForm((current) => ({ ...current, first_name: event.target.value }))}
            />
            <TextField
              label="Last name"
              value={form.last_name}
              onChange={(event) => setForm((current) => ({ ...current, last_name: event.target.value }))}
            />
          </Box>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <FormControl>
            <InputLabel id="course-select-label">Classes</InputLabel>
            <Select<string[]>
              labelId="course-select-label"
              multiple
              value={form.course_ids}
              onChange={handleCourseChange}
              input={<OutlinedInput label="Classes" />}
              disabled={courses.length === 0}
              renderValue={(selected) =>
                courses
                  .filter((course) => selected.includes(course.id))
                  .map((course) => course.name)
                  .join(', ')
              }
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {courses.length === 0 && (
            <Alert severity="info">
              No classes are available yet. Make sure the backend is running and the current term has courses.
            </Alert>
          )}
          <Button variant="outlined" component="label">
            {form.photo ? `Photo selected: ${form.photo.name}` : 'Upload student photo'}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setForm((current) => ({ ...current, photo: file }));
              }}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submitStudent} disabled={submitting}>
            {submitting ? 'Creating...' : 'Create student'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
      />
    </div>
  );
}
