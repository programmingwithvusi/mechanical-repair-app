import { test, expect } from '@playwright/test'

const url = "http://localhost:3002";

test('correct ttile tab loads', async ({ page }) => {
    await page.goto(url);
    // console.log(page)
    await expect(page).toHaveTitle("Repair Shop");
});


test('Incorrect title tab loads', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle("Repair App");
});