import { test, expect } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("https://devfn.vercel.app/signup");

  // Click [placeholder="Enter your name"]
  await page.getByPlaceholder("Enter your name").click();

  // Fill [placeholder="Enter your name"]
  await page.getByPlaceholder("Enter your name").fill("Gautam");

  // Click [placeholder="Email"]
  await page.getByPlaceholder("Email").click();

  // Fill [placeholder="Email"] with empty string
  await page.getByPlaceholder("Email").fill("");

  // Click [placeholder="Password"]
  await page.getByPlaceholder("Password", { exact: true }).click();

  // Fill [placeholder="Password"]
  await page.getByPlaceholder("Password", { exact: true }).fill("abcdefgh");

  // Click [placeholder="Confirm Password"]
  await page.getByPlaceholder("Confirm Password").click();

  // Fill [placeholder="Confirm Password"]
  await page.getByPlaceholder("Confirm Password").fill("abcdefgh");

  // Check [label="I have read and agreed to the Terms of Service and Privacy Policy."]
  await page
    .getByLabel(
      "I have read and agreed to the Terms of Service and Privacy Policy."
    )
    .check();

  // Click [button:name="Next →"]
  await page.getByRole("button", { name: "Next →" }).click();

  // Get name error message
  const nameError = await page
    .locator(".text-error.label-text-alt")
    .first()
    .innerText();
  expect(nameError).toEqual("Email is required");
});