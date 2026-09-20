import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
// import { LoginPage } from '../pages/LoginPage';

test.describe('Product Tests', () => {
    let homepage; // declaring a variable
    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page); // creating object of HomePage into homepage variable
        await homepage.goto();
    });

    test('Search for a product', async ({page}) => {
        await homepage.search('bolt'); 
    });

    test('Search button visibility', async ({page}) => {
        await expect(page.getByRole('button', {name: 'Search'})).toBeVisible();
    });

    // Adding afterEach hook to log test completion
    test.afterEach(async ({page}) => {
        console.log('Test completed');
    });

    // Adding test steps for better reporting
    test('checkout steps', async ({page}) => {
        await test.step('Search product', async () => {
            await homepage.search('bolt');
        });
        
        await test.step('Select product', async () => {
            await page.getByText('Bolt').first().click();
        });

        await test.step('verify product search', async () => {
            await expect(page.getByTestId('search-result-count')).toBeVisible();
        });
    });
});