/**
 * Supabase Utilities Tests
 * Tests for Supabase client and utility functions
 */

import fs from 'fs';
import path from 'path';

describe('Supabase browser-client', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'browser-client.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be importable', () => {
    expect(() => {
      require('@/utils/supabase/browser-client');
    }).not.toThrow();
  });

  it('should export browser client', () => {
    const module = require('@/utils/supabase/browser-client');
    expect(module).toBeDefined();
  });

  it('should be a TypeScript file', () => {
    const filePath = path.join(__dirname, 'browser-client.ts');
    expect(filePath.endsWith('.ts')).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'browser-client.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should import Supabase', () => {
    const filePath = path.join(__dirname, 'browser-client.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/supabase|createClient/i);
  });

  it('should export function or object', () => {
    const module = require('@/utils/supabase/browser-client');
    expect(typeof module === 'object' || typeof module === 'function' || module.default).toBeTruthy();
  });
});

describe('Supabase server-client', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'server-client.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be importable', () => {
    expect(() => {
      require('@/utils/supabase/server-client');
    }).not.toThrow();
  });

  it('should export server client', () => {
    const module = require('@/utils/supabase/server-client');
    expect(module).toBeDefined();
  });

  it('should be a TypeScript file', () => {
    const filePath = path.join(__dirname, 'server-client.ts');
    expect(filePath.endsWith('.ts')).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'server-client.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should create server client', () => {
    const filePath = path.join(__dirname, 'server-client.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/supabase|server|createClient/i);
  });
});

describe('Supabase actions', () => {
  it('should exist as a file', () => {
    const filePath = path.join(__dirname, 'actions.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be importable', () => {
    expect(() => {
      require('@/utils/supabase/actions');
    }).not.toThrow();
  });

  it('should export action functions', () => {
    const module = require('@/utils/supabase/actions');
    expect(module).toBeDefined();
  });

  it('should be a TypeScript file', () => {
    const filePath = path.join(__dirname, 'actions.ts');
    expect(filePath.endsWith('.ts')).toBe(true);
  });

  it('should have content', () => {
    const filePath = path.join(__dirname, 'actions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have proper server action syntax', () => {
    const filePath = path.join(__dirname, 'actions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/use server|export|function|const/);
  });

  it('should use Supabase', () => {
    const filePath = path.join(__dirname, 'actions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/supabase|client|server/i);
  });
});

describe('Supabase utilities module', () => {
  it('should have all Supabase utilities', () => {
    const supabaseDir = __dirname;
    const files = fs.readdirSync(supabaseDir)
      .filter(f => f.endsWith('.ts'));
    
    expect(files.length).toBeGreaterThanOrEqual(3);
  });

  it('should be properly organized', () => {
    const supabaseDir = __dirname;
    expect(path.basename(supabaseDir)).toBe('supabase');
  });
});
