import {test, expect, Locator, Page} from "@playwright/test";

export class AutomationPracticeLoginPage {

    // Defining Selectors
    readonly page: Page
    readonly loginForm: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator
    readonly alertMessage: Locator
    readonly authenticationLabel: Locator

    //Initialize Constructor
    constructor(page: Page) {
        this.page = page;
        this.loginForm = page.locator('#login_form');
        this.usernameInput = page.locator("#email");
        this.passwordInput = page.locator("#passwd");
        this.signInButton = page.locator("//span[text()[normalize-space()='Sign in']]");
        this.alertMessage = page.locator("//li[text()='Authentication failed.']");
        this.authenticationLabel = page.locator("//h1[text()='Authentication']");
    }

    //Define Page Methods
    async navigateToUrl(url) {
        await this.page.goto(url)
    }

    async enterUsername(usernameValue) {
        await expect(this.loginForm).toBeVisible();
        await this.usernameInput.click();
        await this.usernameInput.fill(usernameValue);
    }

    async enterPassword(passwordValue) {
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.click();
        await this.passwordInput.fill(passwordValue);
    }

    async clickSignInButton() {
        await expect(this.signInButton).toBeVisible();
        await this.signInButton.click();
    }

    async validateLoginErrorMessage() {
        await expect(this.alertMessage).toBeVisible();
        const loginErrorMsg = await this.alertMessage.textContent();
        expect(loginErrorMsg).toContain('Authentication failed.')
        // await expect(this.alertMessage).toContainText('Authentication failed.')
    }

}