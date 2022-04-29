module.exports = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests/apiTests/reqResAPI',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
        // baseURL: "https://reqres.in/api",
    },
    projects: [
        {
            name: 'QA',
            use: { browserName: 'chromium',
            baseURL: 'https://reqres.in/api'},
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'Webkit',
            use: { browserName: 'webkit' },
        },
    ],
    reporter: [
        ['line'],
        ['allure-playwright'],
        ['html']
    ],
}