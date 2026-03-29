'use client'

import type { CSSProperties } from "react";
import { createTeacher, getTeachers } from "@/services/api";
import { AdminTeacher } from "@/types/admin";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

const layoutCard: CSSProperties = {
  background: '#fff',
  border: '1px solid #d6dde5',
  borderRadius: '18px',
  padding: '24px',
  display: 'grid',
  gap: '18px',
};

const emptyTeacherForm = {
  first_name: '',
  last_name: '',
  email: '',
  employee_number: '',
  department: '',
  title: '',
  photo: null as File | null,
};

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<AdminTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyTeacherForm);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const loadTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(data);
      setError(null);
    } catch {
      setError('Failed to load teachers. Check that the backend is running and connected to the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTeachers();
  }, [loadTeachers]);

  const submitTeacher = async () => {
    if (!form.photo) {
      setError('A teacher photo is required');
      return;
    }

    try {
      setSubmitting(true);
      const created = await createTeacher({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        employee_number: form.employee_number,
        department: form.department,
        title: form.title,
        photo: form.photo,
      });
      setTeachers((current) => [...current, created].sort((a, b) =>
        `${a.last_name} ${a.first_name}`.localeCompare(`${b.last_name} ${b.first_name}`)
      ));
      setSnackbar('Teacher created');
      setOpen(false);
      setForm(emptyTeacherForm);
      setError(null);
    } catch {
      setError('Failed to create teacher. Verify the backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section style={layoutCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ display: 'grid', gap: '8px' }}>
            <h2 style={{ color: '#1f2937', fontSize: '28px' }}>Teachers</h2>
            <p style={{ color: '#4b5563', maxWidth: '720px' }}>
              Manage teachers and their information.
            </p>
          </div>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Teacher
          </Button>
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Employee Number</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Face</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.first_name}</TableCell>
                  <TableCell>{teacher.last_name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.employee_number ?? 'Unassigned'}</TableCell>
                  <TableCell>{teacher.department ?? '-'}</TableCell>
                  <TableCell>{teacher.title ?? '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={teacher.face_registered ? 'Registered' : 'Missing'}
                      color={teacher.face_registered ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {!loading && teachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>No teachers found.</TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell colSpan={7}>Loading teachers...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add teacher</DialogTitle>
        <DialogContent style={{ display: 'grid', gap: '16px', paddingTop: '12px' }}>
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
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <TextField
            label="Employee Number"
            value={form.employee_number}
            onChange={(event) => setForm((current) => ({ ...current, employee_number: event.target.value }))}
          />
          <TextField
            label="Department"
            value={form.department}
            onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
          />
          <TextField
            label="Title"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
          <Button variant="outlined" component="label">
            {form.photo ? `Photo selected: ${form.photo.name}` : 'Upload teacher photo'}
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
          <Button onClick={submitTeacher} disabled={submitting}>
            {submitting ? 'Creating...' : 'Create teacher'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
      />
    </>
  );
}
