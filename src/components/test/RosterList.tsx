import React from 'react';
import { Person } from '@/types/test';
import { removePerson, getPersonPhotoUrl } from '@/services/test';

interface RosterListProps {
  roster: Person[];
  loading: boolean;
  onRemove: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#16213e',
    borderRadius: '8px',
    padding: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  },
  count: {
    fontSize: '14px',
    color: '#aaa',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px',
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center' as const,
  },
  photo: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    marginBottom: '8px',
    backgroundColor: '#333',
  },
  placeholder: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
    fontSize: '24px',
    color: '#666',
  },
  name: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#fff',
    marginBottom: '4px',
  },
  date: {
    fontSize: '11px',
    color: '#666',
    marginBottom: '8px',
  },
  removeButton: {
    padding: '4px 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#7f1d1d',
    color: '#fca5a5',
    cursor: 'pointer',
    fontSize: '12px',
  },
  empty: {
    textAlign: 'center' as const,
    color: '#666',
    padding: '40px',
    fontSize: '14px',
  },
};

export const RosterList: React.FC<RosterListProps> = ({ roster, loading, onRemove }) => {
  const handleRemove = async (person: Person) => {
    if (!window.confirm(`Remove ${person.name} from the roster?`)) return;

    try {
      await removePerson(person.id);
      onRemove();
    } catch (error) {
      alert('Failed to remove person');
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading roster...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Enrolled People</h2>
        <span style={styles.count}>{roster.length} people</span>
      </div>

      {roster.length === 0 ? (
        <div style={styles.empty}>
          No one enrolled yet. Use the form above to add people.
        </div>
      ) : (
        <div style={styles.grid}>
          {roster.map((person) => (
            <div key={person.id} style={styles.card}>
              {person.photo_path ? (
                <img
                  src={getPersonPhotoUrl(person.id)}
                  alt={person.name}
                  style={styles.photo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div style={styles.placeholder}>
                  {person.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={styles.name}>{person.name}</div>
              <div style={styles.date}>
                Added {new Date(person.created_at).toLocaleDateString()}
              </div>
              <button
                style={styles.removeButton}
                onClick={() => handleRemove(person)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
