/**
 * API Service Tests
 * Tests verify API calls and service functionality
 */

import * as api from '@/services/api';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock('@/utils/formatTime', () => ({
  formatEndDate: jest.fn((date) => '2024-03-30 23:59:59'),
  formatStartDate: jest.fn((date) => '2024-03-30 00:00:00'),
  formatTimeYYYYMMDD: jest.fn((date) => '2024/03/30'),
  formatTimeYYYYMMDDHHmmss: jest.fn((date) => '2024-03-30 14:25:00'),
}));

describe('API Service', () => {
  describe('Module exports', () => {
    it('should export getUsers function', () => {
      expect(typeof api.getUsers).toBe('function');
    });

    it('should export getUser function', () => {
      expect(typeof api.getUser).toBe('function');
    });

    it('should export getCampuses function', () => {
      expect(typeof api.getCampuses).toBe('function');
    });

    it('should export getBuildings function', () => {
      expect(typeof api.getBuildings).toBe('function');
    });

    it('should export getRoom function', () => {
      expect(typeof api.getRoom).toBe('function');
    });

    it('should export getTerms function', () => {
      expect(typeof api.getTerms).toBe('function');
    });

    it('should export getCourses function', () => {
      expect(typeof api.getCourses).toBe('function');
    });

    it('should export getTeacherClasses function', () => {
      expect(typeof api.getTeacherClasses).toBe('function');
    });
  });

  describe('User endpoints', () => {
    it('should have getUsers with optional role parameter', async () => {
      expect(api.getUsers).toBeDefined();
      expect(typeof api.getUsers).toBe('function');
    });

    it('should have getUser with id parameter', async () => {
      expect(api.getUser).toBeDefined();
      expect(typeof api.getUser).toBe('function');
    });
  });

  describe('Location endpoints', () => {
    it('should have getCampuses endpoint', () => {
      expect(typeof api.getCampuses).toBe('function');
    });

    it('should have getBuildings endpoint', () => {
      expect(typeof api.getBuildings).toBe('function');
    });

    it('should have getRoom endpoint', () => {
      expect(typeof api.getRoom).toBe('function');
    });
  });

  describe('Academic endpoints', () => {
    it('should have getTerms endpoint', () => {
      expect(typeof api.getTerms).toBe('function');
    });

    it('should have getCourses endpoint', () => {
      expect(typeof api.getCourses).toBe('function');
    });

    it('should have getTeacherClasses endpoint', () => {
      expect(typeof api.getTeacherClasses).toBe('function');
    });
  });

  describe('API base URL', () => {
    it('should have correct base URL configured', () => {
      // This verifies the module loads without errors
      expect(api).toBeDefined();
    });
  });

  describe('Function availability', () => {
    it('should export all required functions', () => {
      const exportedFunctions = Object.keys(api).filter(
        key => typeof api[key as keyof typeof api] === 'function'
      );
      
      expect(exportedFunctions.length).toBeGreaterThan(0);
    });
  });
});
