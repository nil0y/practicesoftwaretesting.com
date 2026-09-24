import {expect} from '@playwright/test';
import {test} from './fixtures';

test.describe('Assertion Tests', () => {

    test('assertions-toHaveTitle', async ({homePage, page}) => {
        /* We will use regex to check the title. 
        This will prevent the test from failing if the title changes in the future.
        */
        await expect(page).toHaveTitle(/Practice Software Testing/);

        /* if we expect an exact match we can use the following assertion
        await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0'); 
        */
        
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
    });

    test('assertions-toBeVisible', async ({homePage}) => {
        await expect(homePage.searchButton).toBeVisible();
    });

    test('assertions-toHaveText and toContainText', async ({homePage}) => {
        await homePage.searchInput.fill('Bolt');
        await homePage.searchButton.click();

        /* Search results are not deterministic, so we will use toContainText to check 
        if the search result contains the text 'products found'*/
        await expect(homePage.searchResult).toContainText('products found');
    });

    /*
    Soft assertions allow the test to continue even if an assertion fails. 
    Hard assertions will stop the test execution if an assertion fails.
    */
    test('soft-assertions', async ({homePage, page}) => {
        await expect.soft(page).toHaveTitle(/Practice Software Testing/);
        await expect.soft(page).toHaveURL('https://practicesoftwaretesting.com/'); //this is correct and will pass
        /*
        And this will not fail the test, but will log an error in the report because of soft assertion.
        await expect.soft(page).toHaveURL('wrong-url.com'); 
        */
        await expect.soft(homePage.searchButton).toBeVisible();
        await expect.soft(homePage.searchInput).toBeVisible();
    });
});