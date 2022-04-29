import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 30000,
    retries: 1,
    use: {
        headless: false,
        viewport: { width:1280, height:720},
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },

    projects: [
        {
            name: "Chromium",
            use: { browserName: "chromium" }
        },
        {
            name: "Firefox",
            use:{ browserName: "firefox" }
        },
        {
            name: "Safari",
            use:{ browserName: "webkit" }
        }
    ],
    reporter: [
        ['line'],
        ['allure-playwright'],
        ['html']
    ],
}

export default config