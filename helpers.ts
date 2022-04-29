import {expect} from "@playwright/test";

export async function openCartLogin(page) {
    await page.goto('https://www.opencart.com/');
    await page.click("//a[contains(@class,'btn btn-link')]");
    await page.waitForSelector('//h1[text()=\'Log in to your OpenCart account\']');
    const header = await page.locator("//h1[text()='Log in to your OpenCart account']").textContent();
    await expect(header).toContain('Log in to your OpenCart account')
    await page.locator('#input-email').click();
    await page.type('#input-email', 'reddymannu@gmail.com');
    await page.fill('input[type=\'password\']', 'Mannu@1987');
    await page.click('(//button[text()=\'Login\'])[1]');
    await page.fill('#input-pin', '1487');
    await page.click('//button[@type=\'submit\']');
    await page.context().storageState({ path: './auth.json'});
    await page.waitForSelector('#short-cut');
    // await page.pause();
}

export async function validatePageTitle(page) {
    await page.goto('https://www.opencart.com/');
    const pageTitle = await page.title();
    console.log(pageTitle);
    expect(pageTitle).toContain('OpenCart');
}