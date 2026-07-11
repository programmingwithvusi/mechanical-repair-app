// tests/app.spec.ts
import { test, expect } from '@playwright/test'

test.describe('navigation', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('/');
    });

    test('logging page loads', async ({ page }) => {
        // await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1')).toContainText('Repair Shop');
        await expect(page.getByRole('link', { name: /Log in to get started/ })).toHaveText('Log in to get started');
        await page.waitForLoadState('networkidle');
        await page.click('text=Log in to get started');
        await page.waitForLoadState('networkidle');
        // await page.getByLabel('username').fill('Admin');
        // await page.getByLabel('password').fill('1234');

        await page.fill('#username', 'Admin');
        await page.fill('#password', '1234');
        // await page.waitForLoadState('networkidle');
        await page.click('text=Login');
        // await expect(page.getByRole('form', { name: /Repair Shop Login/ })).toHaveText('Repair Shop Login');

        //await expect(page.locator('h2')).toHaveText('Repair Shop Login');


    });
});
