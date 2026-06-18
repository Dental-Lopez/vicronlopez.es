import { test, expect } from '@playwright/test';

test.describe('Search Dropdown Layout', () => {
  test('should show search results over the next section', async ({ page }) => {
    await page.goto('/es/');

    // Ensure the page is loaded and interactive
    const searchInput = page.getByPlaceholder('Buscá marca, modelo o tipo…');
    await expect(searchInput).toBeVisible();
    await page.waitForTimeout(1500); // Wait for entrance animations to settle
    await searchInput.click(); // Focus it
    await searchInput.fill('o');

    // Dropdown should appear
    const dropdown = page.locator('ul:has-text("Porsche")').first();
    await expect(dropdown).toBeVisible();

    // Check overlap with welcome section
    const welcomeSection = page.locator('#welcome');
    await expect(welcomeSection).toBeVisible();

    const dropdownBox = await dropdown.boundingBox();
    const welcomeBox = await welcomeSection.boundingBox();

    if (dropdownBox && welcomeBox) {
      // The bottom of the dropdown should be below the top of the welcome section
      // to prove it's overlapping visually and not clipped.
      expect(dropdownBox.y + dropdownBox.height).toBeGreaterThan(welcomeBox.y);
    }
  });

  test('should not be clipped by hero section', async ({ page }) => {
    await page.goto('/es/');
    const searchInput = page.getByPlaceholder('Buscá marca, modelo o tipo…');
    await expect(searchInput).toBeVisible();
    await page.waitForTimeout(1500); // Wait for entrance animations to settle
    await searchInput.click(); // Focus it
    await searchInput.fill('o');

    const dropdown = page.locator('ul:has-text("Porsche")').first();
    await expect(dropdown).toBeVisible();

    // If it's not clipped, it should have a reasonable height
    const boundingBox = await dropdown.boundingBox();
    expect(boundingBox?.height).toBeGreaterThan(50);
  });
});
