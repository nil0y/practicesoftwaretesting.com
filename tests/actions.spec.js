import {test, expect} from '@playwright/test';

// Clicking on an element
test('click', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('.card').first().click();
});

// Fill and type
test('fill and type', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('textbox', {name: 'Search'}).fill('Pliers');
    await page.getByRole('button', {name: 'Search'}).click();
});

// Keyboard press
test ('keyboard press', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('textbox', {name: 'Search'}).fill('Pliers');
    await page.getByRole('textbox', {name: 'Search'}).press('Enter');
});

// Checking items from a checkbox list
test('checkbox', async ({page}) => {
    await page.goto('https:practicesoftwaretesting.com/');
    await page.getByLabel('Hammer').check();
});

// Selecting an item from a dropdown list
test('Dropdown', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByLabel('Sort').selectOption('Price (Low - High)');
});

// Hovering over an element
test('hover', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('.card').first().hover();
});