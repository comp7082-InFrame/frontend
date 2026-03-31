import {
  formatTimeHHmm,
  formatTimeYYYYMMDD,
  formatStartDate,
  formatEndDate,
  formatTimeYYYYMMDDHHmmss,
  formatTimeYYYYMMDDHHmmss12Hrs,
} from '@/utils/formatTime';

describe('formatTime utilities', () => {
  // Use local time to avoid timezone issues in tests
  const testDate = new Date(2024, 2, 30, 14, 25, 0); // March 30, 2024, 14:25:00
  const testDateString = '2024-03-30T14:25:00';

  describe('formatTimeHHmm', () => {
    it('should format Date object as HH:mm', () => {
      const result = formatTimeHHmm(testDate);
      expect(result).toMatch(/\d{2}:\d{2}/);
      // Extract and check the time format
      expect(result.split(':').length).toBe(2);
    });

    it('should format date string as HH:mm', () => {
      const result = formatTimeHHmm(testDateString);
      expect(result).toMatch(/\d{2}:\d{2}/);
      // Extract and check the time format
      expect(result.split(':').length).toBe(2);
    });
  });

  describe('formatTimeYYYYMMDD', () => {
    it('should format Date object as YYYY/MM/DD', () => {
      const result = formatTimeYYYYMMDD(testDate);
      expect(result).toMatch(/\d{4}\/\d{2}\/\d{2}/);
    });

    it('should format date string as YYYY/MM/DD', () => {
      const result = formatTimeYYYYMMDD(testDateString);
      expect(result).toMatch(/\d{4}\/\d{2}\/\d{2}/);
    });
  });

  describe('formatStartDate', () => {
    it('should format date as start of day (YYYY-MM-DD 00:00:00)', () => {
      const result = formatStartDate(testDate);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} 00:00:00/);
    });

    it('should format date string as start of day', () => {
      const result = formatStartDate(testDateString);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} 00:00:00/);
    });
  });

  describe('formatEndDate', () => {
    it('should format date as end of day (YYYY-MM-DD 23:59:59)', () => {
      const result = formatEndDate(testDate);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} 23:59:59/);
    });

    it('should format date string as end of day', () => {
      const result = formatEndDate(testDateString);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} 23:59:59/);
    });
  });

  describe('formatTimeYYYYMMDDHHmmss', () => {
    it('should format Date object as YYYY-MM-DD HH:mm:ss', () => {
      const result = formatTimeYYYYMMDDHHmmss(testDate);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });

    it('should format date string as YYYY-MM-DD HH:mm:ss', () => {
      const result = formatTimeYYYYMMDDHHmmss(testDateString);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });
  });

  describe('formatTimeYYYYMMDDHHmmss12Hrs', () => {
    it('should format Date object in 12-hour format', () => {
      const result = formatTimeYYYYMMDDHHmmss12Hrs(testDate);
      expect(result).toMatch(/2024-03-30 \d{2}:\d{2}:\d{2} (AM|PM)/);
    });

    it('should format date string in 12-hour format', () => {
      const result = formatTimeYYYYMMDDHHmmss12Hrs(testDateString);
      expect(result).toMatch(/2024-03-30 \d{2}:\d{2}:\d{2} (AM|PM)/);
    });
  });
});
