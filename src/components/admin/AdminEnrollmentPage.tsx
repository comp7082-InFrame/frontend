'use client'

import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { submitAdminEnrollment } from "@/services/api";

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        maxWidth: "980px",
        margin: "0 auto",
        paddingBottom: "48px",
    },
    header: {
        marginBottom: "24px",
    },
    title: {
        color: "var(--primary-text-color)",
        fontSize: "32px",
        fontWeight: 700,
        marginBottom: "8px",
    },
    subtitle: {
        color: "#667085",
        fontSize: "15px",
        lineHeight: 1.5,
    },
    panel: {
        backgroundColor: "#fff",
        border: "1px solid #d0d5dd",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 10px 30px rgba(16, 24, 40, 0.06)",
    },
    panelTitle: {
        color: "var(--primary-text-color)",
        fontSize: "24px",
        fontWeight: 700,
        marginBottom: "8px",
    },
    panelSubtitle: {
        color: "#667085",
        fontSize: "14px",
        marginBottom: "24px",
    },
    form: {
        display: "grid",
        gap: "20px",
    },
    twoColumn: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
    },
    field: {
        display: "grid",
        gap: "8px",
    },
    label: {
        color: "var(--primary-text-color)",
        fontSize: "14px",
        fontWeight: 600,
    },
    input: {
        border: "1px solid #98a2b3",
        borderRadius: "10px",
        padding: "12px 14px",
        fontSize: "15px",
        color: "var(--primary-text-color)",
        backgroundColor: "#fff",
    },
    uploadBox: {
        border: "1px solid #98a2b3",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        flexWrap: "wrap",
        backgroundColor: "#fcfcfd",
    },
    hiddenInput: {
        display: "none",
    },
    chooseButton: {
        border: "none",
        borderRadius: "8px",
        padding: "10px 16px",
        backgroundColor: "#a6c5e1",
        color: "#23313b",
        fontWeight: 600,
        cursor: "pointer",
    },
    helper: {
        color: "#475467",
        fontSize: "14px",
        lineHeight: 1.4,
    },
    fileName: {
        color: "var(--primary-text-color)",
        fontSize: "14px",
        fontWeight: 500,
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        marginTop: "8px",
    },
    secondaryButton: {
        border: "1px solid #98a2b3",
        borderRadius: "10px",
        padding: "12px 18px",
        backgroundColor: "#fff",
        color: "var(--primary-text-color)",
        fontWeight: 600,
        cursor: "pointer",
    },
    primaryButton: {
        border: "none",
        borderRadius: "10px",
        padding: "12px 18px",
        backgroundColor: "var(--primary-btn-bg-color)",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
    },
    message: {
        borderRadius: "10px",
        padding: "14px 16px",
        fontSize: "14px",
    },
    success: {
        backgroundColor: "#ecfdf3",
        color: "#027a48",
        border: "1px solid #abefc6",
    },
    error: {
        backgroundColor: "#fef3f2",
        color: "#b42318",
        border: "1px solid #fecdca",
    },
};

type Message = {
    kind: "success" | "error";
    text: string;
} | null;

const initialForm = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    studentNumber: "",
};

export default function AdminEnrollmentPage() {
    const [form, setForm] = useState(initialForm);
    const [photo, setPhoto] = useState<File | null>(null);
    const [governmentIdPhoto, setGovernmentIdPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const governmentInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setForm(initialForm);
        setPhoto(null);
        setGovernmentIdPhoto(null);
        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
        if (governmentInputRef.current) {
            governmentInputRef.current.value = "";
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);

        if (!form.firstName.trim() || !form.lastName.trim() || !form.studentNumber.trim() || !photo) {
            setMessage({ kind: "error", text: "First name, last name, student ID, and the enrollment photo are required." });
            return;
        }

        setLoading(true);
        try {
            const result = await submitAdminEnrollment({
                first_name: form.firstName.trim(),
                last_name: form.lastName.trim(),
                student_number: form.studentNumber.trim(),
                date_of_birth: form.dateOfBirth,
                photo,
                government_id_photo: governmentIdPhoto,
            });
            setMessage({
                kind: "success",
                text: `Enrolled ${result.name} for recognition.`,
            });
            resetForm();
        } catch (error: unknown) {
            const detail = axios.isAxiosError(error)
                ? error.response?.data?.detail || "Unable to enroll this user right now."
                : "Unable to enroll this user right now.";
            setMessage({ kind: "error", text: detail });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Admin</h1>
                <p style={styles.subtitle}>
                    Upload a student photo to enroll face recognition from the new admin workflow.
                </p>
            </div>

            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Update Your Photo</h2>
                <p style={styles.panelSubtitle}>
                    The government ID upload is visible for the workflow but is not processed yet.
                </p>

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.twoColumn}>
                        <label style={styles.field}>
                            <span style={styles.label}>First name</span>
                            <input
                                style={styles.input}
                                value={form.firstName}
                                onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                            />
                        </label>
                        <label style={styles.field}>
                            <span style={styles.label}>Last name</span>
                            <input
                                style={styles.input}
                                value={form.lastName}
                                onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                            />
                        </label>
                    </div>

                    <div style={styles.twoColumn}>
                        <label style={styles.field}>
                            <span style={styles.label}>DOB</span>
                            <input
                                type="date"
                                style={styles.input}
                                value={form.dateOfBirth}
                                onChange={(event) => setForm((current) => ({ ...current, dateOfBirth: event.target.value }))}
                            />
                        </label>
                        <label style={styles.field}>
                            <span style={styles.label}>Student ID</span>
                            <input
                                style={styles.input}
                                value={form.studentNumber}
                                onChange={(event) => setForm((current) => ({ ...current, studentNumber: event.target.value }))}
                            />
                        </label>
                    </div>

                    <div style={styles.field}>
                        <span style={styles.label}>Upload your photo</span>
                        <div style={styles.uploadBox}>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                style={styles.hiddenInput}
                                onChange={(event) => setPhoto(event.target.files?.[0] || null)}
                            />
                            <button
                                type="button"
                                style={styles.chooseButton}
                                onClick={() => photoInputRef.current?.click()}
                            >
                                Choose File
                            </button>
                            <span style={styles.fileName}>{photo?.name || "No file selected"}</span>
                            <span style={styles.helper}>Accepted jpg, jpeg, png. Max file size guidance: 2MB.</span>
                        </div>
                    </div>

                    <div style={styles.field}>
                        <span style={styles.label}>Upload your government Paper Photo</span>
                        <div style={styles.uploadBox}>
                            <input
                                ref={governmentInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                style={styles.hiddenInput}
                                onChange={(event) => setGovernmentIdPhoto(event.target.files?.[0] || null)}
                            />
                            <button
                                type="button"
                                style={styles.chooseButton}
                                onClick={() => governmentInputRef.current?.click()}
                            >
                                Choose File
                            </button>
                            <span style={styles.fileName}>{governmentIdPhoto?.name || "No file selected"}</span>
                            <span style={styles.helper}>
                                Accepted jpg, jpeg, png. It can be your ID or passport with your photo.
                            </span>
                        </div>
                    </div>

                    {message && (
                        <div
                            style={{
                                ...styles.message,
                                ...(message.kind === "success" ? styles.success : styles.error),
                            }}
                        >
                            {message.text}
                        </div>
                    )}

                    <div style={styles.footer}>
                        <button type="button" style={styles.secondaryButton} onClick={resetForm} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.primaryButton} disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
