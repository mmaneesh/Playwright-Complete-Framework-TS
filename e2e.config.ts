import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalTimeout: 60*60*1000,
    timeout: 300000,
    workers:1,
    retries: 0,
    testDir: 'tests/E2E-Tests',

    use: {
        headless: false,
        viewport: { width:1280, height:720},
        // actionTimeout: 15000,
        // navigationTimeout: 15000,
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        // storageState: './automationPracticeState.json',
        launchOptions: {
            slowMo: 200,
            // logger: {
            //     isEnabled: (name, severity) => true,
            //     log: (name, severity, message, args) => console.log(`${name} ${severity} ${message} `)
            // },
        },
    },

    projects: [
        {
            name: "Chromium",
            use: { browserName: "chromium",
            baseURL: 'http://automationpractice.com/',
            navigationTimeout: 30000,
            actionTimeout: 15000 }
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
        // ['html']
    ],
}

export default config