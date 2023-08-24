import { test, expect } from "@playwright/test";

test("get started link", async ({ page }) => {
  await page.goto(
    "https://www.udemy.com/course/playwright-tutorials-automation-testing/"
  );

  await page.getByPlaceholder("Search for anything").fill("Playwright");

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByPlaceholder("Search for anything")).toHaveValue(
    "Playwright"
  );
});
