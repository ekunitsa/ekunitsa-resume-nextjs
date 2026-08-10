import { defineConfig, devices } from '@playwright/test';
import { loadTestDatabaseConfig } from './tests/setup/utils/test-database';

loadTestDatabaseConfig();

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: false,
    globalSetup: './tests/setup/global-setup.ts',
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',
    use: {
        baseURL: 'http://127.0.0.1:3100',
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
        {
            name: 'mobile-chrome',
            use: {
                ...devices['Pixel 7'],
            },
        },
    ],
    webServer: {
        command: 'npm run dev -- --port 3100',
        url: 'http://127.0.0.1:3100',
        reuseExistingServer: false,
    },
});
