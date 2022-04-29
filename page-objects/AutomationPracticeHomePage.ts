import {expect, Locator, Page} from "@playwright/test";

export class AutomationPracticeHomePage {

    //Defining Selectors
    readonly page: Page;
    readonly accountHolderName: Locator
    readonly signOutLink: Locator
    readonly acctHolderName: string

    //Initializing Constructor
    constructor(page: Page) {
        this.page = page
        this.accountHolderName = page.locator("//a[@title='View my customer account']");
        this.signOutLink = page.locator("//a[@title='Log me out']");
    }

    async isSignOutVisible() {
        await expect(this.signOutLink).toBeVisible();
    }

    async getAccountHolderName() {
        await expect(this.accountHolderName).toBeVisible();
        return await this.accountHolderName.textContent();
    }

}