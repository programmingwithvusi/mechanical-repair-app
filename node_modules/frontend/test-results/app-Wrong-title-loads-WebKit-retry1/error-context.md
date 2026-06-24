# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Wrong title loads
- Location: tests\app.spec.ts:12:1

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected: "Repair App"
Received: "Repair Shop"
Timeout:  5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    13 × unexpected value "Repair Shop"

```

```yaml
- navigation:
  - text: 🔧 Repair Shop
  - link "Vehicles":
    - /url: /vehicles
  - link "Repair Jobs":
    - /url: /repair-jobs
- banner:
  - heading "Welcome to Mechanical Repair" [level=1]
- main:
  - heading "Vehicles" [level=1]
  - button "+ Add Vehicle"
  - heading "2019 Toyota Camry" [level=3]
  - text: "ID: 1"
  - button "Delete"
  - heading "2021 Ford F-150" [level=3]
  - text: "ID: 2"
  - button "Delete"
  - heading "2018 Honda Civic" [level=3]
  - text: "ID: 3"
  - button "Delete"
  - heading "2020 Chevrolet Tahoe" [level=3]
  - text: "ID: 4"
  - button "Delete"
  - heading "2022 BMW 3 Series" [level=3]
  - text: "ID: 5"
  - button "Delete"
  - heading "2010 Toyota Camry" [level=3]
  - text: "ID: 6"
  - button "Delete"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | const url = "http://localhost:3002";
  4  | 
  5  | test('homepage loads', async ({ page }) => {
  6  |     await page.goto(url);
  7  |     // console.log(page)
  8  |     await expect(page).toHaveTitle("Repair Shop");
  9  | });
  10 | 
  11 | 
  12 | test('Wrong title loads', async ({ page }) => {
  13 |     await page.goto(url);
> 14 |     await expect(page).toHaveTitle("Repair App");
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  15 | });
```