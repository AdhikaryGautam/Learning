import { test, expect } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("https://devfn.vercel.app/signup");

  // Click [placeholder="Enter your name"]
  await page.getByPlaceholder("Enter your name").click();

  // Fill [placeholder="Enter your name"]
  await page.getByPlaceholder("Enter your name").fill("Gautam");

  // Click [placeholder="Email"]
  await page.getByPlaceholder("Email").click();

  // Fill [placeholder="Email"] with random email
  const randomNum = Math.floor(Math.random() * 1000);
  await page
    .getByPlaceholder("Email")
    .fill(`test${randomNum}@test${randomNum}.com`);

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

  // Check if name is not empty
  await expect(page.locator("[placeholder='Enter your name']")).toBeTruthy();

  // Check if email is not empty
  await expect(page.locator("[placeholder='Email']")).toBeTruthy();

  // Check if password is not empty
  await expect(page.locator("[placeholder='Password']")).toBeTruthy();

  // Check if confirm password is not empty
  await expect(page.locator("[placeholder='Confirm Password']")).toBeTruthy();

  // Check if password and confirm password value is same
  await expect(page.locator("[placeholder='Password']").inputValue()).toEqual(
    page.locator("[placeholder='Confirm Password']").inputValue()
  );

  // Check if terms and conditions is checked
  await expect(
    page.locator(
      "input:has-label('I have read and agreed to the Terms of Service and Privacy Policy.')"
    )
  ).toBeTruthy();

  // check if button is disabled
  await expect(page.locator("button:has-text('Next →')")).toBeEnabled();

  // Click [button:name="Next →"]
  await page.getByRole("button", { name: "Next →" }).click();

  // wait for url
  await page.waitForURL(new RegExp("\\https://devfn.vercel.app/verify-email"));

  // Fill values with 1
  await page.locator("input:nth-child(1)").fill("1");
  await page.locator("input:nth-child(2)").fill("1");
  await page.locator("input:nth-child(3)").fill("1");
  await page.locator("input:nth-child(4)").fill("1");
  await page.locator("input:nth-child(5)").fill("1");
  await page.locator("input:nth-child(6)").fill("1");

  // Click [button:name="Verify →"]
  await page.getByRole("button", { name: "Verify →" }).click();
});
