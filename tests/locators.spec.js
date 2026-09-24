// Refactoring the file to use custom fixtures
// Locators are used in respective Page files.
import { expect } from '@playwright/test';
import { test } from './fixtures';

test.describe('Different locators testing', ()=> {

    test('explore locators', async ({ homePage }) => {
        await homePage.search('Pliers'); // calling the search function from HomePage
        
        // Checking the search result
        await expect(homePage.searchResult).toBeVisible();
    });

    // will use the loggedInPage fixture for this test. we will also need page for assertion.
    test('Login form', async ({loggedInPage, page}) => {
        await expect(page).toHaveURL(/account/);
    });

    test('css selectors', async ({homePage}) => {
        await homePage.firstProduct.click();
    });

    test('chaining and filtering', async ({homePage, page}) => {
        const price = await page.locator('.card')
        .filter({hasText: 'Pliers'})
        .getByTestId('product-price')
        .first()
        .textContent();
        console.log('Price: ', price);
    });
});