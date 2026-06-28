// tests/app.spec.ts
import { test, expect } from '@playwright/test'


test('correct ttile tab loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Repair Shop');

});

test('user can add a repair job', async ({ page }) => {
    await page.goto('/'); // wait for API calls to complete
    await page.goto('http://localhost:3002/repair-jobs');
    await page.waitForLoadState('networkidle')
    //await page.waitForLoadState('networkidle');  // wait for API calls to complete
    await page.waitForSelector('text=+ Add Repair Job', { state: 'visible', timeout: 60000 });
    // wait for button text to be visible
    //await page.getByRole('button', { name: '+ Add Repair Job' }).click();
    // Using regex to ignore exact spacing
    await page.locator('text=/.*Add Repair Job.*/').click();

});
/*
test('repair job tab loads', async ({ page }) => {
    await page.goto('/repair-jobs');
    await page.waitForLoadState('networkidle');
   // await expect(page).toHaveTitle("Repair App");
     await expect(page.locator('h1')).toContainText('Vehicle Repairs');
});
*/