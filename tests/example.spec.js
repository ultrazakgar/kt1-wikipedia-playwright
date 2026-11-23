// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('Wikipedia: text check, search form, and navigation', async ({ page }) => {
  // ------------------------------------------------------------
  // STEP 1: Check for specific text on the home page
  // ------------------------------------------------------------
  await page.goto('https://www.wikipedia.org/');

  // The main heading contains "Wikipedia" (substring match).
  // Do NOT use exact: true — the accessible name is not exactly "Wikipedia".
  await expect(page.getByRole('heading', { name: 'Wikipedia' })).toBeVisible();

  // Also check for the tagline.
  await expect(page.getByText('The Free Encyclopedia')).toBeVisible();

  // ------------------------------------------------------------
  // STEP 2: Interact with the search form
  // ------------------------------------------------------------
  const searchInput = page.locator('input[name="search"]');
  await searchInput.click();
  await searchInput.fill('Playwright (software)');
  await searchInput.press('Enter');

  // Wait for the article page to load.
  await expect(page).toHaveURL(/Playwright/);
  await expect(
    page.getByRole('heading', { name: /Playwright/, level: 1 })
  ).toBeVisible();

  // ------------------------------------------------------------
  // STEP 3: Navigate to another page by clicking a link
  // ------------------------------------------------------------
  await page.getByRole('link', { name: 'Microsoft', exact: true }).first().click();

  // Verify that the Microsoft page has loaded.
  await expect(page).toHaveURL(/Microsoft/);
  // level: 1 restricts the match to the single <h1> article title.
  await expect(
    page.getByRole('heading', { name: 'Microsoft', level: 1 })
  ).toBeVisible();
});
