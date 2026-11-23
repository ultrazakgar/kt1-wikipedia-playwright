// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('Wikipedia: text check, search form, and navigation', async ({ page }) => {
  // ------------------------------------------------------------
  // STEP 1: Check for specific text on the home page
  // ------------------------------------------------------------
  await page.goto('https://www.wikipedia.org/');

  // The main heading "Wikipedia" should be visible.
  await expect(page.getByRole('heading', { name: 'Wikipedia' })).toBeVisible();
  // Also check for the tagline "The Free Encyclopedia".
  await expect(page.getByText('The Free Encyclopedia')).toBeVisible();

  // ------------------------------------------------------------
  // STEP 2: Interact with the search form
  // ------------------------------------------------------------
  // The search input on Wikipedia has the name attribute "search".
  const searchInput = page.locator('input[name="search"]');
  await searchInput.click();
  await searchInput.fill('Playwright (software)');
  await searchInput.press('Enter');

  // Wait for the search results page to load. We expect the
  // page title or a heading to contain "Playwright".
  await expect(page).toHaveURL(/Playwright/);
  await expect(page.getByRole('heading', { name: /Playwright/ })).toBeVisible();

  // ------------------------------------------------------------
  // STEP 3: Navigate to another page by clicking a link
  // ------------------------------------------------------------
  // Click the first link that leads to the "Playwright (software)" article.
  await page.getByRole('link', { name: 'Playwright (software)' }).first().click();

  // Verify that the article page has loaded by checking for a
  // known phrase in the article.
  await expect(page.getByText('Playwright is an open-source')).toBeVisible();
});
