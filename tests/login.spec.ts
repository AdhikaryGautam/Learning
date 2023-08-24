import { test, expect } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("https://demo.applitools.com/index.html");

  await page.pause();
});
