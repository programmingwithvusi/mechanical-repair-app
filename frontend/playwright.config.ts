import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 5,
    reporter: [['list'], ['html']],
    use: {
        baseURL: isCI ? 'http://localhost:4173' : 'http://localhost:3002',
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
        command: isCI ? 'npm run preview' : 'npm run dev -- --host',
        port: isCI ? 4173 : 3002,
        reuseExistingServer: !isCI,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});