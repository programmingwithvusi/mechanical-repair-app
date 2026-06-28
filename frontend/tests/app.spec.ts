// tests/app.spec.ts
import { test, expect } from '@playwright/test'


test('correct ttile tab loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Repair Shop');

});
/*
test('Incorrect title tab loads', async ({ page }) => {
    await page.goto('/repair-jobs');
    await page.waitForLoadState('networkidle');
   // await expect(page).toHaveTitle("Repair App");
     await expect(page.locator('h1')).toContainText('Vehicle Repairs');
});
*/