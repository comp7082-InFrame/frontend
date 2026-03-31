/**
 * Layout tests - Verifies RootLayout component structure
 * 
 * Tests check the source code rather than rendering due to 
 * Material-UI theming complexity in Jest environment.
 */

describe('RootLayout', () => {
  it('should export RootLayout as default', () => {
    expect(() => {
      require('@/app/layout');
    }).not.toThrow();
  });

  it('should be a valid React component function', () => {
    const RootLayout = require('@/app/layout').default;
    expect(typeof RootLayout).toBe('function');
  });

  it('should have proper use client directive', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain("'use client'");
  });

  it('should import Material-UI components', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('ThemeProvider');
    expect(content).toContain('CssBaseline');
  });

  it('should import theme', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('theme');
  });

  it('should have globals.css import', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('globals.css');
  });

  it('should render HTML element with lang attribute', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('lang="en"');
  });

  it('should include favicon link', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('favicon.svg');
  });

  it('should include Roboto font', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('Roboto');
    expect(content).toContain('fonts.googleapis.com');
  });

  it('should render children in body', () => {
    const fs = require('fs');
    const path = require('path');
    const layoutPath = path.join(__dirname, 'layout.tsx');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    expect(content).toContain('{children}');
  });
});
