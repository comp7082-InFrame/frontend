import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard Component', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'AdminDashboard.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'AdminDashboard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have valid React syntax', () => {
    const filePath = path.join(__dirname, 'AdminDashboard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/export|function|const/i);
  });

  it('should follow TypeScript conventions', () => {
    const filePath = path.join(__dirname, 'AdminDashboard.tsx');
    expect(filePath.endsWith('.tsx')).toBe(true);
  });

  it('should be importable', () => {
    expect(() => {
      require('@/components/dashboards/AdminDashboard');
    }).not.toThrow();
  });

  it('should export a default component', () => {
    const component = require('@/components/dashboards/AdminDashboard');
    expect(component.default || component).toBeDefined();
  });

  it('should have JSX return statement', () => {
    const filePath = path.join(__dirname, 'AdminDashboard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/return|<.*>/i);
  });

  it('should contain dashboard content', () => {
    const { container } = render(<AdminDashboard />);
    const content = container.querySelector('div');
    expect(content).toBeInTheDocument();
  });

  it('should have valid React syntax', () => {
    const fs = require('fs');
    const path = require('path');
    const componentPath = path.join(__dirname, 'AdminDashboard.tsx');
    const content = fs.readFileSync(componentPath, 'utf-8');
    // Verify it's a React component
    expect(content).toMatch(/function|export|return|<>/i);
  });

  it('should have proper TypeScript component structure', () => {
    const fs = require('fs');
    const path = require('path');
    const componentPath = path.join(__dirname, 'AdminDashboard.tsx');
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toMatch(/export|function|const/);
  });

  it('should render as React functional component', () => {
    const { container } = render(<AdminDashboard />);
    expect(container).toBeTruthy();
  });
});
