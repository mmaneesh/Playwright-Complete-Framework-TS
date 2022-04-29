import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalTimeout: 60*60*1000,
    timeout: 300000,
    // workers:1,
    retries: 0,
    testDir: "tests/visualRegression",

    use: {
        headless: true,
        viewport: { width:1280, height:720},
        actionTimeout: 15000,
        navigationTimeout: 15000,
        ignoreHTTPSErrors: true,
        screenshot: "off",
        video: "off",
    },

    projects: [
        {
            name: "Chromium",
            use: { browserName: "chromium",
                baseURL: 'https://the-internet.herokuapp.com/',
                navigationTimeout: 15000,
                actionTimeout: 15000 }
        },
        {
            name: "Firefox",
            use:{ browserName: "firefox",
                baseURL: 'https://the-internet.herokuapp.com/',
                navigationTimeout: 15000,
                actionTimeout: 15000 }
        },
        {
            name: "Safari",
            use:{ browserName: "webkit",
                baseURL: 'https://the-internet.herokuapp.com/',
                navigationTimeout: 15000,
                actionTimeout: 15000}
        }
    ],

    reporter: [
        ['line'],
        ['allure-playwright'],
        // ['html']
    ],
}

export default config