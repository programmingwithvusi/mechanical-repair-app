import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 1,
    reporter: [['list'], ['html']],
    use: {
        baseURL: isCI ? 'http://localhost:3002' : 'http://localhost:4173',
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
        port: isCI ? 3002 : 4173,
        reuseExistingServer: !isCI,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});