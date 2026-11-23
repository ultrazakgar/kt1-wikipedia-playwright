// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('Wikipedia: text check, search form, and navigation', async ({ page }) => {
  // ------------------------------------------------------------
  // STEP 1: Check for specific text on the home page
  // ------------------------------------------------------------
  await page.goto('https://www.wikipedia.org/');

  // The main heading "Wikipedia" should be visible.
  await expect(page.getByRole('heading', { name: 'Wikipedia', exact: true })).toBeVisible();
  // Also check for the tagline "The Free Encyclopedia".
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
  // Click the "Microsoft" link inside the article.
  await page.getByRole('link', { name: 'Microsoft', exact: true }).first().click();

  // Verify that the Microsoft page has loaded.
  await expect(page).toHaveURL(/Microsoft/);
  // Use level: 1 (the article title <h1>) to avoid matching
  // section headings that also contain the word "Microsoft".
  await expect(
    page.getByRole('heading', { name: 'Microsoft', level: 1 })
  ).toBeVisible();
});
