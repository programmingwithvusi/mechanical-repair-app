// tests/app.spec.ts
import { test, expect } from '@playwright/test'


test('correct ttile tab loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Repair Shop');

});

test('user can add a repair job', async ({ page }) => {
    await page.goto('/repair-jobs');
    await page.waitForLoadState('networkidle');  // wait for API calls to complete
    await page.waitForSelector('text=+ Add Repair Job', { state: 'visible' }); // wait for button text to be visible
    await page.click('text=+ Add Repair Job');
});
/*
test('repair job tab loads', async ({ page }) => {
    await page.goto('/repair-jobs');
    await page.waitForLoadState('networkidle');
   // await expect(page).toHaveTitle("Repair App");
     await expect(page.locator('h1')).toContainText('Vehicle Repairs');
});
*/