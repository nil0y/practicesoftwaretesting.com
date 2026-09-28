import { expect } from '@playwright/test';
import { test } from './fixtures';
import { HomePage } from '../pages/HomePage';
import { PRODUCTS_API } from '../utils/testData';

test.describe('Network related tests', () => {

    test('wait for API response for products', async ({homePage, page}) => {
        // Wait for the API response and print the status code to verify
        const responsePromise = page.waitForResponse(PRODUCTS_API);

        await homePage.search('bolt');

        const response = await responsePromise;
        console.log('API Status: ', response.status());
    });

    // Mock API: route.fulfill() is used to mock the API response.
    // Can not use homepage fixture here because of route.
    test('mock API response', async ({page}) => {
        // will check if URL contains products in it
        await page.route(PRODUCTS_API, async (route) => {
            // then it will generate the fake API response
            await route.fulfill({
                status: 200,
                body: JSON.stringify({data: []})
            });
        });
        /* search product..
           We will use locators from HomePage class without fixtures.
           We can not use fixtures because of routes.
        */
        const homepage = new HomePage(page); 
        await homepage.goto();
        await homepage.search('bolt');
        /* just to check search result in headed mode
        await page.waitForTimeout(2000);
        */

        // check if the search result is displayed
        await expect(homepage.searchResult).toBeVisible();
    });

    test('Block image request', async ({page}) => {
        // Blocking images to speed up page load in this test — visual content is not needed here
        // Can not use homePage fixture — route must be set before page load
        await page.route('**/*.{png,jpg,jpeg,avif,webp}', async (route) => {
            await route.abort();
        });
        await page.goto('/');
    });

    // npx playwright test network.spec.js --project=chromium --headed --reporter=list -g "Block image request"
});