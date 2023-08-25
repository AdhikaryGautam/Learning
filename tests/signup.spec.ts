import { test, expect } from "@playwright/test";
import { SignUpPage } from "../helpers/signup.page";
import { SignUpType } from "../types/types";

test("Login with correct info", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "Gautam",
    email: signUp.getRandomEmail(),
    password: "abcdefgh",
    confirmPassword: "abcdefgh",
    terms: true,
  });
  await signUp.submitButton.click();

  // wait for url
  await signUp.waitUrl(new RegExp("\\https://devfn.vercel.app/verify-email"));

  // Fill values with 1
  await signUp.verifyCode();
});

test("Login with empty name", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "",
    email: signUp.getRandomEmail(),
    password: "abcdefgh",
    confirmPassword: "abcdefgh",
    terms: true,
  });
  await signUp.submitButton.click();

  // check error
  await signUp.checkError("Name is required");
});

test("Login with empty email", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "Gautam",
    email: "",
    password: "abcdefgh",
    confirmPassword: "abcdefgh",
    terms: true,
  });
  await signUp.submitButton.click();

  // check error
  await signUp.checkError("Email is required");
});

test("Login with empty password", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "Gautam",
    email: signUp.getRandomEmail(),
    password: "",
    confirmPassword: "abcdefgh",
    terms: true,
  });
  await signUp.submitButton.click();

  // check error
  await signUp.checkError("Password is required");
});

test("Login with empty confirm password", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "Gautam",
    email: signUp.getRandomEmail(),
    password: "abcdefgh",
    confirmPassword: "",
    terms: true,
  });
  await signUp.submitButton.click();

  // check error
  await signUp.checkError("Confirm Password is required");
});

test("Login with unmatching passwords", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "Gautam",
    email: signUp.getRandomEmail(),
    password: "abcdefgh",
    confirmPassword: "abcdefghi",
    terms: true,
  });
  await signUp.submitButton.click();

  // check error
  await signUp.checkError("Confirm Password does not match");
});

test("Login with unchecked terms and conditions", async ({ page }) => {
  const signUp = new SignUpPage(page);
  await signUp.goto();

  // fill all details
  await signUp.fillForm({
    name: "Gautam",
    email: signUp.getRandomEmail(),
    password: "abcdefgh",
    confirmPassword: "",
    terms: false,
  });

  expect(signUp.submitButton).toBeDisabled();
});
