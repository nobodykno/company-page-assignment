import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  testMatch: '**/*.spec.ts',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  webServer: {
    command: 'pnpm --filter web dev -p 3001',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
});