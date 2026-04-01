import { render, screen } from '@testing-library/react';
import AdminCameraPage from '@/components/admin/AdminCameraPage';

jest.mock('@/assets/styles/page.css', () => ({}));

describe('AdminCameraPage Component', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminCameraPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render a component', () => {
    const { container } = render(<AdminCameraPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should be available as export', () => {
    expect(() => {
      require('@/components/admin/AdminCameraPage');
    }).not.toThrow();
  });

  it('should be a valid React component', () => {
    const AdminCameraPageComponent = require('@/components/admin/AdminCameraPage').default;
    expect(typeof AdminCameraPageComponent).toBe('function');
  });

  it('should render without crashing with empty props', () => {
    const { container } = render(<AdminCameraPage />);
    expect(container).toBeInTheDocument();
  });

  it('should have use client directive', () => {
    const fs = require('fs');
    const path = require('path');
    const componentPath = path.join(__dirname, 'AdminCameraPage.tsx');
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain("'use client'");
  });
});
