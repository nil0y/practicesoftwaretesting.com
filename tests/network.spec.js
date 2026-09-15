import {test, expect} from '@playwright/test';

test('wait for API response', async ({page}) => {
    await page.goto('http://practicesoftwaretesting.com/');
    // Wait for the API response and assert the status code.
    const responsePromise = page.waitForResponse('**/products**');

    await page.getByRole('textbox', {name: 'Search'}).fill('bolt');
    await page.getByRole('button', {name: 'Search'}).click();

    const response = await responsePromise;
    console.log('API Status: ', response.status());
});

// Mock API: route.fulfill() is used to mock the API response.
test('mock API response', async ({page}) => {
    // will check if URL contains products in it
    await page.route('**/products**', async (route) => {
        // then it will generate the fake API response
        await route.fulfill({
            status: 200,
            body: JSON.stringify({data: []})
        });
    });
    // search product
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('textbox', {name: 'Search'}).fill('Bolt');
    await page.getByRole('button', {name: 'Search'}).click(); 
    /* just to check search result in headed mode
    await page.waitForTimeout(2000);
    */

    // check if the search result is displayed
    await expect(page.getByTestId('search-result-count')).toBeVisible();
});

test('Block image request', async ({page}) => {
    // abort loading potential images
    await page.route('**/*.{png,jpg,jpeg,avif,webp}', async (route) => {
        await route.abort();
    });
    await page.goto('https://practicesoftwaretesting.com/');
});

// npx playwright test network.spec.js --project=chromium --headed --reporter=list -g "Block image request"