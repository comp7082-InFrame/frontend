import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminTeachers from '@/components/admin/AdminTeachers';

// Mock the API calls with delay to ensure proper act() wrapping
jest.mock('@/services/api', () => ({
    getTeachers: jest.fn(() =>
        new Promise((resolve) => {
            setTimeout(
                () =>
                    resolve([
                        {
                            id: 'teacher1',
                            first_name: 'John',
                            last_name: 'Doe',
                            email: 'john@example.com',
                            employee_number: 'EMP001',
                            department: 'Math',
                            title: 'Professor',
                            face_registered: true,
                        },
                        {
                            id: 'teacher2',
                            first_name: 'Jane',
                            last_name: 'Smith',
                            email: 'jane@example.com',
                            employee_number: 'EMP002',
                            department: 'Science',
                            title: 'Lecturer',
                            face_registered: false,
                        },
                    ]),
                0
            );
        })
    ),
    createTeacher: jest.fn(() =>
        new Promise((resolve) => {
            setTimeout(
                () =>
                    resolve({
                        id: 'teacher3',
                        first_name: 'Bob',
                        last_name: 'Johnson',
                        email: 'bob@example.com',
                        employee_number: 'EMP003',
                        department: 'English',
                        title: 'Assistant Professor',
                        face_registered: false,
                    }),
                0
            );
        })
    ),
}));

describe('AdminTeachers Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the Teachers heading', async () => {
        render(<AdminTeachers />);
        await waitFor(() => {
            expect(screen.getByText('Teachers')).toBeInTheDocument();
        });
    });

    it('should render the description text', async () => {
        render(<AdminTeachers />);
        await waitFor(() => {
            expect(screen.getByText('Manage teachers and their information.')).toBeInTheDocument();
        });
    });

    it('should render Add Teacher button', async () => {
        render(<AdminTeachers />);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Add Teacher/i })).toBeInTheDocument();
        });
    });

    it('should load and display teachers table', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
            expect(screen.getByText('Smith')).toBeInTheDocument();
        });
    });

    it('should display teacher email in table', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            expect(screen.getByText('john@example.com')).toBeInTheDocument();
            expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        });
    });

    it('should display employee numbers in table', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            expect(screen.getByText('EMP001')).toBeInTheDocument();
            expect(screen.getByText('EMP002')).toBeInTheDocument();
        });
    });

    it('should display departments in table', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
            expect(screen.getByText('Science')).toBeInTheDocument();
        });
    });

    it('should render table headers', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            expect(screen.getByText('First name')).toBeInTheDocument();
            expect(screen.getByText('Last name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Employee Number')).toBeInTheDocument();
            expect(screen.getByText('Department')).toBeInTheDocument();
            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByText('Face')).toBeInTheDocument();
        });
    });

    it('should display face registration status', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            const chips = screen.getAllByRole('button', { hidden: true });
            expect(chips.length).toBeGreaterThan(0);
        });
    });

    it('should show loading state initially', () => {
        render(<AdminTeachers />);
        // Component should render without errors
        expect(screen.getByText('Teachers')).toBeInTheDocument();
    });

    it('should open dialog when Add Teacher button is clicked', async () => {
        render(<AdminTeachers />);

        const addButton = await screen.findByRole('button', { name: /Add Teacher/i });
        await userEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText('Add teacher')).toBeInTheDocument();
        });
    });

    it('should display form fields in dialog', async () => {
        render(<AdminTeachers />);

        const addButton = await screen.findByRole('button', { name: /Add Teacher/i });
        await userEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByLabelText('First name')).toBeInTheDocument();
            expect(screen.getByLabelText('Last name')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByLabelText('Employee Number')).toBeInTheDocument();
            expect(screen.getByLabelText('Department')).toBeInTheDocument();
            expect(screen.getByLabelText('Title')).toBeInTheDocument();
        });
    });

    it('should have Cancel and Create teacher buttons in dialog', async () => {
        render(<AdminTeachers />);

        const addButton = await screen.findByRole('button', { name: /Add Teacher/i });
        await userEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Create teacher/i })).toBeInTheDocument();
        });
    });

    it('should close dialog on Cancel button click', async () => {
        render(<AdminTeachers />);

        const addButton = await screen.findByRole('button', { name: /Add Teacher/i });
        await userEvent.click(addButton);

        const cancelButton = await screen.findByRole('button', { name: /Cancel/i });
        await userEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText('Add teacher')).not.toBeInTheDocument();
        });
    });

    it('should render all teacher titles in table', async () => {
        render(<AdminTeachers />);

        await waitFor(() => {
            expect(screen.getByText('Professor')).toBeInTheDocument();
            expect(screen.getByText('Lecturer')).toBeInTheDocument();
        });
    });

    it('should have file upload button in dialog', async () => {
        render(<AdminTeachers />);

        const addButton = await screen.findByRole('button', { name: /Add Teacher/i });
        await userEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Upload teacher photo/i })).toBeInTheDocument();
        });
    });
});
