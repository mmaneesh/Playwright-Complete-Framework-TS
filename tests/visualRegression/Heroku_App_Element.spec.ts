import {expect,test} from "@playwright/test";

test.describe('Heroku App Element Snapshot Tests', () => {

    test('Nested Frames Snapshot Test', async({page,baseURL}) => {
        await page.goto(`${baseURL}/nested_frames`);
        expect(await page.locator("//frameset[@frameborder='1']").screenshot()).toMatchSnapshot('NestedFrames.png');
    });

    test('Forgot Password Snapshot Test', async({page,baseURL}) => {
        await page.goto(`${baseURL}/forgot_password`);
        expect(await page.locator("#forgot_password").screenshot()).toMatchSnapshot('ForgotPassword.png');
    });

    test('File Upload Snapshot Test', async({page,baseURL}) => {
        await page.goto(`${baseURL}/upload`);
        expect(await page.locator("#content").screenshot()).toMatchSnapshot('FileUpload.png');
    });

    test('Dropdown Snapshot Test', async({page,baseURL}) => {
        await page.goto(`${baseURL}/dropdown`);
        expect(await page.locator("#dropdown").screenshot()).toMatchSnapshot('Dropdown.png');
    });

    test('Login Form Snapshot Test', async({page,baseURL}) => {
        await page.goto(`${baseURL}/login`);
        expect(await page.locator("#login").screenshot()).toMatchSnapshot('LoginForm.png');
    });

    test('Tools QA Snapshot Test', async({page,baseURL}) => {
        await page.goto('https://demoqa.com/');
        expect(await page.screenshot()).toMatchSnapshot('ToolsQA.png');
    });
})