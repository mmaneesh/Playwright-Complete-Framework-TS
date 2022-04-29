import {test, expect} from "@playwright/test";
import {AutomationPracticeLoginPage} from "../../page-objects/AutomationPracticeLoginPage";
import {AutomationPracticeLandingPage} from "../../page-objects/AutomationPracticeLandingPage";
import 'dotenv/config';
// require('dotenv').config();

test.describe('Open Cart Login/Logout Functionality', () => {
    let loginPage: AutomationPracticeLoginPage
    let landingPage: AutomationPracticeLandingPage

    // Before Each Hook
    test.beforeEach(async({page, baseURL}) => {
        loginPage = new AutomationPracticeLoginPage(page);
        landingPage = new AutomationPracticeLandingPage(page);
        await loginPage.navigateToUrl(baseURL)
        await landingPage.waitForLogoVisible()
        // await page.goto(baseURL);
        // await page.waitForSelector("//img[@class='logo img-responsive']", {timeout: 5000});
        const loginPageUrl = page.url();
        await expect(loginPageUrl).toContain('http://automationpractice.com/')
        await expect(page).toHaveTitle('My Store');
    });

    // Invalid Login
    test('Invalid Username/Password Scenario', async({page}) => {
        // await page.click("//a[@title='Log in to your customer account']");
        // await page.waitForSelector("//h1[text()='Authentication']");
        await landingPage.clickSignInLink()
        await expect(loginPage.authenticationLabel).toBeVisible();
        await loginPage.enterUsername(process.env.LOGIN_USERNAME);
        await loginPage.enterPassword('randomPassword')
        await loginPage.clickSignInButton();
        await loginPage.validateLoginErrorMessage();

        // await expect(page.locator('#login_form')).toBeVisible();
        // await page.locator("#email").click();
        // // await page.fill("#email", "reddymannu@gmail.com");
        // await page.fill("#email", process.env.LOGIN_USERNAME);
        // await page.fill("#passwd", "randomPassword");
        // await page.click("//span[text()[normalize-space()='Sign in']]");
        // await expect(page.locator("//li[text()='Authentication failed.']")).toBeVisible();
        // const loginError = await page.locator("//li[text()='Authentication failed.']").textContent();
        // expect(loginError).toContain('Authentication failed.')

        await page.close();
    });

    //Valid Login
    test('Valid Username/Password Scenario', async({page}) => {

        // await page.click("//a[@title='Log in to your customer account']");
        // await page.waitForSelector("//h1[text()='Authentication']");
        await landingPage.clickSignInLink()
        await expect(loginPage.authenticationLabel).toBeVisible();
        await loginPage.enterUsername(process.env.LOGIN_USERNAME);
        await loginPage.enterPassword(process.env.LOGIN_PASSWORD)
        await loginPage.clickSignInButton();
        // await expect(page.locator('#login_form')).toBeVisible();
        // await page.locator("#email").click();
        // await page.fill("#email", process.env.LOGIN_USERNAME);
        // await page.fill("#passwd", process.env.LOGIN_PASSWORD);
        // await page.click("//span[text()[normalize-space()='Sign in']]");

        await page.context().storageState(({path: './tests/automationPracticeState.json'}))
        await page.waitForSelector('//h1[text()=\'My account\']');
        await expect(page).toHaveTitle('My account - My Store');
        await expect(page).toHaveURL('http://automationpractice.com/index.php?controller=my-account');

        await page.close();
    });

    //Logout
    test.skip("Logout",async({page}) => {
        await page.click("//span[text()='My Account']");
        await page.waitForSelector("//ul[@class='dropdown-menu dropdown-menu-right']");
        await page.locator("(//ul[@class='dropdown-menu dropdown-menu-right']//a)[5]").click();
        const logoutPageUrl = page.url();
        await expect(logoutPageUrl).toBe('https://demo.opencart.com/index.php?route=account/logout');
    })

})