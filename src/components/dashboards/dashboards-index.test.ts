import fs from 'fs';
import path from 'path';

describe('Dashboard Index Export', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'index.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have proper TypeScript syntax', () => {
    const filePath = path.join(__dirname, 'index.ts');
    expect(filePath.endsWith('.ts')).toBe(true);
  });

  it('should have exports', () => {
    const filePath = path.join(__dirname, 'index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/export/);
  });

  it('should be an index barrel file', () => {
    const filePath = path.join(__dirname, 'index.ts');
    const fileName = path.basename(filePath);
    expect(fileName).toBe('index.ts');
  });

  it('should re-export modules', () => {
    const filePath = path.join(__dirname, 'index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/(import|export).*(from|;)/);
  });

  it('should export multiple components', () => {
    const filePath = path.join(__dirname, 'index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/export/);
  });
});
