// tests/app.spec.ts
import { test, expect } from '@playwright/test'

test('correct ttile tab loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Repair Shop');

});
