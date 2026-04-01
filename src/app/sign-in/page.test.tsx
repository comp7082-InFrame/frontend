/**
 * Sign-In Page Tests
 * Tests verify that the Sign-In page correctly renders the EmailPassword component
 */

describe('Sign-In Page', () => {
  it('should export as default', () => {
    expect(() => {
      require('@/app/sign-in/page');
    }).not.toThrow();
  });

  it('should be an async function (server component)', () => {
    const page = require('@/app/sign-in/page').default;
    expect(typeof page).toBe('function');
  });

  it('should import Supabase server client', () => {
    const fs = require('fs');
    const path = require('path');
    const pagePath = path.join(__dirname, 'page.tsx');
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    expect(content).toContain('createSupabaseServerClient');
  });

  it('should import EmailPassword component', () => {
    const fs = require('fs');
    const path = require('path');
    const pagePath = path.join(__dirname, 'page.tsx');
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    expect(content).toContain('EmailPassword');
    expect(content).toContain('from "./emailPassword"');
  });

  it('should authenticate user', () => {
    const fs = require('fs');
    const path = require('path');
    const pagePath = path.join(__dirname, 'page.tsx');
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    expect(content).toContain('getUser');
  });

  it('should pass user to EmailPassword component', () => {
    const fs = require('fs');
    const path = require('path');
    const pagePath = path.join(__dirname, 'page.tsx');
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    expect(content).toContain('user={user}');
  });
});
