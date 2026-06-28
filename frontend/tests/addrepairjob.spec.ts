import { test, expect } from '@playwright/test';

test('user can add a repair job', async ({ page }) => {
    await page.goto('/repair-jobs');
    await page.waitForSelector('text=+ Add Repair Job', { state: 'visible' }); // wait for button text to be visible
    await page.click('text=+ Add Repair Job');
    await page.fill('#vehicleId', '5');
    await page.fill('#description', 'Change spark plugs');
    await page.fill('#cost', '450');
    await page.click('text=Save Repair Job');

    await expect(page.locator('text=Change Spark plugs').first()).toBeVisible(); // Since we hitting mutiples of the same text "Change spark plugs" fiest() picks the newly created 
});
