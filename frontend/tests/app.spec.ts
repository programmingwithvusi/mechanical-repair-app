// tests/app.spec.ts
import { test, expect } from '@playwright/test'

//const url = 'http://localhost:3002';

/*
test.beforeEach(async ({ page }) => {
    await page.route('/api/vehicles', route => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
            { id: 1, make: 'Toyota', model: 'Camry' }
        ])
    }));

    await page.route('/api/repair-jobs', route => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
    }));
});

test('correct title tab loads', async ({ page }) => {
    await page.goto('/vehicles');
    await expect(page).toHaveTitle('Repair Shop');
    await expect(page.locator('h1')).toContainText('Vehicle Repairs');
});
*/

test('correct ttile tab loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // await page.goto('/'); // ← client-side navigation now works
    await expect(page).toHaveTitle('Repair Shop');
    //await expect(page.locator('h1')).toContainText('Vehicle Repairs');
});
/*
test('Incorrect title tab loads', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle("Repair App");
});
*/