import {test} from './fixtures'; // Importing from fixtures
import { expect} from '@playwright/test';

test.describe('Product Tests', () => {

    test('Search for a product', async ({homePage}) => {
        await homePage.search('bolt'); 
    });

    test('Search button visibility', async ({homePage}) => {
        await expect(homePage.searchButton).toBeVisible();
    });

    // Adding test steps for better reporting
    test('checkout steps', async ({homePage}) => {
        await test.step('Search product', async () => {
            await homePage.search('bolt');
        });

        await test.step('verify product search', async () => {
            await expect(homePage.searchResult).toBeVisible();
        });
        
        await test.step('Select product', async () => {
            await homePage.firstProduct.click();
        });
    });

    // Adding afterEach hook to log test completion
    test.afterEach(async ({page}) => {
        console.log('Test completed. afterEach working.');
    });
});