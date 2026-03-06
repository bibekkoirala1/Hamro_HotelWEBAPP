import { expect, test } from "@playwright/test";

test.describe("User Registration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/register");
  });

  test("should display registration form correctly", async ({ page }) => {
    await expect(page.locator("h2")).toHaveText("Create Your Account");
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText("Register");
  });

  test("should show error for invalid phone number", async ({ page }) => {
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="email"]', "testuser@example.com");
    await page.fill('input[name="phone"]', "1234");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(
      page.getByText(/Phone number must be between 10-15 digits/i),
    ).toBeVisible();
  });

  test("should successfully register a new user", async ({ page }) => {
    const timestamp = Date.now();
    const uniqueEmail = `newuser${timestamp}@example.com`;

    await page.fill('input[name="username"]', "newuser");
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="phone"]', "1234567890");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(
      page.getByText(/Registration successful! Redirecting to login.../i),
    ).toBeVisible({ timeout: 5000 });

    await page.waitForURL("http://localhost:5173/login", { timeout: 5000 });
    await expect(page).toHaveURL("http://localhost:5173/login");
  });

  test("should show error for duplicate email registration", async ({
    page,
  }) => {
    await page.fill('input[name="username"]', "duplicateuser");
    await page.fill('input[name="email"]', "bibek@gmail.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page.getByText(/already exists/i)).toBeVisible();
  });

  test('should navigate to login page when clicking on "Login" link', async ({
    page,
  }) => {
    await page.click("text=Login");
    await expect(page).toHaveURL("http://localhost:5173/login");
  });
});
