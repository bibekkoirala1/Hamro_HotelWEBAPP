import { expect, test } from '@playwright/test';

test.describe('User Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');
    });

    test('should display login form correctly', async ({ page }) => {
        await expect(page.locator('h2')).toHaveText('Login Your Account');
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toHaveText('Login');
    });

    test('should show error for invalid login', async ({ page }) => {
        await page.fill('input[type="email"]', 'wrongemail@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await page.waitForSelector('.text-red-500', { timeout: 5000 }); 
        await expect(page.locator('.text-red-500')).toBeVisible();
    });

    test('should successfully log in with correct credentials', async ({ page }) => {
        await page.fill('input[type="email"]', 'bibek@gmail.com'); 
        await page.fill('input[type="password"]', 'prabin'); 
        await page.click('button[type="submit"]');

        await page.waitForLoadState('networkidle'); 
        await page.waitForTimeout(1000); 

        const successMessage = await page.locator('.text-green-500').isVisible();
        if (!successMessage) {
            await expect(page).toHaveURL('http://localhost:5173/'); 
        } else {
            await expect(page.locator('.text-green-500')).toContainText(/Login successful/i);
        }
    });

    test('should navigate to forgot password page', async ({ page }) => {
        await page.click('text=Forgot password?');
        await expect(page).toHaveURL('http://localhost:5173/forgotpass');
    });

    test('should navigate to sign-up page', async ({ page }) => {
        await page.click('text=Sign up');
        await expect(page).toHaveURL('http://localhost:5173/register');
    });

});


