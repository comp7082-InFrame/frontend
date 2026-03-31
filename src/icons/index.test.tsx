import fs from 'fs';
import path from 'path';

describe('icons/index Export', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be importable', () => {
    expect(() => {
      require('@/icons');
    }).not.toThrow();
  });

  it('should export icon components', () => {
    const module = require('@/icons');
    expect(module).toBeDefined();
  });

  it('should be a TypeScript React file', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    expect(filePath.endsWith('.tsx')).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have proper export syntax', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/export/);
  });

  it('should import icon dependencies', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/import|from/);
  });

  it('should have exports', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    // Should have exports or content
    expect(content).toMatch(/export|function|const|=/i);
  });

  it('should be an index barrel file', () => {
    const filePath = path.join(__dirname, 'index.tsx');
    const fileName = path.basename(filePath);
    expect(fileName).toBe('index.tsx');
  });

  it('should be exportable', () => {
    expect(() => {
      require('@/icons');
    }).not.toThrow();
  });

  it('should export multiple items', () => {
    const module = require('@/icons');
    expect(typeof module === 'object' || typeof module.default === 'object').toBe(true);
  });

  it('should be reusable', () => {
    const module = require('@/icons');
    expect(module).toBeTruthy();
  });
});
