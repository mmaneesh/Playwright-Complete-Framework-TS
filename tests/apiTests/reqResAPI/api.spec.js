const {test, expect } = require('@playwright/test');

test.describe.parallel("API Testing", () => {
    const baseUrl = "https://reqres.in/api";

    test("Sample Playwright API Test - 200 Status", async ({request, baseURL}) => {
        const response = await request.get(`${baseURL}/users/2`);
        // const response = await request.get(`${baseUrl}/users/2`);
        expect(response.status()).toBe(200);

        const resBody = JSON.parse(await response.text())
        console.log(resBody);
    })

    test("Sample Playwright API Test - Invalid End Point", async ({request, baseURL}) => {
        const response = await request.get(`${baseURL}/users/notexist`);
        // const response = await request.get(`${baseUrl}/users/notexist`);
        expect(response.status()).toBe(404);
    })

    test("Sample Playwright API Test - GET Request", async ({request}) => {
        const response = await request.get(`${baseUrl}/users/3`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(3);
        expect(responseBody.data.first_name).toEqual("Emma");
        console.log(responseBody.data.first_name);
        expect(responseBody.data.last_name).toEqual("Wong");
        expect(responseBody.data.email).toBe('emma.wong@reqres.in');
        console.log(responseBody.data.email);
        expect(responseBody.data.email).toBeTruthy();






    })

    test("Sample Playwright API Test - POST Request", async ({request}) => {

        const response = await request.post(`${baseUrl}/users`, {
            data: {
                "first_name": "Maneesh",
                "last_name": "Maddala",
                "email": 'test@grr.la',
            },
        })

        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);
        expect(responseBody.first_name).toBe('Maneesh');
        expect(responseBody.last_name).toBe('Maddala');
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.email).toBeTruthy();
    })

    test("Sample Playwright API Test - POST Login Successful", async ({request}) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka",
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toEqual(200);
        expect(responseBody.token).toBeTruthy();
    })

    test("Sample Playwright API Test - POST Login UnSuccessful", async({request}) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(responseBody.error).toContain('Missing password');

    })

})