import {test, expect} from "@playwright/test";
import {openCartLogin, validatePageTitle} from '../helpers';

test.describe.parallel('Open cart Test Suite @smoke', () => {
    test("Validating The Open Cart Website @smoke", async ({page}) => {
        await validatePageTitle(page);
    });

    test('Login To Open Cart Application @smoke', async({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await openCartLogin(page);
    })

    test("Auto Login - Save Storage State", async({browser}) => {
        const context = await browser.newContext({
            storageState: "./auth.json"
        });
        const page = await context.newPage();
        await page.goto('https://www.opencart.com/index.php?route=marketplace/extension');
        await page.waitForTimeout(2000);
    })
})
