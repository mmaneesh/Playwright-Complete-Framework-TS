import {test, expect, Page} from "@playwright/test";

import {homePageLocators} from "../../page-objects/homePageLocators";

test.describe('Validating Open cart Demo App', () => {

    //Validate The Account Holder Information
    test('Validating Account Holder Name', async({browser,baseURL}) => {
        const context = await browser.newContext({
            storageState: './tests/automationPracticeState.json'
        })

        const page = await context.newPage()
        await page.goto(`${baseURL}/index.php`);
        await expect(page).toHaveTitle('My Store');
        await expect(page.locator(homePageLocators.signOutLink)).toBeVisible();
        const acctHolderName = await page.locator(homePageLocators.accountHolderName).textContent();
        expect(acctHolderName).toBe("Maneesh Maddala")
        // await expect(page.locator("//a[@title='View my customer account']")).toBeVisible();
        // const acctHolderName = await page.locator("//a[@title='View my customer account']").textContent();
        // expect(acctHolderName).toBe('Maneesh Maddala');

        await page.close();
    })

    //Selecting Women's T-Shirt Category
    test("Selecting Women's T-Shirts", async({browser, baseURL}) => {

        const context = await browser.newContext({
            storageState: './tests/automationPracticeState.json'
        })

        const page = await context.newPage()
        await page.goto(`${baseURL}/index.php`);
        await page.waitForSelector(homePageLocators.womenMenuTab);
        await page.locator(homePageLocators.womenMenuTab).hover();
        await expect(page.locator(homePageLocators.womenTabOptions)).toBeVisible();
        await expect(page.locator(homePageLocators.tShirtsOption)).toBeVisible();
        await page.locator(homePageLocators.tShirtsOption).click();
        await page.waitForSelector(homePageLocators.productListingCategory);
        const categoryName = await page.locator(homePageLocators.productListingCategory).textContent();
        expect(categoryName).toContain('T-shirts');

        // await page.waitForSelector("//a[@title='Women']");
        // await page.locator("//a[@title='Women']").hover();
        // await expect(page.locator("//a[text()='Women']/following-sibling::ul")).toBeVisible();
        // await page.click("(//a[@title='T-shirts'])[1]");
        // await page.waitForSelector("//h1[@class='page-heading product-listing']");
        // const categoryName = await page.locator("//h1[@class='page-heading product-listing']").textContent();
        // expect(categoryName).toContain("T-shirts");

        await page.close();
    })

    //Adding Items To Cart
    test("Adding A Product To The Cart", async({browser, baseURL}) => {

        const context = await browser.newContext({
            storageState: './tests/automationPracticeState.json'
        })

        const page = await context.newPage();
        await page.goto(`${baseURL}/index.php?id_category=5&controller=category`);
        await page.waitForTimeout(3000);
        await page.waitForSelector(homePageLocators.tShirtItem);
        await page.locator(homePageLocators.tShirtItem).hover();
        await page.locator(homePageLocators.tShirtItem).click({force:true});
        await page.waitForSelector(homePageLocators.productSchema);
        await expect(page.locator(homePageLocators.productSchema)).toBeVisible();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL('http://automationpractice.com/index.php?id_product=1&controller=product');
        await expect(page).toHaveTitle('Faded Short Sleeve T-shirts - My Store');
        await page.locator(homePageLocators.productQuantityInput).fill('2');
        await page.locator(homePageLocators.productSizeDropdown).click();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        const selectedSize = await page.locator(homePageLocators.productSizeDropdownValue).textContent();
        expect(selectedSize).toBe('M');

        // await page.locator('#group_1').selectOption('M');
        // await page.locator("//option[title='M']").selectOption('M');

        await expect(page.locator(homePageLocators.addToCartButton)).toBeVisible();
        await page.locator(homePageLocators.addToCartButton).click();
        await page.waitForSelector(homePageLocators.addToCartSuccessMessage);
        await expect(page.locator(homePageLocators.addToCartSuccessMessage)).toBeVisible();

        await page.locator(homePageLocators.proceedToCheckoutButton).click();
        await expect(page.locator(homePageLocators.shoppingCartTitle)).toBeVisible();
        await expect(page).toHaveURL('http://automationpractice.com/index.php?controller=order');
        await expect(page).toHaveTitle('Order - My Store');

        await expect(page.locator(homePageLocators.totalCartPrice)).toContainText('$35.02');




        // await page.waitForSelector("(//ul[contains(@class,'product_list grid')]//li)[1]");
        // await page.locator("(//ul[contains(@class,'product_list grid')]//li)[1]").hover();
        // await page.locator("(//ul[contains(@class,'product_list grid')]//li)[1]").click({force:true});
        // await page.waitForSelector("//div[@itemtype='http://schema.org/Product']");
        // await expect(page.locator("//div[@itemtype='http://schema.org/Product']")).toBeVisible();
        // await page.waitForTimeout(3000);
        // await expect(page).toHaveURL('http://automationpractice.com/index.php?id_product=1&controller=product');
        // await expect(page).toHaveTitle('Faded Short Sleeve T-shirts - My Store');
        // await page.locator("#quantity_wanted").fill('2');
        // await page.locator('#group_1').click();
        // await page.keyboard.press('ArrowDown');
        // await page.keyboard.press('Enter');
        //
        // const selectedSize = await page.locator("//div[@id='uniform-group_1']//span[1]").textContent();
        // expect(selectedSize).toBe('M');

        // await page.locator('#group_1').selectOption('M');
        // await page.locator("//option[title='M']").selectOption('M');

        // await page.locator("//span[text()='Add to cart']").click();
        // await page.waitForSelector("//h2[text()[normalize-space()='Product successfully added to your shopping cart']]");

        // await page.click("//span[text()[normalize-space()='Proceed to checkout']]");
        // await expect(page.locator('#cart_title')).toBeVisible();
        // await expect(page).toHaveURL('http://automationpractice.com/index.php?controller=order');
        // await expect(page).toHaveTitle('Order - My Store');
        //
        // await expect(page.locator('#total_price')).toContainText('$35.02');
        // await expect(page.locator('#total_price').textContent()).

    } )

})