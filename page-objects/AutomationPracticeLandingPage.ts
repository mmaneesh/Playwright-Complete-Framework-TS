import {expect, Locator, Page, test} from "@playwright/test";

export class AutomationPracticeLandingPage {

    //Defining Selectors
    readonly page: Page
    readonly landingPageLogo: string
    readonly signInLink: string

    //Initializing Constructor
    constructor(page) {
        this.page = page
        // this.landingPageLogo = page.locator("//img[@class='logo img-responsive']")
        // this.signInLink = page.locator("//a[@title='Log in to your customer account']")
        this.landingPageLogo = "//img[@class='logo img-responsive']";
        this.signInLink = "//a[@title='Log in to your customer account']"
    }

    async waitForLogoVisible() {
        await this.page.waitForSelector(this.landingPageLogo);
    }

    async clickSignInLink() {
        await expect(this.page.locator(this.signInLink)).toBeVisible();
        await this.page.locator(this.signInLink).click()
    }

}