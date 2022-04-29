const {test, expect} = require('@playwright/test');

test.describe.parallel("Reference Data API Test", () => {
    const baseUrl = 'https://u4dpt6zstl.execute-api.us-east-1.amazonaws.com/qa/api/referencedata';
    let getCompaniesResponse;

    test("Get Companies Data - Valid Params", async({request, baseURL}) => {
        if(baseURL === 'https://u4dpt6zstl.execute-api.us-east-1.amazonaws.com/qa/api/referencedata') {
            getCompaniesResponse = await request.get(`${baseURL}/companies`, {
                params: {
                    q: 'global',
                    take: 15,
                }, headers: {
                    "x-api-key" : '2QLYkfe62p43o8oVxhVWi1IrYVp1S60J36P4QvBK',
                }
            });
        } else {
            getCompaniesResponse = await request.get(`${baseURL}/companies`, {
                params: {
                    q: 'global',
                    take: 15,
                }, headers: {
                    "x-api-key" : '2QLYkfe62p43o8oVxhVWi1IrYVp1S60J36P4QvBK',
                }
            });

        }

        const responseBody = JSON.parse(await getCompaniesResponse.text());
        console.log(responseBody);
        expect(getCompaniesResponse.status()).toBe(200);
        expect(responseBody.data.length).toBe(15);

    })

    test("Get Companies Data - InValid Params", async({request}) => {
        const getCompaniesResponse = await request.get(`${baseUrl}/companies`, {
            params: {
                q: '%^%*&^*',
                take: 15,
            }, headers: {
                "x-api-key" : '2QLYkfe62p43o8oVxhVWi1IrYVp1S60J36P4QvBK',
            }
        });

        const responseBody = JSON.parse(await getCompaniesResponse.text());
        console.log(responseBody);
        expect(getCompaniesResponse.status()).toBe(400);
        expect(responseBody.errors[0]).toEqual('Search string can only contain letters, numbers and spaces');
    })

    test("Get Companies Data - InValid Params 250+ char long", async({request}) => {
        const getCompaniesResponse = await request.get(`${baseUrl}/companies`, {
            params: {
                q: 'gygfgsdfbgxusdgfuisdghfxivgfgxfbgfxuiwegzneguifguibfguitfceuatfdaevzfgzydgfzyubefgydagszyecdfgaybzfguyeagfd' +
                  'zaueyfgyezgyjefgydfgywutfdvyuedfebzykwfegiw7unfguiwrfguiwerfgvwuizebgfwurgfuinzfguiwgfuibweuifweztiutriwtvzriyt8' +
                  'iyrnyzt89ytnygeryngyzqrfyb8wyf8fziytuizftgsuizwrbtfi8ywfiywerioyziytzf8ierftiguigt',
                take: 15,
            }, headers: {
                "x-api-key" : '2QLYkfe62p43o8oVxhVWi1IrYVp1S60J36P4QvBK',
            }
        });

        const responseBody = JSON.parse(await getCompaniesResponse.text());
        console.log(responseBody);
        expect(getCompaniesResponse.status()).toBe(400);
        expect(responseBody.errors[0]).toBe('Search String Cannot Exceed 250 Characters');

    })

})