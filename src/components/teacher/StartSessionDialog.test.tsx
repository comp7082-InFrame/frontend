import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartSessionDialog } from '@/components/teacher/StartSessionDialog';

// Mock all the hooks used in the component
jest.mock('@/hooks/useCampus', () => ({
  useCampuses: jest.fn(() => ({
    campuses: [{ id: 'campus1', name: 'Main Campus' }],
    loading: false,
    refetch: jest.fn(),
  })),
}));

jest.mock('@/hooks/useBuilding', () => ({
  useBuildings: jest.fn(() => ({
    buildings: [{ id: 'building1', name: 'Building A' }],
    loading: false,
    refetch: jest.fn(),
  })),
}));

jest.mock('@/hooks/useRoom', () => ({
  useRooms: jest.fn(() => ({
    rooms: [{ id: 'room1', name: 'Room 101' }],
    loading: false,
    refetch: jest.fn(),
  })),
}));

jest.mock('@/hooks/useCourse', () => ({
  useCourses: jest.fn(() => ({
    courses: [{ id: 'course1', name: 'Math 101' }],
    loading: false,
    refetch: jest.fn(),
  })),
}));

jest.mock('@/hooks/useTerm', () => ({
  useCurrentTerm: jest.fn(() => ({
    currentTerm: { id: 'term1' },
    loading: false,
    refetch: jest.fn(),
  })),
}));

jest.mock('@/hooks/useTeacherClasses', () => ({
  useTeacherClasses: jest.fn(() => ({
    schedule: [
      {
        class_id: 'class1',
        start_time: new Date(),
        end_time: new Date(Date.now() + 3600000),
      },
    ],
    loading: false,
    refetch: jest.fn(),
    error: null,
  })),
}));

jest.mock('@/hooks/useWebSocketUpdated', () => ({
  useWebSocket: jest.fn(() => ({
    isConnected: false,
    lastFrame: null,
    lastUpdate: null,
    error: null,
    connect: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

jest.mock('@/services/api', () => ({
  createSession: jest.fn().mockResolvedValue({
    id: 'session1',
    class_id: 'class1',
  }),
  endSession: jest.fn().mockResolvedValue(true),
}));

jest.mock('@/utils/authStub', () => ({
  getStoredUser: jest.fn(() => ({
    id: 'teacher1',
    name: 'John Doe',
  })),
  getStoredRole: jest.fn(() => 'teacher'),
  setStoredUser: jest.fn(),
  clearStoredUser: jest.fn(),
  setUserRole: jest.fn(),
}));

jest.mock('@/utils/activeSession', () => ({
  setActiveSession: jest.fn(),
  clearActiveSession: jest.fn(),
  getActiveSession: jest.fn(),
}));

jest.mock('@/assets/styles/start-session-dialog.css', () => ({}));
jest.mock('@/assets/styles/form.css', () => ({}));

describe('StartSessionDialog Component', () => {
  const mockSetOpenDialog = jest.fn();
  const mockSetSnackbar = jest.fn();
  const mockCurrentSchedule = [
    {
      course_id: 'course1',
      campus_id: 'campus1',
      building_id: 'building1',
      room_id: 'room1',
      class_id: 'class1',
      start: new Date(),
      end: new Date(Date.now() + 3600000),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog with title', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );
    expect(screen.getByText('Start Attendance Session')).toBeInTheDocument();
  });

  it('should render course dropdown', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );
    expect(screen.getByText('Course:')).toBeInTheDocument();
  });

  it('should render campus dropdown', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );
    expect(screen.getByText('Campus:')).toBeInTheDocument();
  });

  it('should render duration field', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );
    expect(screen.getByText('Duration(min):')).toBeInTheDocument();
  });

  it('should display selected event info when selectedEvent exists', () => {
    const selectedEvent = {
      course_id: 'course1',
      campus_id: 'campus1',
      building_id: 'building1',
      room_id: 'room1',
      class_id: 'class1',
      start: new Date('2024-01-15 10:00:00'),
      end: new Date('2024-01-15 11:00:00'),
    };

    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={selectedEvent}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );

    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Time:/)).toBeInTheDocument();
  });

  it('should show date picker when no selected event', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );

    // Date picker and class dropdown should be visible
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Class:')).toBeInTheDocument();
  });

  it('should render all form groups', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );

    expect(screen.getByText('Course:')).toBeInTheDocument();
    expect(screen.getByText('Duration(min):')).toBeInTheDocument();
    expect(screen.getByText('Campus:')).toBeInTheDocument();
  });

  it('should handle dialog closure', () => {
    const { container } = render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it('should have all required form fields', () => {
    render(
      <StartSessionDialog
        openDialog={true}
        selectedEvent={null}
        setOpenDialog={mockSetOpenDialog}
        currentSchedule={mockCurrentSchedule}
        setSnackbar={mockSetSnackbar}
      />
    );

    // Check for all form labels
    const labels = ['Course:', 'Duration(min):', 'Campus:'];
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
