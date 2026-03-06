import { expect, test } from '@playwright/test';

test.describe('Product (hotel) Listing Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/product');
    await page.waitForLoadState('networkidle'); 
  });



  test('should filter hotel based on search input', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.fill('input[placeholder="Search hotel..."]', 'Dwar'); 
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    const venueCards = await page.locator('.shadow-lg');
    expect(await venueCards.count()).toBeGreaterThan(0);
    await expect(venueCards.first()).toContainText('Dwar');
  });





  // 6. Adjust price range and verify filtering
  test('should filter hotel based on price range', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.fill('input[type="number"]:nth-of-type(1)', '30000');
    await page.fill('input[type="number"]:nth-of-type(2)', '50000');
    await page.waitForTimeout(1000);

    const venueCards = await page.locator('.shadow-lg');
    expect(await venueCards.count()).toBeGreaterThan(0);

    // Extract price correctly
    const firstVenuePriceText = await venueCards.first().locator('p.text-xl.font-bold').textContent();
    const extractedPrice = parseInt(firstVenuePriceText.replace('Rs ', '').replace('/night', ''), 10);
    expect(extractedPrice).toBeGreaterThanOrEqual(500);
    expect(extractedPrice).toBeLessThanOrEqual(2000);
  });

});
