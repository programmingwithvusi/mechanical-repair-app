import { test, expect } from '@playwright/test';

//const url = "http://localhost:3002";

test('homepage loads and shows title', async ({ page }) => {
    await page.goto("/Mechanical Repair App/i");
    await expect(page).toHaveTitle("Repair Shop");
    await expect(page.locator('h1')).toContainText('Welcome to Mechanical Repair');
});