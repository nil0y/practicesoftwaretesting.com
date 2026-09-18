import {test, expect} from '@playwright/test';
/*
    For browser tabs we used {page} before.
    But for API we will use {request}
*/
test('get all products', async ({request}) => {
    const response = await request.get('https://api.practicesoftwaretesting.com/products'); // Stored the response in a variable
    console.log('Status: ', response.status());
    console.log('OK?: ', response.ok());

    // Adding assertions for the response
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy(); 
    /* 
        toBeTruthy() is not strict like toBe('true').
        toBeTruthy() means the response is not falsy (false, 0, null, "" etc.)
    */

    const body = await response.json(); // Keeping the json in a variable
    // console.log(body); 

    // Now will verify the body by adding assertions

    expect(body.total).toBe(50); // Total product check
    expect(body.data.length).toBe(9); // data per page 
});

test('get last page products', async ({ request }) => {
    // We can also pass the page number query parameter to check data from any specific page.
    const response = await request.get('https://api.practicesoftwaretesting.com/products?page=6');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.data.length).toBe(5);
});

test('UI & API mixing, both check', async ({page, request}) => {

    // First, verify using API that there is at least one product with the name "bolt".
    const response = await request.get('https://api.practicesoftwaretesting.com/products/search?q=bolt');
    const body = await response.json();

    expect(body.data.length).toBeGreaterThan(0); // Making sure product is available

    // Then verify from the UI
    await page.goto('https://practicesoftwaretesting.com/');
    await page.waitForLoadState('networkidle'); // Wait for the page to load completely.
    await page.getByRole('textbox', {name: 'Search'}).fill('bolt');
    await page.getByRole('button', {name: 'Search'}).click();
    await expect(page.getByTestId('search-result-count')).toContainText(`${body.total} products found`);
    // By using template litarals we can make sure that the data received from API exactly matches UI
});

// To run this: npx playwright test api-testing.spec.js --project=chromium --reporter=list