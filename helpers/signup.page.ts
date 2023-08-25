import { expect, type Locator, type Page } from "@playwright/test";

import { SignUpType } from "../types/types";

export class SignUpPage implements SignUpType {
  page: SignUpType["page"];
  nameInput: SignUpType["nameInput"];
  emailInput: SignUpType["emailInput"];
  passwordInput: SignUpType["passwordInput"];
  confirmPasswordInput: SignUpType["confirmPasswordInput"];
  termsCheckBox: SignUpType["termsCheckBox"];
  submitButton: SignUpType["submitButton"];
  verifyButton: SignUpType["verifyButton"];

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("//input[@id='name']");
    this.emailInput = page.locator("//input[@id='username']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.confirmPasswordInput = page.locator("//input[@id='confirmPassword']");
    this.termsCheckBox = page.locator("//input[@type='checkbox']");
    this.submitButton = page.locator("//button[contains(text(),'Next →')]");
    this.verifyButton = page.locator("//button[contains(text(),'Verify →')]");
  }

  goto: SignUpType["goto"] = async () => {
    await this.page.goto("https://devfn.vercel.app/signup");
  };

  // fill all details
  async fillForm(formParams) {
    const { name, email, password, confirmPassword, terms } = formParams;
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    if (terms) await this.termsCheckBox.check();
    else await this.termsCheckBox.uncheck();
  }

  // wait for url
  waitUrl: SignUpType["waitUrl"] = async (url: RegExp) => {
    await this.page.waitForURL(url);
  };

  // Generate random email
  getRandomEmail() {
    return `testt${Math.floor(Math.random() * 10000)}@testt.com`;
  }

  // Fill verification code with 1 and submit
  async verifyCode() {
    for (let i = 1; i < 7; i++) {
      await this.page.locator(`input:nth-child(${i})`).fill("1");
    }
    // Click [button:name="Verify →"]
    await this.verifyButton.click();
  }

  checkErrorMessage: SignUpType["checkErrorMessage"] = async (error) => {
    // Get name error message
    const err = await this.page
      .locator(".text-error.label-text-alt")
      .first()
      .innerText();
    expect(err).toBe(error);

    // check if button is disabled
    await expect(this.submitButton).toBeDisabled();
  };
}
