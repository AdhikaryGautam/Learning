import { type Locator, type Page } from "@playwright/test";

export interface SignUpType {
  page: Page;
  nameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  confirmPasswordInput: Locator;
  termsCheckBox: Locator;
  submitButton: Locator;
  verifyButton: Locator;
  fillForm: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    terms: boolean
  ) => Promise<void>;
  goto: () => Promise<void>;
  waitUrl: (url: RegExp) => Promise<void>;
  getRandomEmail: () => string;
  verifyCode: () => Promise<void>;
  checkError: (error: string) => Promise<void>;
}
