import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 1,
    reporter: [['list'], ['html']],
    use: {
        baseURL: 'http://localhost:3002', // Vite default dev server
        trace: 'on-first-retry',
        video: 'on',
        //video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [

        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            use: { ...devices['Desktop Firefox'] },
            name: 'Firefox',
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        port: 3002,
        reuseExistingServer: !process.env.CI,
    },
});
