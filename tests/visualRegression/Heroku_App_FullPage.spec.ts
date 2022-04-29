import {test, expect} from "@playwright/test";

test.describe("Visual Regression Tests", () => {

    test('Full Page Visual Snapshot Test', async({page,baseURL}) => {
        await page.goto(baseURL);
        expect(await page.screenshot()).toMatchSnapshot("Heroku_Home_Page.png")
    })
})