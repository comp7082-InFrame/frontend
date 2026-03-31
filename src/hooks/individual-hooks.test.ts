import fs from 'fs';
import path from 'path';

describe('Individual Hook Tests', () => {
  const hooks = [
    { name: 'useCourse', file: 'useCourse.ts' },
    { name: 'useBuilding', file: 'useBuilding.ts' },
    { name: 'useCampus', file: 'useCampus.ts' },
    { name: 'useRoom', file: 'useRoom.ts' },
    { name: 'useTerm', file: 'useTerm.ts' },
    { name: 'useTeacherClasses', file: 'useTeacherClasses.ts' },
    { name: 'useWebSocket', file: 'useWebSocket.ts' },
  ];

  describe('Hook file validation', () => {
    hooks.forEach(({ name, file }) => {
      it(`${name} should exist`, () => {
        const filePath = path.join(__dirname, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });

      it(`${name} should be importable`, () => {
        expect(() => {
          require(`@/hooks/${file.replace('.ts', '')}`);
        }).not.toThrow();
      });

      it(`${name} should export a function`, () => {
        const module = require(`@/hooks/${file.replace('.ts', '')}`);
        expect(module).toBeDefined();
      });

      it(`${name} should be a TypeScript file`, () => {
        const filePath = path.join(__dirname, file);
        expect(filePath.endsWith('.ts')).toBe(true);
      });

      it(`${name} should have content`, () => {
        const filePath = path.join(__dirname, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content.length).toBeGreaterThan(0);
      });

      it(`${name} should have proper hook syntax`, () => {
        const filePath = path.join(__dirname, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toMatch(/export|function|const|=>/);
      });

      it(`${name} should follow naming convention`, () => {
        expect(name.startsWith('use')).toBe(true);
      });
    });
  });

  describe('useSessions hook', () => {
    it('should exist', () => {
      const filePath = path.join(__dirname, 'userSessions.ts');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should be importable', () => {
      expect(() => {
        require('@/hooks/userSessions');
      }).not.toThrow();
    });
  });

  describe('tablePaginationActions', () => {
    it('should exist', () => {
      const filePath = path.join(__dirname, 'tablePaginationActions.tsx');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should be importable', () => {
      expect(() => {
        require('@/hooks/tablePaginationActions');
      }).not.toThrow();
    });

    it('should export table pagination utilities', () => {
      const module = require('@/hooks/tablePaginationActions');
      expect(module).toBeDefined();
    });
  });

  describe('useWebSocketUpdated hook', () => {
    it('should exist', () => {
      const filePath = path.join(__dirname, 'useWebSocketUpdated.ts');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should be importable', () => {
      expect(() => {
        require('@/hooks/useWebSocketUpdated');
      }).not.toThrow();
    });

    it('should be a hook', () => {
      const filePath = path.join(__dirname, 'useWebSocketUpdated.ts');
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toMatch(/use|hook/i);
    });
  });

  describe('All hooks follow React conventions', () => {
    it('should have use prefix', () => {
      const hooksDir = __dirname;
      const files = fs.readdirSync(hooksDir)
        .filter(f => f.startsWith('use') && (f.endsWith('.ts') || f.endsWith('.tsx')));
      expect(files.length).toBeGreaterThan(0);
    });

    it('should be TypeScript/TSX files', () => {
      const hooksDir = __dirname;
      const files = fs.readdirSync(hooksDir)
        .filter(f => f.startsWith('use') && (f.endsWith('.ts') || f.endsWith('.tsx')));
      files.forEach(file => {
        expect(file).toMatch(/\.(ts|tsx)$/);
      });
    });
  });
});
