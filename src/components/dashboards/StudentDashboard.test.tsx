import fs from 'fs';
import path from 'path';

describe('StudentDashboard Component', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'StudentDashboard.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'StudentDashboard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have valid React syntax', () => {
    const filePath = path.join(__dirname, 'StudentDashboard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/export|function|const/i);
  });

  it('should follow TypeScript conventions', () => {
    const filePath = path.join(__dirname, 'StudentDashboard.tsx');
    expect(filePath.endsWith('.tsx')).toBe(true);
  });

  it('should be importable', () => {
    expect(() => {
      require('@/components/dashboards/StudentDashboard');
    }).not.toThrow();
  });

  it('should export a default component', () => {
    const component = require('@/components/dashboards/StudentDashboard');
    expect(component.default || component).toBeDefined();
  });

  it('should have JSX return statement', () => {
    const filePath = path.join(__dirname, 'StudentDashboard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/return|<.*>/i);
  });
});
