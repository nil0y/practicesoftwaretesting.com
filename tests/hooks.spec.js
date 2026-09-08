import {test, expect} from '@playwright/test';

test.describe('Product Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('Search for a product', async ({page}) => {
        await page.getByRole('textbox', {name: 'Search'}).fill('Bolt');
        await page.getByRole('button', {name: 'Search'}).click();
        await expect(page.getByTestId('search-result-count')).toContainText('products found');
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
            await page.getByRole('textbox', {name: 'Search'}).fill('Bolt');
            await page.getByRole('button', {name: 'Search'}).click();
        });
        
        await test.step('Select product', async () => {
            await page.getByText('Bolt').first().click();
        });

        await test.step('verify product search', async () => {
            await expect(page.getByTestId('search-result-count')).toBeVisible();
        });
    });
});