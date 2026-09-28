import {test} from './fixtures'; // Importing from fixtures
import { expect} from '@playwright/test';

test.describe('Product Tests', () => {

    test('should show results when searching for bolt', async ({homePage}) => {
        await homePage.search('bolt'); 
    });

    test('should display search button on homepage', async ({homePage}) => {
        await expect(homePage.searchButton).toBeVisible();
    });

    // Adding test steps for better reporting
    test('should navigate to product page after clicking search result', async ({homePage}) => {
        await test.step('should show the results when searched(ex. bolt)', async () => {
            await homePage.search('bolt');
        });

        await test.step('should show search result when a search is executed', async () => {
            await expect(homePage.searchResult).toBeVisible();
        });
        
        await test.step('should show product details when a product card is clicked from search result screen', async () => {
            await homePage.firstProduct.click();
        });
    });

    // Adding afterEach hook to log test completion
    test.afterEach(async ({page}) => {
        console.log('Test completed. afterEach working.');
    });
});