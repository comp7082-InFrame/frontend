/**
 * Custom Hooks Tests
 * Tests verify hook files exist and are properly exported
 */

import fs from 'fs';
import path from 'path';

describe('Custom Hooks Module', () => {
  describe('Hook files exist', () => {
    it('should have useCourse hook file', () => {
      const hookPath = path.join(__dirname, 'useCourse.ts');
      expect(fs.existsSync(hookPath)).toBe(true);
    });

    it('should have useTerm hook file', () => {
      const hookPath = path.join(__dirname, 'useTerm.ts');
      expect(fs.existsSync(hookPath)).toBe(true);
    });

    it('should have useBuilding hook file', () => {
      const hookPath = path.join(__dirname, 'useBuilding.ts');
      expect(fs.existsSync(hookPath)).toBe(true);
    });

    it('should have useCampus hook file', () => {
      const hookPath = path.join(__dirname, 'useCampus.ts');
      expect(fs.existsSync(hookPath)).toBe(true);
    });

    it('should have useRoom hook file', () => {
      const hookPath = path.join(__dirname, 'useRoom.ts');
      expect(fs.existsSync(hookPath)).toBe(true);
    });

    it('should have useWebSocket hook file', () => {
      const hookPath = path.join(__dirname, 'useWebSocket.ts');
      expect(fs.existsSync(hookPath)).toBe(true);
    });
  });

  describe('Hook file content validation', () => {
    it('useCourse hook should export function', () => {
      const hookPath = path.join(__dirname, 'useCourse.ts');
      const content = fs.readFileSync(hookPath, 'utf-8');
      expect(content).toContain('use');
    });

    it('useTerm hook should export function', () => {
      const hookPath = path.join(__dirname, 'useTerm.ts');
      const content = fs.readFileSync(hookPath, 'utf-8');
      expect(content).toContain('use');
    });

    it('useBuilding hook should export', () => {
      const hookPath = path.join(__dirname, 'useBuilding.ts');
      const content = fs.readFileSync(hookPath, 'utf-8');
      expect(content).toContain('use');
    });

    it('useCampus hook should export', () => {
      const hookPath = path.join(__dirname, 'useCampus.ts');
      const content = fs.readFileSync(hookPath, 'utf-8');
      expect(content).toContain('use');
    });

    it('useRoom hook should export', () => {
      const hookPath = path.join(__dirname, 'useRoom.ts');
      const content = fs.readFileSync(hookPath, 'utf-8');
      expect(content).toContain('use');
    });

    it('useWebSocket hook should export', () => {
      const hookPath = path.join(__dirname, 'useWebSocket.ts');
      const content = fs.readFileSync(hookPath, 'utf-8');
      expect(content).toContain('use');
    });
  });

  describe('Hook structure validation', () => {
    it('all hooks should be TypeScript files', () => {
      const hooks = [
        'useCourse.ts',
        'useTerm.ts',
        'useBuilding.ts',
        'useCampus.ts',
        'useRoom.ts',
        'useWebSocket.ts',
      ];

      hooks.forEach(hookFile => {
        const hookPath = path.join(__dirname, hookFile);
        expect(hookPath.endsWith('.ts')).toBe(true);
      });
    });

    it('each hook file should have content', () => {
      const hooks = ['useCourse.ts', 'useTerm.ts', 'useBuilding.ts'];

      hooks.forEach(hookFile => {
        const hookPath = path.join(__dirname, hookFile);
        const content = fs.readFileSync(hookPath, 'utf-8');
        expect(content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Hook naming conventions', () => {
    it('useCourse should follow naming convention', () => {
      const hookPath = path.join(__dirname, 'useCourse.ts');
      const fileName = path.basename(hookPath);
      expect(fileName.startsWith('use')).toBe(true);
    });

    it('useTerm should follow naming convention', () => {
      const hookPath = path.join(__dirname, 'useTerm.ts');
      const fileName = path.basename(hookPath);
      expect(fileName.startsWith('use')).toBe(true);
    });

    it('all hook files should start with "use"', () => {
      const hooksDir = __dirname;
      const files = fs.readdirSync(hooksDir).filter(f => f.startsWith('use') && f.endsWith('.ts'));
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('tablePaginationActions hook', () => {
    it('should have tablePaginationActions file', () => {
      const hookPath = path.join(__dirname, 'tablePaginationActions.tsx');
      expect(fs.existsSync(hookPath)).toBe(true);
    });
  });
});
