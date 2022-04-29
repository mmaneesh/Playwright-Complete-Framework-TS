module.exports = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests/apiTests/refDataAPI',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects: [
        {
            name: 'QA',
            use: { browserName: 'chromium',
            baseURL: 'https://u4dpt6zstl.execute-api.us-east-1.amazonaws.com/qa/api/referencedata'},
        },
        {
            name: 'STG',
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
        // ['html']
    ],
}