import { defineConfig, devices } from '@playwright/test';

//const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 1,
    reporter: [['list'], ['html']],
    use: {
        baseURL: 'http://localhost:3002',
        trace: 'on-first-retry',
        video: 'on',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    webServer: {
        // In CI: serve the built dist/ via preview
        // Locally: use dev server
        command: 'npm run dev -- --host',
        port: 3002,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});