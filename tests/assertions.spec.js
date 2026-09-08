import {test, expect} from '@playwright/test';

test('assertions-toHaveTitle', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');

    /* We will use regex to check the title. 
    This will prevent the test from failing if the title changes in the future.*/
    await expect(page).toHaveTitle(/Practice Software Testing/);

    /* if we expect an exact match we can use the following assertion
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0'); */
    
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
});

test('assertions-toBeVisible', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page.getByRole('button', {name: 'Search'})).toBeVisible();
});

test('assertions-toHaveText and toContainText', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('textbox', {name: 'Search'}).fill('Bolt');
    await page.getByRole('button', {name: 'Search'}).click();

    /* Search results are not deterministic, so we will use toContainText to check 
    if the search result contains the text 'products found'*/
    await expect(page.getByTestId('search-result-count')).toContainText('products found');
});

/*
Soft assertions allow the test to continue even if an assertion fails. 
Hard assertions will stop the test execution if an assertion fails.
*/
test('soft-assertions', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await expect.soft(page).toHaveTitle(/Practice Software Testing/);
    await expect.soft(page).toHaveURL('https://practicesoftwaretesting.com/'); //this will pass
    /*
    this will not fail the test, but will log an error in the report
    await expect.soft(page).toHaveURL('wrong-url.com'); 
    */
    await expect.soft(page.getByRole('button', {name: 'Search'})).toBeVisible();
    await expect.soft(page.getByRole('textbox', {name: 'Search'})).toBeVisible();
});