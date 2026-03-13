import { enrollPerson } from '@/services/test';
import React, { useState, useRef } from 'react';

interface EnrollmentFormProps {
  onEnrollSuccess: () => void;
}

const user_id= '511a0802-e567-40bc-b653-c6840a060851'; // Temporary use

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#16213e',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    fontSize: '12px',
    color: '#aaa',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    fontSize: '14px',
    minWidth: '200px',
  },
  fileInput: {
    display: 'none',
  },
  fileButton: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
  submitButton: {
    padding: '8px 24px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
  },
  preview: {
    marginTop: '12px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  previewImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover' as const,
    borderRadius: '4px',
  },
  message: {
    marginTop: '12px',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  error: {
    backgroundColor: '#7f1d1d',
    color: '#fca5a5',
  },
  success: {
    backgroundColor: '#14532d',
    color: '#86efac',
  },
};

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onEnrollSuccess }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !photo) {
      setMessage({ type: 'error', text: 'Please provide both name and photo' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await enrollPerson(name.trim(), photo, user_id);
      setMessage({ type: 'success', text: `Successfully enrolled ${name}` });
      setName('');
      setPhoto(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onEnrollSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to enroll person';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Enroll New Person</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={styles.fileInput}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={styles.fileButton}
          >
            {photo ? photo.name : 'Choose Photo'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.submitButton,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Enrolling...' : 'Enroll'}
        </button>
      </form>

      {preview && (
        <div style={styles.preview}>
          <img src={preview} alt="Preview" style={styles.previewImage} />
          <span style={{ color: '#aaa', fontSize: '14px' }}>Preview</span>
        </div>
      )}

      {message && (
        <div
          style={{
            ...styles.message,
            ...(message.type === 'error' ? styles.error : styles.success),
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};
